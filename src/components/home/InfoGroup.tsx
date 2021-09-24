import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

interface Props {
  shortcutName: string;
  name: string;
  price: number;
  date: any;
  isIncrease: boolean;
}

const InfoGroup = (props: Props) => {
  const {shortcutName, name, price, date, isIncrease} = props;
  return (
    <Layout>
      <Layout style={styles.flexBox}>
        <Layout
          style={[
            styles.shortCutImage,
            isIncrease
              ? {backgroundColor: '#00C6BA'}
              : {backgroundColor: '#FE645A'},
          ]}>
          <Text style={styles.textInCircle}>{shortcutName}</Text>
        </Layout>
        <Layout style={styles.infoContainer}>
          <Text style={styles.nameStyle}>{name}</Text>
          <Layout style={styles.flexBox}>
            {isIncrease ? (
              <Text style={{color: isIncrease ? '#00C6BA' : '#FE645A'}}>+</Text>
            ) : (
              <Text style={{color: isIncrease ? '#00C6BA' : '#FE645A'}}>-</Text>
            )}
            <Text
              style={[
                styles.priceStyle,
                {color: isIncrease ? '#00C6BA' : '#FE645A'},
              ]}>
              {price}
            </Text>
          </Layout>
          <Text style={styles.dateStyle}>{date}</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shortCutImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInCircle: {
    color: 'white',
  },
  infoContainer: {
    marginLeft: 20,
  },
  nameStyle: {
    fontSize: 20,
  },
  priceStyle: {
    fontSize: 16,
  },
  dateStyle: {
    fontSize: 16,
  },
});

export default InfoGroup;
