import React, {useCallback, useEffect, useState} from 'react';
import {Layout, Text, Input, Modal} from '@ui-kitten/components';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {convertCurrencyVN} from 'utils/utils';
import moment from 'moment';
import {getDBConnection, getProfile, getSaveMoney, updateSaveMoney} from 'db/db-service';
import CustomButton from 'components/common/CustomButton';
import TextInputGroup from 'components/common/TextInputGroup';
import {useNavigation} from '@react-navigation/core';
import CurrencyInput from 'react-native-currency-input';

interface Props {}

const Profile = (props: Props) => {
  const navigation = useNavigation();
  const [saveMoney, setSaveMoney] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState(0);
  const [note, setNote] = useState('');

  const [showModal, setShowModal] = useState(false);

  //Navigation

  const loadIncome = async () => {
    const db = await getDBConnection();
    const result: any = await getSaveMoney(db);
    if (result.length > 0) {
      setSaveMoney(result[0]);
      setInput(result[0].amount);
      setNote(result[0].description);
    }
    const profileResult = await getProfile(db);
    if (profileResult.length > 0) {
      const restAmount = profileResult[0].amount - (result.length > 0 ? result[0].amount : 0);
      setTotal(restAmount);
    }
  };

  const setNewTarget = async () => {
    const db = await getDBConnection();
    const updateData = {
      id: saveMoney.id,
      amount: input,
      description: note,
    };
    await updateSaveMoney(db, updateData);
    loadIncome();
    setShowModal(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadIncome();
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <Layout style={styles.root}>
          <Layout style={{alignItems: 'center', width: '100%'}}>
            <Text style={styles.titleStyle}>Thông tin hồ sơ</Text>
          </Layout>
          <Layout style={{alignItems: 'flex-start'}}>
            <Layout style={[styles.boxContainer, {paddingVertical: 12, paddingHorizontal: 20, marginBottom: 20}]}>
              {total !== 0 ? (
                <>
                  <Text style={styles.textStyle}>Tổng số tiền hiện tại: </Text>
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      marginBottom: 12,
                      marginLeft: 12,
                      color: total > 0 ? '#00C6BA' : '#FE645A',
                    }}>
                    {convertCurrencyVN(total)}
                  </Text>
                  <Text style={styles.textStyle}>
                    Tiền tiết kiệm trong tháng{' '}
                    <Text style={{fontWeight: 'bold', fontSize: 24}}>{moment().format('M')} </Text>này:{' '}
                  </Text>

                  {Object.keys(saveMoney).length > 0 ? (
                    <Text
                      style={{fontSize: 24, fontWeight: 'bold', marginBottom: 12, marginLeft: 12, color: '#00C6BA'}}>
                      {convertCurrencyVN(saveMoney.amount)}
                    </Text>
                  ) : (
                    <Text style={{fontSize: 24, fontWeight: 'bold'}}>Chưa thiết lập</Text>
                  )}
                </>
              ) : (
                <Text style={[styles.textStyle, {textAlign: 'center'}]}>
                  Bạn chưa thiết lập thu chi. Xin hãy thiết lập thu chi của mình
                </Text>
              )}
              {Object.keys(saveMoney).length > 0 && (
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Layout style={{alignItems: 'center'}}>
                    <Layout style={styles.btnStyle}>
                      <Text style={{color: '#fff'}}>Thiết lập lại mục tiêu tiết kiệm</Text>
                    </Layout>
                  </Layout>
                </TouchableOpacity>
              )}
            </Layout>
          </Layout>
          <Modal visible={showModal} backdropStyle={styles.backdrop} onBackdropPress={() => setShowModal(false)}>
            <Layout style={[styles.boxContainer, styles.modalContainer]}>
              <Text style={styles.textStyle}>Mục tiêu tiết kiệm mới là</Text>
              <Layout style={[styles.boxContainer, {flexDirection: 'row'}]}>
                <CurrencyInput
                  style={styles.inputStyle}
                  value={input}
                  onChangeValue={text => setInput(Number(text))}
                  separator=","
                  precision={0}
                  minValue={0}
                />
                <Text style={styles.textStyle}>VND</Text>
              </Layout>
              <Layout style={{marginTop: 20}}>
                <TextInputGroup
                  style={styles.textInput}
                  layoutProps={{style: styles.textInputLayout}}
                  onChangeText={text => setNote(text)}
                  label="Mục đích chính"
                  value={note}
                />
              </Layout>
              <Layout style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => setShowModal(false)}>
                  <Layout style={[styles.btnCancelStyle]}>
                    <Text style={{color: '#fff'}}>Hủy</Text>
                  </Layout>
                </TouchableOpacity>
                <CustomButton title="Xác nhận" onPress={setNewTarget} disabled={input === 0} />
              </Layout>
            </Layout>
          </Modal>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: '100%',
    alignItems: 'flex-start',
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  boxContainer: {},
  textStyle: {
    fontSize: 24,
  },
  inputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '60%',
    borderColor: '#000',
  },
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    borderRadius: 20,
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
  textInputLayout: {
    width: '90%',
    marginBottom: 24,
  },
  textInput: {
    borderRadius: 50,
  },
});

export default Profile;
