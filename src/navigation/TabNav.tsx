import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeActivity from "screens/main/HomeActivity";
import DataAnalysisActivity from "screens/main/DataAnalysisActivity";
import BtnNavigationGroup from "components/BtnNavigationGroup";
import TransactionActivity from "screens/main/TransactionActivity";


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

