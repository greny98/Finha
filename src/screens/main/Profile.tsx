import React, {useEffect, useState} from 'react';
import {Layout, Text, Input, Modal} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from 'components/common/CustomButton';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';
import {convertCurrencyVN} from 'utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {getAllCategories, getDBConnection, getTransactions} from 'db/db-service';

interface Props {}

const Profile = (props: Props) => {
  const [price, setPrice] = useState(0);
  const [input, setInput] = useState('');
  const [showModal, setShowModal] = useState(false);

  const START_MONTH = moment(new Date()).startOf('M').toDate();
  const END_MONTH = moment(new Date()).endOf('M').toDate();

  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateConfirmIncome = () => {
    setShowModal(false);
  };

  const loadIncome = async () => {
    const db = await getDBConnection();
    const resultIncome = await getTransactions(db, START_MONTH, END_MONTH, {
      category: 'income',
    });
    if (resultIncome.length > 0) {
      setPrice(resultIncome[0].amount);
    }
  };

  const setNewIncome = async () => {
    // TODO: Edit or Create New Income
  };

  useEffect(() => {
    loadIncome();
  }, []);

  return (
    <Layout style={styles.root}>
      <Layout style={{alignItems: 'center'}}>
        <Layout style={[styles.boxContainer, {padding: 12, marginBottom: 20}]}>
          {price !== 0 ? (
            <>
              <Text style={styles.textStyle}>Tổng thu nhập tháng hiện tại: </Text>
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>{convertCurrencyVN(price)}</Text>
            </>
          ) : (
            <Text style={[styles.textStyle, {textAlign: 'center'}]}>
              Bạn chưa thiết lập thu nhập. Xin hãy thiết lập thu nhập của mình
            </Text>
          )}
        </Layout>
        <Layout>
          <TouchableOpacity onPress={() => setShowModal(true)}>
            <Layout style={[styles.btnStyle]}>
              <Text style={{color: '#fff'}}>{price === 0 ? 'Thiết lập thu nhập' : 'Thay đổi thu nhập'}</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
      </Layout>

      <Modal visible={showModal} backdropStyle={styles.backdrop} onBackdropPress={() => setShowModal(false)}>
        <Layout style={[styles.boxContainer, styles.modalContainer]}>
          <Text style={styles.textStyle}>Tổng thu nhập tháng của bạn</Text>
          <Layout style={[styles.boxContainer, {flexDirection: 'row'}]}>
            <Input onChangeText={nextValue => setInput(nextValue)} style={styles.inputStyle} />
            <Text style={styles.textStyle}>VND</Text>
          </Layout>
          <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Layout style={[styles.btnCancelStyle]}>
                <Text style={{color: '#fff'}}>Hủy</Text>
              </Layout>
            </TouchableOpacity>
            <CustomButton title="Xác nhận" onPress={navigateConfirmIncome} />
          </Layout>
        </Layout>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  boxContainer: {
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 24,
  },
  inputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '40%',
    borderColor: '#000',
  },
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    borderRadius: 100,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 40,
  },
  btnCancelStyle: {
    borderWidth: 0,
    borderRadius: 100,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#bebebe',
    width: 130,
    height: 40,
    marginRight: 10,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    borderRadius: 10,
    padding: 24,
  },
});

export default Profile;
