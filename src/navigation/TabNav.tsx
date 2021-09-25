import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeActivity from "screens/main/HomeActivity";
import DataAnalysisActivity from "screens/main/DataAnalysisActivity";
import BtnNavigationGroup from "components/BtnNavigationGroup";
import TransactionActivity from "screens/main/TransactionActivity";
import { useEffect } from "react";
import { createTable, createWallets, getDBConnection, getWallets } from "db/db-service";
import { models } from "db/models";


const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
    primary: "rgb(255, 45, 85)"
  }
};

const TabNav: React.FC = () => {
  useEffect(() => {
    const loadDb = async () => {
      const db = await getDBConnection();
      const createTables = Object.keys(models).map(tableName => createTable(db, tableName, models[tableName]));
      await Promise.all(createTables);
      const wallets = await getWallets(db);
      if (wallets.length === 0) {
        await createWallets(db);
      }
    };
    loadDb();
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator tabBar={props => <BtnNavigationGroup {...props} />}>
        <Tab.Screen name="Home" component={HomeActivity} options={{ headerShown: false, tabBarLabel: "Tổng quan" }} />
        <Tab.Screen name="Data Analysis" component={DataAnalysisActivity}
                    options={{ headerShown: false, tabBarLabel: "Phân tích" }} />
        <Tab.Screen name="Transaction" component={TransactionActivity}
                    options={{ headerShown: false, tabBarLabel: "Thêm giao dịch" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNav;

