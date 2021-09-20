import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import NewForderForm from './src/screens/NewForderForm';

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NewForderForm />
  </ApplicationProvider>
);
