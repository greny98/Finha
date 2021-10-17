import {Layout, Text} from '@ui-kitten/components';
import CustomButton from 'components/common/CustomButton';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';

interface Props {}

const Profile = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateIncome = () => {
    navigation.navigate('Sub', {screen: 'Income'});
  };

  
  return (
    <Layout>
      <Layout style={styles.boxContainer}>
        <Layout>
          <Image source={require('assets/images/document-success.png')} />
        </Layout>
        <Layout style={styles.textBtnContainer}>
          <Text style={styles.titleStyle}>QUẢN LÝ THÔNG TIN!</Text>
          <Text style={styles.subTitleStyle}>Cập nhật thông tin ví và thể loại giao dịch</Text>
          <TouchableOpacity onPress={navigateIncome}>
            <Layout style={[styles.btnTwoStyle]}>
              <Text style={{color: '#fff', fontSize: 18}}>Xem thu nhập</Text>
            </Layout>
          </TouchableOpacity>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 120,
  },
  textBtnContainer: {
    display: 'flex',
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
    color: '#C0C2D1',
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

export default Profile;
