import React, {useState} from 'react';
import {Layout, Text, Input, Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import CustomButton from 'components/common/CustomButton';

interface Props {}

const IncomeActivity = (props: Props) => {
  const [price, setPrice] = useState(0);
  return (
    <Layout style={styles.root}>
      <Layout
        style={[
          styles.boxContainer,
          {marginTop: 80, padding: 12, marginBottom: 160},
        ]}>
        <Text style={styles.textStyle}>Tổng thu nhập tháng của bạn</Text>
        <Layout style={[styles.boxContainer, {flexDirection: 'row'}]}>
          <Input
            onChangeText={nextValue => setPrice(Number(nextValue))}
            style={styles.inputStyle}
          />
          <Text style={styles.textStyle}>VND</Text>
        </Layout>
      </Layout>
      <CustomButton title="Tiếp theo" onPress={() => {}} />
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
});

export default IncomeActivity;
