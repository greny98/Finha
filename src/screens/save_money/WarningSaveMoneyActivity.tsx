import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';

interface Props {}

const WarningSaveMoneyActivity = (props: Props) => {
  const {width} = Dimensions.get('screen');
  return (
    <Layout style={styles.root}>
      <Layout style={styles.flexBox}>
        <Text style={[styles.textStyle, {textTransform: 'uppercase'}]}>
          Cảnh báo!!!
        </Text>
        <Text style={styles.textStyle}>
          Bạn đang có nguy cơ chi tiêu vượt kế hoạch.
        </Text>
        <Text style={styles.textStyle}>
          Hãy kiểm soát khoản chi tiêu mua sắm nhé!
        </Text>
        <Image
          source={require('../../../static/images/monkey.png')}
          style={{marginVertical: 40}}
        />
        <Text style={[styles.textStyle, {textAlign: 'center'}]}>
          Số tiền tiết kiệm được tuần này là 600.000 VNĐ, thấp hơn chỉ tiêu 10%
        </Text>
        <Layout style={[styles.btnContainer, {width}]}>
          <Button style={styles.btnStyle}>
            <Text>Thiết lập lại mục tiêu</Text>
          </Button>
          <Button style={styles.btnStyle}>
            <Text>Không, cảm ơn</Text>
          </Button>
        </Layout>
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
  },
  flexBox: {
    marginTop: 108,
    backgroundColor: '#4BDBD5',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnContainer: {
    backgroundColor: '#4BDBD5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  btnStyle: {
    borderWidth: 0,
    borderRadius: 60,
  },
});

export default WarningSaveMoneyActivity;
