import React from 'react';
import {Button, Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image} from 'react-native';

interface Props {}

const BtnNavigation = (props: any) => {
  const {iconActive, icon, text, active} = props;
  return (
    <Layout style={styles.btnContainer}>
        <Image source={active ? iconActive : icon} />
        {active && <Text style={styles.textStyle}>{text}</Text>}
    </Layout>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 130,
    height: 36,
    borderRadius: 16,
    backgroundColor: '#EBEDFF',
    paddingLeft: 8,
    paddingRight: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
  },
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'red'
  },
  textStyle: {
    color: '#2A327D',
    fontSize: 14,
    marginLeft: 6,
    fontWeight: 'bold',
  },
});

export default BtnNavigation;
