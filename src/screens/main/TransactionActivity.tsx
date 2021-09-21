import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

interface Props {}

const TransactionActivity = (props: Props) => {
  return (
    <Layout>
      <Layout style={styles.boxContainer}>
        <Layout>
          <Image source={require('../../static/images/document.png')} />
        </Layout>
        <Layout style={styles.textBtnContainer}>
          <Text style={styles.titleStyle}>Bắt đầu</Text>
          <Text style={styles.subTitleStyle}>Cập nhật dữ liệu</Text>
          <Button style={styles.btnStyle}>
            <Text style={{color: 'white'}}>+</Text>
          </Button>
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
  },
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    borderRadius: 100,
    marginTop: 40,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default TransactionActivity;
