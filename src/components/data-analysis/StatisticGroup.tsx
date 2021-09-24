import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  text:string;
  price:number;
  color:string;
}

const StatisticGroup = (props: Props) => {
  const {color, text, price} = props;
  return (
    <Layout style={styles.root}>
      <Layout style={styles.flexBox}>
        <Layout style={[styles.iconCircle, {backgroundColor: color}]} />
        <Text style={{fontSize: 18}}>{text}</Text>
      </Layout>
      <Layout>
        <Text style={{fontSize: 18}}>{price}</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 10,
    height: 10,
    borderRadius: 200,
    marginRight: 6,
  },
});

export default StatisticGroup;
