import React, {useEffect} from 'react';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroStack from 'navigation/IntroStack';
import TabNav from 'navigation/TabNav';
import SubStack from 'navigation/SubStack';
import TargetStack from 'navigation/TargetStack';
import {
  createCategories,
  createProfile,
  createTable,
  createWallets,
  deleteTable,
  getAccessStatus,
  getAllCategories,
  getDBConnection,
  getWallets,
} from 'db/db-service';
import {models} from 'db/models';
import {mockups} from 'db/mockups';

interface Props {}

const Stack = createNativeStackNavigator();

const Root = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const loadDb = async () => {
      try {
        const db = await getDBConnection();
        const deleteTables = Object.keys(models).map(tableName => deleteTable(db, tableName));
        await Promise.all(deleteTables);
        const createTables = Object.keys(models).map(tableName => createTable(db, tableName, models[tableName]));
        await Promise.all(createTables);
        const categories = await getAllCategories(db);
        if (categories.length === 0) {
          await createCategories(db);
        }
        const wallets = await getWallets(db);
        if (wallets.length === 0) {
          await createWallets(db);
        }
        await createProfile(db);
        await mockups(db);
        const statusAccess = await getAccessStatus(db);
        if (statusAccess.length === 0) {
          navigation.navigate('Intro', {screen: 'IntroOne'});
        } else {
          navigation.navigate('Tab', {screen: 'Home'});
        }
      } catch (error: any) {
        throw new Error(error);
      }
    };
    loadDb();
  }, []);

  useEffect(() => {}, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Intro"
      >
      <Stack.Screen name="Intro" component={IntroStack} />
      <Stack.Screen name="Tab" component={TabNav} />
      <Stack.Screen name="Target" component={TargetStack} />
      <Stack.Screen name="Sub" component={SubStack} />
    </Stack.Navigator>
  );
};

export default Root;
