import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import {View} from 'react-native';
import NewFolderForm from './src/screens/NewFolderForm';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NewFolderForm />
  </ApplicationProvider>
);
