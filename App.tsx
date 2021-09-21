import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {View} from 'react-native';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import ThirdIntroActivity from './src/screens/intro/ThirdIntroActivity';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <IconRegistry icons={EvaIconsPack} />
    <ThirdIntroActivity />
  </ApplicationProvider>
);
