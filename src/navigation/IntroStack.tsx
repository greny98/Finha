import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FirstIntroActivity from 'screens/intro/FirstIntroActivity';
import SecondIntroActivity from 'screens/intro/SecondIntroActivity';
import ThirdIntroActivity from 'screens/intro/ThirdIntroActivity';

interface Props {}

const Stack = createNativeStackNavigator();

const IntroStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="IntroOne">
      <Stack.Screen name="IntroOne" component={FirstIntroActivity} />
      <Stack.Screen name="IntroTwo" component={SecondIntroActivity} />
      <Stack.Screen name="IntroThree" component={ThirdIntroActivity} />
    </Stack.Navigator>
  );
};

export default IntroStack;
