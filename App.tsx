import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import SecondIntroActivity from 'screens/intro/SecondIntroActivity';
import ThirdIntroActivity from 'screens/intro/ThirdIntroActivity';



export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <IconRegistry icons={EvaIconsPack} />
    <ThirdIntroActivity/>
  </ApplicationProvider>
);
