import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';
import SaveMoneyLoading from 'screens/save_money/SaveMoneyLoading';
import SaveMoneyForm from 'screens/save_money/SaveMoneyForm';
import WarningSaveMoneyActivity from 'screens/save_money/WarningSaveMoneyActivity';
import SuccessSaveMoney from 'screens/save_money/SuccessSaveMoney';
import InfoSaveMoney from 'screens/save_money/InfoSaveMoney';

interface Props {}

const Stack = createNativeStackNavigator();

const TargetStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Loading">
      <Stack.Screen name="Loading" component={SaveMoneyLoading} />
      <Stack.Screen name="SaveForm" component={SaveMoneyForm} />
      <Stack.Screen name="WarningSaveMoney" component={WarningSaveMoneyActivity} />
      <Stack.Screen name="NoticeSuccess" component={SuccessSaveMoney} />
      <Stack.Screen name="InfoSave" component={InfoSaveMoney} />

    </Stack.Navigator>
  );
};

export default TargetStack;
