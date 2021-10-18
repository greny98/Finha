import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewFolderForm from 'screens/sub/NewFolderForm';
import SuccessCreateActivity from 'screens/sub/SuccessCreateActivity';
import NoteTransaction from 'screens/sub/NoteTransaction';

interface Props {}

const Stack = createNativeStackNavigator();

const SubStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="CreateFolder" component={NewFolderForm} />
      <Stack.Screen name="CreateSuccess" component={SuccessCreateActivity} />
      <Stack.Screen name="NoteTransaction" component={NoteTransaction} />
    </Stack.Navigator>
  );
};

export default SubStack;
