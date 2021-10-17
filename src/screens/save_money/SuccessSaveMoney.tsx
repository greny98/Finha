import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';

interface Props {}

const SuccessSaveMoney = (props: Props) => {
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateHome = () => {
    navigation.navigate('Tab', {screen: 'Home'});
  };

  return (
    <Layout style={styles.root}>
      <Layout style={styles.formContainer}>
        <Image source={require('assets/images/check-circle-2.png')} />
        <Layout style={{marginTop: 40}}>
          <Text style={styles.textStyle}>Ting Ting! Mục tiêu tiết kiệm của bạn vừa được thiết lập</Text>
          <Text style={styles.textStyle}>Bạn cần tiết kiệm 200.000 VNĐ mỗi ngày</Text>
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
export default SuccessSaveMoney;
