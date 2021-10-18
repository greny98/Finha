import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';
import {convertCurrencyVN, getCategoryColor, getCategoryName} from 'utils/utils';

interface Props {
  data: any;
}

const StatisticGroup = (props: Props) => {
  const {data} = props;
  return (
    <Layout style={styles.root}>
      <Layout style={styles.flexBox}>
        <Layout style={[styles.iconCircle, {backgroundColor: getCategoryColor(data.categoryId)}]} />
        <Text style={{fontSize: 18}}>{getCategoryName(data.category)}</Text>
      </Layout>
      <Layout>
        <Text style={{fontSize: 18, color: data.factor === 1 ? '#00C6BA' : '#FE645A'}}>
          {data.factor === 1 ? '+' : '-'}
          {convertCurrencyVN(data.amount)}
        </Text>
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
