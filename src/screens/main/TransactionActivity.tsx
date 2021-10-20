import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';

interface Props {}

const TransactionActivity = (props: Props) => {
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateCreateExpense = () => {
    navigation.navigate('Sub', {screen: 'CreateFolder'});
  };

  const navigateSaveMoney = () => {
    navigation.navigate('Target', {screen: 'SaveMoneyLoading'});
  };


  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Layout>
          <Layout style={styles.boxContainer}>
            <Layout>
              <Image source={require('assets/images/document.png')} />
            </Layout>
            <Layout style={styles.textBtnContainer}>
              <Text style={styles.titleStyle}>Bắt đầu</Text>
              <Text style={styles.subTitleStyle}>Cập nhật dữ liệu</Text>
              <TouchableOpacity onPress={navigateCreateExpense}>
                <Layout style={styles.btnStyle}>
                  <Text style={{color: 'white', fontSize: 20}}>+</Text>
                </Layout>
              </TouchableOpacity>

              <TouchableOpacity onPress={navigateSaveMoney}>
                <Layout style={[styles.btnTwoStyle]}>
                  <Text style={{color: '#fff', fontSize: 18}}>Xem mục tiêu tiết kiệm</Text>
                </Layout>
              </TouchableOpacity>
            </Layout>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  textBtnContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#262D30',
  },
  subTitleStyle: {
    fontSize: 16,
    marginTop: 10,
  },
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    borderRadius: 100,
    marginTop: 30,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  btnTwoStyle: {
    backgroundColor: '#00C6C6',
    borderRadius: 30,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default TransactionActivity;
