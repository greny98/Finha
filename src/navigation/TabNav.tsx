import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeActivity from "screens/main/HomeActivity";
import DataAnalysisActivity from "screens/main/DataAnalysisActivity";
import BtnNavigationGroup from "components/BtnNavigationGroup";
import TransactionActivity from "screens/main/TransactionActivity";
import { useEffect } from "react";
import {
  createTable,
  createTransactions,
  createWallets,
  deleteTable,
  getDBConnection, getTransactions,
  getWallets
} from "db/db-service";
import { models } from "db/models";
import moment from "moment";

const Tab = createBottomTabNavigator();

const TabNav: React.FC = () => {
  useEffect(() => {
    const loadDb = async () => {
      const db = await getDBConnection();
      const deleteTables = Object.keys(models).map(tableName => deleteTable(db, tableName));
      await Promise.all(deleteTables);
      const createTables = Object.keys(models).map(tableName => createTable(db, tableName, models[tableName]));
      await Promise.all(createTables);
      const wallets = await getWallets(db);
      if (wallets.length === 0) {
        await createWallets(db);
      }
      await createTransactions(db, {
        categoryId: 1,
        factor: -1,
        note: "Test",
        amount: 100000,
        date: moment(new Date()).startOf("day").add(5, "hour").toDate(),
        walletId: 1
      });
      await createTransactions(db, {
        categoryId: 1,
        factor: -1,
        note: "Test 1234",
        amount: 100000,
        date: moment(new Date()).endOf("day").subtract(5, "hour").toDate(),
        walletId: 1
      });
      const trans = await getTransactions(db,
        moment(new Date()).startOf("day").toDate(),
        moment(new Date()).endOf("day").toDate());
      console.log("==== ", trans);
    };
    loadDb();
  }, []);

  return (
    <Tab.Navigator tabBar={props => <BtnNavigationGroup {...props} />}>
      <Tab.Screen name="Home" component={HomeActivity} options={{ headerShown: false, tabBarLabel: "Tổng quan" }} />
      <Tab.Screen
        name="DataAnalysis"
        component={DataAnalysisActivity}
        options={{ headerShown: false, tabBarLabel: "Phân tích" }}
      />
      <Tab.Screen
        name="Transaction"
        component={TransactionActivity}
        options={{ headerShown: false, tabBarLabel: "Thêm giao dịch" }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
