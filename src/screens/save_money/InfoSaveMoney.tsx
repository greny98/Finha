import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';
import {getDBConnection, getSaveMoney} from 'db/db-service';
import {convertCurrencyVN} from 'utils/utils';
import moment from 'moment';

interface Props {}

const InfoSaveMoney = (props: Props) => {
  // STATE
  const [saveMoney, setSaveMoney] = useState<any>({});
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateHome = () => {
    navigation.navigate('Tab', {screen: 'Home'});
  };

  const loadSaveMoney = async () => {
    const db = await getDBConnection();

    const result = await getSaveMoney(db);
    if (result.length > 0) {
      setSaveMoney(result[0]);
    }
  };

  useEffect(() => {
    loadSaveMoney();
  }, []);

  return (
    <Layout style={styles.root}>
      <Layout style={styles.formContainer}>
        <Image source={require('assets/images/info.png')} />
        <Layout style={{marginTop: 40}}>
          <Text style={styles.textStyle}>Bạn đã thiết lập mục tiêu tiết kiệm</Text>
          <Text style={styles.textStyle}>
            Bạn cần tiết kiệm<Text style={{fontWeight: 'bold'}}> {convertCurrencyVN(Number(saveMoney.amount))}</Text>{' '}
            trong tháng {moment().format('M')} này
          </Text>
        </Layout>
        <TouchableOpacity onPress={navigateHome}>
          <Layout style={{display: 'flex', alignItems: 'center'}}>
            <Layout style={styles.btnStyle}>
              <Text style={{color: '#fff'}}>Xác nhận</Text>
            </Layout>
          </Layout>
        </TouchableOpacity>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#4BDBD5',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: 320,
    padding: 20,
    borderRadius: 30,
    position: 'relative',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    marginBottom: 20,
  },
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    width: 150,
    height: 40,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default InfoSaveMoney;
