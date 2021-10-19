import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image} from 'react-native';
interface Props {
  redRate: number;
  greenRate: number;
  day: string;
}

const VerticalLineChart = (props: Props) => {
  const {redRate, greenRate, day} = props;
  if (day === 'Thứ 3') {
    console.log(redRate, greenRate);
  }
  return (
    <Layout>
      <Layout style={styles.lineContainer}>
        <Layout style={[styles.greenLine, {height: greenRate}]} />
        <Layout style={[styles.redLine, {height: redRate}]} />
      </Layout>
      <Layout style={styles.textContainer}>
        <Text>{day}</Text>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    height: 100,
    width: 40,
    display: 'flex',
    alignItems: 'center',
  },
  redLine: {
    backgroundColor: '#FE645A',
    width: 4,
  },
  greenLine: {
    backgroundColor: '#00C6BA',
    width: 4,
    marginBottom: 4,
  },
  textContainer: {
    width: 40,
    display: 'flex',
    alignItems: 'center',
  },
});

export default VerticalLineChart;
