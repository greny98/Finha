import {Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import TextInputGroup from '../../components/common/TextInputGroup';

interface Props {}

const SaveMoneyForm = (props: Props) => {
  const [price, setPrice] = useState(0);
  const [folderName, setFolderName] = useState('');
  const [walletType, setWalletType] = useState('');

  return (
    <Layout style={styles.root}>
      <Layout style={styles.formContainer}>
        <Layout>
          <Text>Số tiền tiết kiệm mục tiêu</Text>
          <Input
            onChangeText={nextValue => setPrice(Number(nextValue))}
            style={styles.inputStyle}
          />
        </Layout>
        <Layout style={styles.groupText}>
          <TextInputGroup
            style={styles.textInput}
            layoutProps={{style: styles.textInputLayout}}
            onChangeText={text => setFolderName(text)}
            label="Mục đích chính"
          />
          <TextInputGroup
            style={styles.textInput}
            layoutProps={{style: styles.textInputLayout}}
            onChangeText={text => setFolderName(text)}
            label="Thời gian"
          />
        </Layout>
        <Layout style={{display: 'flex', alignItems: 'center'}}>
          <Button style={styles.btnStyle}>Xác nhận</Button>
        </Layout>

        <Image
          source={require('../../../static/icon/face-icon.png')}
          style={styles.faceStyle}
        />
        <Image
          source={require('../../../static/icon/star-icon.png')}
          style={styles.starStyle}
        />
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
  },
  inputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '60%',
    borderColor: '#000',
  },
  groupText: {
    marginTop: 20,
  },
  textInputLayout: {
    width: '90%',
    marginBottom: 24,
  },
  textInput: {
    borderRadius: 50,
  },
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    width: 150,
    height: 40,
    borderRadius: 60,
  },
  faceStyle: {
    position: 'absolute',
    top: -43,
    left: 30,
  },
  starStyle: {
    position: 'absolute',
    bottom: -30,
    right: 20,
  },
});

export default SaveMoneyForm;
