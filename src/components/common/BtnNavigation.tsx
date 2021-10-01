import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image, TouchableHighlight, TouchableHighlightProps} from 'react-native';

interface Props extends TouchableHighlightProps {
  iconActive?: any;
  icon?: any;
  text: string;
  active: boolean;
}

const BtnNavigation = (props: Props) => {
  const {iconActive, icon, text, active, ...btnProps} = props;
  return (
    <TouchableHighlight
      style={[styles.btnContainer, {backgroundColor: active ? '#EBEDFF' : 'transparent'}]}
      underlayColor="#aeb5f5"
      {...btnProps}>
      <Layout style={[styles.btnContainer, {backgroundColor: 'transparent'}]}>
        <Image source={active ? iconActive : icon} />
        {active && <Text style={styles.textStyle}>{text}</Text>}
      </Layout>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 130,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EBEDFF',
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    color: '#2A327D',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: 'bold',
  },
});

export default BtnNavigation;
