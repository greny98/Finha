import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import BtnNavigationGroup from "./src/components/BtnNavigationGroup";
import HomeActivity from "screens/main/HomeActivity";
import TabNav from "navigation/TabNav";

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <TabNav />
  </ApplicationProvider>
);
