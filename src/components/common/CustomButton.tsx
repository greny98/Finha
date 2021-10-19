import {Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

const CustomButton = (props: Props) => {
  const {title, onPress, disabled} = props;
  return (
    <TouchableHighlight style={styles.btnStyle} underlayColor="#008a81" onPress={onPress} disabled={disabled}>
      <Text style={{color: '#fff'}}>{title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#00C6C6',
    borderWidth: 0,
    width: 140,
    height: 40,
    borderRadius: 60,
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomButton;
