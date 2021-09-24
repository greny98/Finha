import React from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import BtnNavigation from './common/BtnNavigation';

interface Props {}

interface ButtonIcon {
  iconActive: any;
  icon: any;
  name: string;
}

const btnTabDict: {[key: string]: ButtonIcon} = {
  overview: {
    iconActive: require('../../static/icon/overview-active.png'),
    icon: require('../../static/icon/overview.png'),
    name: 'Tổng quan',
  },
  analysis: {
    iconActive: require('assets/icon/analysis-active.png'),
    icon: require('assets/icon/analysis.png'),
    name: 'Phân tích',
  },
  transaction: {
    iconActive: require('assets/icon/transaction-active.png'),
    icon: require('assets/icon/transaction.png'),
    name: 'Thêm giao dịch',
  },
};

const BtnNavigationGroup = (props: Props) => {
  return (
    <Layout style={styles.flexBox}>
      {Object.keys(btnTabDict).map(option => {
        return (
          <View key={option}>
            <BtnNavigation
              text={btnTabDict[option].name}
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
