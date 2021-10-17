import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeActivity from 'screens/main/HomeActivity';
import DataAnalysisActivity from 'screens/main/DataAnalysisActivity';
import BtnNavigationGroup from 'components/BtnNavigationGroup';
import TransactionActivity from 'screens/main/TransactionActivity';
import Profile from 'screens/main/Profile';

const Tab = createBottomTabNavigator();

const TabNav: React.FC = () => {
  return (
    <Tab.Navigator tabBar={props => <BtnNavigationGroup {...props} />}>
      <Tab.Screen name="Home" component={HomeActivity} options={{headerShown: false, tabBarLabel: 'Tổng quan'}} />
      <Tab.Screen
        name="DataAnalysis"
        component={DataAnalysisActivity}
        options={{headerShown: false, tabBarLabel: 'Phân tích'}}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionActivity}
        options={{headerShown: false, tabBarLabel: 'Giao dịch'}}
      />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown: false, tabBarLabel: 'Hồ sơ'}} />
    </Tab.Navigator>
  );
};

export default TabNav;
