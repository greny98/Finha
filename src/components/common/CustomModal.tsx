import {Button, Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import StepGroup from './StepGroup';

interface Props {
  title: string;
  content: string;
  stepActive: number;
  imageOrButton?: boolean;
}

const CustomModal = (props: Props) => {
  const {title, content, stepActive, imageOrButton = true} = props;
  return (
    <Layout style={styles.root}>
      <Layout style={styles.flexBox}>
        <Text style={styles.title}>{title}</Text>
      </Layout>
      <Layout style={styles.flexBox}>
        <Text style={styles.subTitle}>{content}</Text>
      </Layout>
      <Layout style={styles.btnContainer}>
        <Layout style={{marginLeft: 20}}>
          <StepGroup stepActive={stepActive} />
        </Layout>
        {imageOrButton ? (
          <TouchableOpacity>
            <Image source={require('assets/icon/btn-next.png')} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnStyle}>
            <Text style={{color: '#fff'}}>WELCOME TO FIHA</Text>
          </TouchableOpacity>
        )}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 300,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    elevation: 5,
    padding: 12,
    position: 'relative',
  },
  flexBox: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#888A8C',
  },
  btnContainer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 40,
  },
  btnStyle: {
    backgroundColor: '#0AA3F0',
    borderRadius: 10,
    padding: 16,
  },
  lineStep: {
    width: 22,
    height: 4,
    borderRadius: 10,
    backgroundColor: 'red',
  },
});

export default CustomModal;
