import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import VerticalLineChart from '../common/VerticalLineChart';
import {getDBConnection, getTransactions} from 'db/db-service';
import moment from 'moment';
import {calcTotalTrans} from 'utils/utils';

interface Props {}

const LineChartGroup = (props: Props) => {
  const [transaction, setTransaction] = useState<any>({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });
  const [salary, setSalary] = useState(0);

  const TODAY = new Date();

  const DAY: any = {
    MONDAY: moment().startOf('week').add(1, 'd'),
    TUESDAY: moment().startOf('week').add(2, 'd'),
    WEDNESDAY: moment().startOf('week').add(3, 'd'),
    THURSDAY: moment().startOf('week').add(4, 'd'),
    FRIDAY: moment().startOf('week').add(5, 'd'),
    SATURDAY: moment().startOf('week').add(6, 'd'),
    SUNDAY: moment().startOf('week').add(7, 'd'),
  };
  
  const getStartDay = (day: any) => {
    return day.startOf('d').toDate();
  };
  const getEndDay = (day: any) => {
    return day.endOf('d').toDate();
  };
  

  const loadListTrans = async () => {
    const db = await getDBConnection();
    // get income amount
    const incomeThisMonth = await getTransactions(
      db,
      moment(TODAY).startOf('M').toDate(),
      moment(TODAY).endOf('M').toDate(),
      {category: 'income'},
    );
    if (incomeThisMonth.length > 0) {
      setSalary(incomeThisMonth[0].amount);
    }

    const result = await Promise.all(
      Object.keys(DAY).map((day: any) => {
        return getTransactions(db, getStartDay(DAY[day]), getEndDay(DAY[day]));
      }),
    );
    setTransaction({
      mon: result[0],
      tue: result[1],
      wed: result[2],
      thu: result[3],
      fri: result[4],
      sat: result[5],
      sun: result[6],
    });
  };

  useEffect(() => {
    loadListTrans();
  }, []);

  // Rate Increase Money
  const calcGreenRate = (trans: any[]) => {
    if (trans.length > 0) {
      return (
        (calcTotalTrans(trans, 1) + salary / (calcTotalTrans(trans, 1) + salary + calcTotalTrans(trans, -1))) * 100
      );
    }
    return 100;
  };
  const calcRedRate = (trans: any[]) => {
    if (trans.length > 0) {
      return (calcTotalTrans(trans, -1) / (calcTotalTrans(trans, 1) + salary + calcTotalTrans(trans, -1))) * 100;
    }
    return 0;
  };

  const chartStatics: any = {
    Sunday: {
      redRate: calcRedRate(transaction.sun),
      greenRate: calcGreenRate(transaction.sun),
      name: 'CN',
    },
    Money: {
      redRate: calcRedRate(transaction.mon),
      greenRate: calcGreenRate(transaction.mon),
      name: 'Thứ 2',
    },
    Tuesday: {
      redRate: calcRedRate(transaction.tue),
      greenRate: calcGreenRate(transaction.tue),
      name: 'Thứ 3',
    },
    Wednesday: {
      redRate: calcRedRate(transaction.wed),
      greenRate: calcGreenRate(transaction.wed),
      name: 'Thứ 4',
    },
    Thursday: {
      redRate: calcRedRate(transaction.thu),
      greenRate: calcGreenRate(transaction.thu),
      name: 'Thứ 5',
    },
    Friday: {
      redRate: calcRedRate(transaction.fri),
      greenRate: calcGreenRate(transaction.fri),
      name: 'Thứ 6',
    },
    Saturday: {
      redRate: calcRedRate(transaction.sat),
      greenRate: calcGreenRate(transaction.sat),
      name: 'Thứ 7',
    },
  };

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
