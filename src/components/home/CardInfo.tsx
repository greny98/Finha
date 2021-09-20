import React from 'react';
import {Layout, Text, Button} from '@ui-kitten/components';
import {StyleSheet, Image, View} from 'react-native';

interface Props {}

const CardInfo = (props: any) => {
  const {day, downPrice, upPrice, savePrice} = props;

  const downRate = (downPrice / (downPrice + upPrice)) * 100;
  const downRateString = downRate.toString() + '%';
  const upRate = (upPrice / (downPrice + upPrice))* 100;
  const upRateString = upRate.toString() + '%';

  return (
    <Layout style={styles.cardContainer}>
      <Layout>
        <Layout style={[styles.flexBox, {justifyContent: 'space-between'}]}>
          <Text>{day}</Text>
          <Layout style={styles.flexBox}>
            <Text style={styles.textDecrease}>-{downPrice}</Text>
            <Text style={styles.textIncrease}>+{upPrice}</Text>
          </Layout>
        </Layout>
        <Layout style={[styles.flexBox, {marginTop: 16}]}>
          <Layout
            style={[
              styles.line,
              {
                width: downRateString,
                backgroundColor: '#FE645A',
                marginRight: 6,
              },
            ]}
          />
          <Layout
            style={[
              styles.line,
              {width: upRateString, backgroundColor: '#00C6BA'},
            ]}
          />
        </Layout>
      </Layout>

      <Layout style={[styles.flexBox, {justifyContent: 'space-between'}]}>
        <Layout>
          <Text>Số tiền tiết kiệm</Text>
          <Text>{savePrice}</Text>
        </Layout>
        <Layout>
          <Button style={styles.btnStyle}>+</Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 280,
    height: 180,
    borderRadius: 20,
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDecrease: {
    color: '#FE645A',
    marginRight: 6,
  },
  textIncrease: {
    color: '#00C6BA',
  },
  line: {
    height: 2,
  },
  btnStyle: {
    backgroundColor: '#00C6BA',
    borderWidth: 0,
    borderRadius: 16,
  },
});

export default CardInfo;
