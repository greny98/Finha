import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import VerticalLineChart from '../common/VerticalLineChart';
import {getDBConnection, getTransactions} from 'db/db-service';
import moment from 'moment';

interface Props {}

const chartStatics: any = {
  Sunday: {
    redRate: 20,
    greenRate: 80,
    name: 'CN',
  },
  Money: {
    redRate: 20,
    greenRate: 80,
    name: 'Thứ 2',
  },
  Tuesday: {
    redRate: 30,
    greenRate: 70,
    name: 'Thứ 3',
  },
  Wednesday: {
    redRate: 60,
    greenRate: 40,
    name: 'Thứ 4',
  },
  Thursday: {
    redRate: 50,
    greenRate: 50,
    name: 'Thứ 5',
  },
  Friday: {
    redRate: 40,
    greenRate: 60,
    name: 'Thứ 6',
  },
  Saturday: {
    redRate: 20,
    greenRate: 80,
    name: 'Thứ 7',
  },
};

const LineChartGroup = (props: Props) => {
  const [transaction, setTransaction] = useState<any>({
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  });
  const TODAY = new Date();

  const SUNDAY = moment().startOf('week');
  const MONDAY = moment().startOf('week').add(1, 'd');
  const TUESDAY = moment().startOf('week').add(2, 'd');
  const WEDNESDAY = moment().startOf('week').add(3, 'd');
  const THURSDAY = moment().startOf('week').add(4, 'd');
  const FRIDAY = moment().startOf('week').add(5, 'd');
  const SATURDAY = moment().startOf('week').add(6, 'd');

  const getStartDay = (day: any) => {
    return day.toDate();
  };
  const getEndDay = (day: any) => {
    return day.endOf('d').toDate();
  };

  console.log('========', getEndDay(SUNDAY));

  const loadListTrans = async () => {
    const db = await getDBConnection();
    // get income amount
    const listSunday = await getTransactions(
      db,
      moment(getStartDay(SUNDAY)).startOf('d').toDate(),
      moment(getEndDay(SUNDAY)).endOf('d').toDate(),
    );
    console.log('🚀 ~ file: LineChartGroup.tsx ~ line 83 ~ loadListTrans ~ listSunday', listSunday);
  };

  useEffect(() => {
    loadListTrans();
  }, []);
  return (
    <Layout>
      <Layout style={styles.flexBox}>
        {Object.keys(chartStatics).map(option => {
          return (
            <View key={option}>
              <VerticalLineChart
                day={chartStatics[option].name}
                redRate={chartStatics[option].redRate}
                greenRate={chartStatics[option].greenRate}
              />
            </View>
          );
        })}
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
});

export default LineChartGroup;
