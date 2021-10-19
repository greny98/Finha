import {Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';
import {getDBConnection, getSaveMoney} from 'db/db-service';

interface Props {}

const SaveMoneyLoading = (props: Props) => {
  // STATE
  const [saveMoney, setSaveMoney] = useState<any>({});
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateNextScreen = () => {
    navigation.navigate('SaveForm');
  };

  const navigateInfoSaveMoneyScreen = () => {
    navigation.navigate('InfoSave');
  };

  const loadSaveMoney = async () => {
    const db = await getDBConnection();

    const result = await getSaveMoney(db);
    if (result.length > 0) {
      return setTimeout(navigateInfoSaveMoneyScreen, 2000);
    }
    return setTimeout(navigateNextScreen, 2000);
  };

  useEffect(() => {
    loadSaveMoney();
  }, []);

  return (
    <Layout>
      <Image source={require('assets/images/save-money-loading.png')} style={{width: '100%', height: '100%'}} />
    </Layout>
  );
};

export default SaveMoneyLoading;
