import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  stepActive : number
}

const StepGroup = (props: Props) => {
  const { stepActive } = props
  return (
    <Layout style={styles.root}>
      <Layout style={[styles.lineStep, { backgroundColor: stepActive == 1 ? '#0AA3F0':'#CBD6F3'}]} />
      <Layout style={[styles.lineStep, { backgroundColor: stepActive == 2 ? '#0AA3F0':'#CBD6F3'}]} />
      <Layout style={[styles.lineStep, { backgroundColor: stepActive == 3 ? '#0AA3F0':'#CBD6F3'}]} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  lineStep: {
    width: 22,
    height: 4,
    borderRadius: 10,
    marginRight: 2,
  },
});

export default StepGroup;
