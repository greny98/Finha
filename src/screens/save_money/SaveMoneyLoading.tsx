import {Layout} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';

interface Props {}

const SaveMoneyLoading = (props: Props) => {
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateNextScreen = () => {
    navigation.navigate('SaveForm');
  };

  useEffect(() => {
    setTimeout(navigateNextScreen, 2000);
  }, []);
  return (
    <Layout>
      <Image source={require('assets/images/save-money-loading.png')} style={{width: '100%', height: '100%'}} />
    </Layout>
  );
};

export default SaveMoneyLoading;
