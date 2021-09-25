import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import TabNav from "navigation/TabNav";
import { NavigationContainer } from "@react-navigation/native";

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  </ApplicationProvider>
);
