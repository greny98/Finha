import React from 'react';
import {
  Input,
  Layout,
  Text,
  InputProps,
  LayoutProps,
  TextProps,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

interface Props extends InputProps {
  layoutProps?: LayoutProps;
  label: string;
  labelProps?: TextProps;
}

const TextInputGroup = (props: Props) => {
  const {layoutProps, labelProps, label, ...inputProps} = props;

  return (
    <Layout {...layoutProps}>
      <Text category="s2" style={styles.label} {...labelProps}>
        {label}
      </Text>
      <Input {...inputProps} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
});

export default TextInputGroup;
