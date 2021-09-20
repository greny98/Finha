import React, {useState} from 'react';
import {Layout, Text, Input, Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

interface Props {}

const IncomeActivity = (props: Props) => {
  const [price, setPrice] = useState(0);
  return (
    <Layout style={styles.root}>
      <Layout style={[styles.boxContainer, {marginTop: 80, padding: 12}]}>
        <Text style={styles.textStyle}>Tổng thu nhập tháng của bạn</Text>
        <Layout style={[styles.boxContainer, {flexDirection: 'row'}]}>
          <Input
            placeholder="Place your Text"
            onChangeText={nextValue => setPrice(Number(nextValue))}
            style={styles.inputStyle}
          />
          <Text style={styles.textStyle}>VND</Text>
        </Layout>
      </Layout>
      <Button style={styles.btnStyle}>
        <Text>Tiếp theo</Text>
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  boxContainer: {
    display: 'flex',
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
    backgroundColor: '#00C6BA',
    borderWidth: 0,
    borderRadius: 60,
    width: 180,
    position: 'absolute',
    bottom: 80,
  },
});

export default IncomeActivity;
