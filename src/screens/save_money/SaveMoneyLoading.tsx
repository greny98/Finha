import {Layout} from '@ui-kitten/components';
import React from 'react';
import {Image} from 'react-native';

interface Props {}

const SaveMoneyLoading = (props: Props) => {
  return (
    <Layout>
      <Image
        source={require('assets/images/save-money-loading.png')}
        style={{width: '100%', height: '100%'}}
      />
    </Layout>
  );
};

export default SaveMoneyLoading;
