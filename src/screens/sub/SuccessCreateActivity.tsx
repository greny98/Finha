import {Layout, Text} from '@ui-kitten/components';
import CustomButton from 'components/common/CustomButton';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';

interface Props {}

const SuccessCreateActivity = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateNote = () => {
    navigation.navigate('Sub', {screen: 'NoteTransaction'});
  };
  return (
    <Layout>
      <Layout style={styles.boxContainer}>
        <Layout>
          <Image source={require('assets/images/document-success.png')} />
        </Layout>
        <Layout style={styles.textBtnContainer}>
          <Text style={styles.titleStyle}>GHI CHÉP THÀNH CÔNG!</Text>
          <Text style={styles.subTitleStyle}>Cập nhật thường xuyên khoản thu chi mỗi ngày nhé!</Text>
          <CustomButton title="Xem sổ ghi chép" onPress={navigateNote} />
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
});

export default SuccessCreateActivity;
