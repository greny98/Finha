import React from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import VerticalLineChart from '../common/VerticalLineChart';

interface Props {}

const chartStatics: any = {
  Sunday: {
    redRate: 20,
    greenRate: 80,
    name: 'CN',
  },
  Money: {
    redRate: 20,
    greenRate: 80,
    name: 'Thứ 2',
  },
  Tuesday: {
    redRate: 30,
    greenRate: 70,
    name: 'Thứ 3',
  },
  Wednesday: {
    redRate: 60,
    greenRate: 40,
    name: 'Thứ 4',
  },
  Thursday: {
    redRate: 50,
    greenRate: 50,
    name: 'Thứ 5',
  },
  Friday: {
    redRate: 40,
    greenRate: 60,
    name: 'Thứ 6',
  },
  Saturday: {
    redRate: 20,
    greenRate: 80,
    name: 'Thứ 7',
  },
};

const LineChartGroup = (props: Props) => {
  return (
    <Layout>
      <Layout style={styles.flexBox}>
        {Object.keys(chartStatics).map(option => {
          return (
            <View key={option}>
              <VerticalLineChart
                day={chartStatics[option].name}
                redRate={chartStatics[option].redRate}
                greenRate={chartStatics[option].greenRate}
              />
            </View>
          );
        })}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
});

export default LineChartGroup;
