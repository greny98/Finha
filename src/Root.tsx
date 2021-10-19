import React, {useEffect} from 'react';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroStack from 'navigation/IntroStack';
import TabNav from 'navigation/TabNav';
import SubStack from 'navigation/SubStack';
import TargetStack from 'navigation/TargetStack';
import {getAccessStatus, getDBConnection} from 'db/db-service';
import {useDispatch} from 'react-redux';

interface Props {}

const Stack = createNativeStackNavigator();

const Root = (props: Props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const loadDbToRedux = async () => {
      const db = await getDBConnection();
      const statusAccess = await getAccessStatus(db);
      if (statusAccess.length === 0) {
        navigation.navigate<any>('Intro', {screen: 'IntroOne'});
      } else {
        navigation.navigate<any>('Tab', {screen: 'Home'});
      }
    };
    loadDbToRedux();
  }, []);

  useEffect(() => {}, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Sub" component={SubStack} />
      <Stack.Screen name="Target" component={TargetStack} />
      <Stack.Screen name="Intro" component={IntroStack} />
      <Stack.Screen name="Tab" component={TabNav} />
    </Stack.Navigator>
  );
};

export default Root;
