import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeActivity from 'screens/main/HomeActivity';
import FirstIntroActivity from 'screens/intro/FirstIntroActivity';
import SecondIntroActivity from 'screens/intro/SecondIntroActivity';
import ThirdIntroActivity from 'screens/intro/ThirdIntroActivity';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';

interface Props {}

const Stack = createNativeStackNavigator();

const IntroStack = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    navigation.navigate('IntroOne');
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IntroOne" component={FirstIntroActivity} />
      <Stack.Screen name="IntroTwo" component={SecondIntroActivity} />
      <Stack.Screen name="IntroThree" component={ThirdIntroActivity} />
    </Stack.Navigator>
  );
};

export default IntroStack;
