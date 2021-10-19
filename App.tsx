import React, {useEffect} from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Root from 'Root';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {
  createCategories,
  createProfile,
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
// import 'moment/locale/vi'

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    primary: 'rgb(255, 45, 85)',
  },
};

const App = () => {

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
