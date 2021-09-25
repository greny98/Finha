import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import Root from 'Root';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

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
      <IconRegistry icons={EvaIconsPack} />
      <NavigationContainer theme={MyTheme}>
        <Root />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
