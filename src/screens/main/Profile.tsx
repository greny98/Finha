import React, {useCallback, useEffect, useState} from 'react';
import {Layout, Text, Input, Modal} from '@ui-kitten/components';
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {convertCurrencyVN} from 'utils/utils';
import moment from 'moment';
import {getDBConnection, getProfile, getSaveMoney} from 'db/db-service';

interface Props {}

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};
const Profile = (props: Props) => {
  const [saveMoney, setSaveMoney] = useState<any>({});
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  //Navigation

  const loadIncome = async () => {
    const db = await getDBConnection();
    const result = await getSaveMoney(db);
    if (result.length > 0) {
      setSaveMoney(result[0]);
    }
    const profileResult = await getProfile(db);
    if (profileResult.length > 0) {
      const restAmount = profileResult[0].amount - (Object.keys(saveMoney).length > 0 ? saveMoney.amount : 0);
      setTotal(restAmount);
    }
  };

  useEffect(() => {
    loadIncome();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      loadIncome();
    });
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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
            </Layout>
          </Layout>
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
