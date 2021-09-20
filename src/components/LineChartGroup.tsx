import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image, View} from 'react-native';
import VerticalLineChart from './common/VerticalLineChart';

interface Props {}

const chartStatics: any = {
  CN: {
    redRate: 20,
    greenRate: 80,
  },
  'Thứ 2': {
    redRate: 20,
    greenRate: 80,
  },
  'Thứ 3': {
    redRate: 30,
    greenRate: 70,
  },
  'Thứ 4': {
    redRate: 60,
    greenRate: 40,
  },
  'Thứ 5': {
    redRate: 50,
    greenRate: 50,
  },
  'Thứ 6': {
    redRate: 40,
    greenRate: 60,
  },
  'Thứ 7': {
    redRate: 20,
    greenRate: 80,
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
                day={option}
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
