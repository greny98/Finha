import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';

interface Props {}

const CardInfo = (props: any) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateCreatExpense = () => {
    navigation.navigate('Sub', {screen: 'CreateFolder'});
  };

  const {day, downPrice, upPrice, savePrice} = props;

  const downRate = (downPrice / (downPrice + upPrice)) * 100;
  const downRateString = downRate.toString() + '%';
  const upRate = (upPrice / (downPrice + upPrice)) * 100;
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
          <Layout style={[styles.line, {width: upRateString, backgroundColor: '#00C6BA'}]} />
        </Layout>
      </Layout>

      <Layout style={[styles.flexBox, {justifyContent: 'space-between'}]}>
        <Layout>
          <Text>Số tiền tiết kiệm</Text>
          <Text>{savePrice}</Text>
        </Layout>
        <Layout>
          <TouchableOpacity style={styles.btnStyle} onPress={navigateCreatExpense}>
            <Text style={{color: '#fff', fontSize: 24}}>+</Text>
          </TouchableOpacity>
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
    borderRadius: 10,
    width: 36,
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardInfo;
