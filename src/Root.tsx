import React, {useEffect} from 'react';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroStack from 'navigation/IntroStack';
import TabNav from 'navigation/TabNav';
import SubStack from 'navigation/SubStack';
import TargetStack from 'navigation/TargetStack';

interface Props {}

const Stack = createNativeStackNavigator();

const Root = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    navigation.navigate('Intro');
  }, []);

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
