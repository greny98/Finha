import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  active?: boolean;
  title: string;
  onPress:any
}

const ButtonGroupA = (props: Props) => {
  const {active = true, title,onPress} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Layout
        style={[
          styles.btnStyle,
          {backgroundColor: active ? '#00C6BA' : '#EBEDFF'},
        ]}>
        <Text style={{fontSize: 18, color: active ? '#fff' : '#000'}}>
          {title}
        </Text>
      </Layout>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btnStyle: {
    width: 150,
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonGroupA;
