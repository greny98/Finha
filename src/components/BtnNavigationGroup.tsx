import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image, View} from 'react-native';
import BtnNavigation from './common/BtnNavigation';

interface Props {}

const btnTabDict: any = {
  'Tổng quan': {
    iconActive: require('../../static/icon/overview-active.png'),
    icon: require('../../static/icon/overview.png'),
  },
  'Phân tích': {
    iconActive: require('../../static/icon/analysis-active.png'),
    icon: require('../../static/icon/analysis.png'),
  },
  'Thêm giao dịch': {
    iconActive: require('../../static/icon/transaction-active.png'),
    icon: require('../../static/icon/transaction.png'),
  },
};

const BtnNavigationGroup = (props: Props) => {
  return (
    <Layout style={styles.flexBox}>
      {Object.keys(btnTabDict).map(option => {
        console.log(option);
        return (
          <View key={option}>
            <BtnNavigation
              text={option}
              iconActive={btnTabDict[option].iconActive}
              icon={btnTabDict[option].icon}
              active={true}
            />
          </View>
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

});

export default BtnNavigationGroup;
