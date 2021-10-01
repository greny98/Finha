import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Root from 'Root';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  createTable,
  createTransactions,
  createWallets,
  deleteTable,
  getDBConnection,
  getTransactions,
  getWallets,
} from 'db/db-service';
import {models} from 'db/models';
import moment from 'moment';
import TransactionActivity from 'screens/main/TransactionActivity';

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
      const wallets = await getWallets(db);
      if (wallets.length === 0) {
        await createWallets(db);
      }
      await createTransactions(db, {
        categoryId: 1,
        factor: -1,
        note: 'Test',
        amount: 100000,
        date: moment(new Date()).startOf('day').add(5, 'hour').toDate(),
        walletId: 1,
      });
      await createTransactions(db, {
        categoryId: 1,
        factor: -1,
        note: 'Test 1234',
        amount: 100000,
        date: moment(new Date()).endOf('day').subtract(5, 'hour').toDate(),
        walletId: 1,
      });
      const trans = await getTransactions(
        db,
        moment(new Date()).startOf('day').toDate(),
        moment(new Date()).endOf('day').toDate(),
      );
      console.log('==== ', trans);
    };
    loadDb();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer theme={MyTheme}>
        <TransactionActivity />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
