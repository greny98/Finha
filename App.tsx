import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Root from 'Root';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  createCategories,
  createTable,
  createTransactions,
  createWallets,
  deleteTable,
  getAllCategories,
  getDBConnection,
  getWallets,
} from 'db/db-service';
import {models} from 'db/models';
import {Provider} from 'react-redux';
import store from 'redux/stores';
import {mockups} from 'db/mockups';
import 'moment/locale/vi'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {
  useEffect(() => {
    const loadDb = async () => {
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
      await mockups(db);
    };
    loadDb();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer theme={MyTheme}>
          <Root />
        </NavigationContainer>
      </Provider>
    </ApplicationProvider>
  );
};

export default App;
