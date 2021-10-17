import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';

interface Props {}

const NoteTransaction = (props: Props) => {
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateHome = () => {
    navigation.navigate('Tab', {screen: 'Home'});
  };
  return (
    <Layout style={styles.root}>
      <TouchableOpacity onPress={navigateHome}>
        <Layout style={[styles.btnTwoStyle]}>
          <Text style={{color: '#fff', fontSize: 18}}>Quay lại</Text>
        </Layout>
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  btnTwoStyle: {
    backgroundColor: '#00C6C6',
    borderRadius: 30,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default NoteTransaction;
