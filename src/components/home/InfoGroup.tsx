import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {convertCurrencyVN, getCategoryColor, getCategoryName} from 'utils/utils';

interface Props {
  data: any;
}

const InfoGroup = (props: Props) => {
  const {data} = props;
  return (
    <Layout style={{marginBottom: 8}}>
      <Layout style={styles.flexBox}>
        <Layout style={[styles.shortCutImage, {backgroundColor: getCategoryColor(data.categoryId)}]}>
          <Text style={{textTransform: 'uppercase'}}>{data.category.slice(0, 2)}</Text>
        </Layout>
        <Layout style={styles.infoContainer}>
          <Text style={styles.nameStyle}>{getCategoryName(data.category)}</Text>
          <Layout style={styles.flexBox}>
            {data.factor === 1 ? (
              <Text style={{color: data.factor === 1 ? '#00C6BA' : '#FE645A'}}>+</Text>
            ) : (
              <Text style={{color: data.factor === 1 ? '#00C6BA' : '#FE645A'}}>-</Text>
            )}
            <Text style={[styles.priceStyle, {color: data.factor === 1 ? '#00C6BA' : '#FE645A'}]}>
              {convertCurrencyVN(data.amount)}
            </Text>
          </Layout>
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
