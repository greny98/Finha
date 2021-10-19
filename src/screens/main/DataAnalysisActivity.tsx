import React, {useCallback, useEffect, useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, View, SafeAreaView, ScrollView, Dimensions, RefreshControl} from 'react-native';
import ButtonGroupA from 'components/data-analysis/ButtonGroupA';
import ButtonGroupB from 'components/data-analysis/ButtonGroupB';
import StatisticGroup from 'components/data-analysis/StatisticGroup';
import {VictoryPie} from 'victory-native';
import {getDBConnection, getTransactions} from 'db/db-service';
import moment from 'moment';
import {getCategoryColor} from 'utils/utils';

interface Props {}

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const DataAnalysisActivity = (props: Props) => {
  const {width, height} = Dimensions.get('screen');

  //State
  const [transType, setTransType] = useState(0);
  const [filterTime, setFilterTime] = useState(2);
  const [transList, setTransList] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  // CREATE Var  Date
  const START_WEEK = moment().startOf('week').toDate();
  const END_WEEK = moment().endOf('week').toDate();

  const START_MONTH = moment().startOf('month').toDate();
  const END_MONTH = moment().endOf('month').toDate();

  const START_YEAR = moment().startOf('year').toDate();
  const END_YEAR = moment().endOf('year').toDate();

  const loadTransaction = async (filterType: number) => {
    const db = await getDBConnection();
    let resultList;
    if (filterType === 0) {
      resultList = await getTransactions(db, {
        startDate: START_WEEK,
        endDate: END_WEEK,
      });
    } else if (filterType === 1) {
      resultList = await getTransactions(db, {
        startDate: START_MONTH,
        endDate: END_MONTH,
      });
    } else {
      resultList = await getTransactions(db, {
        startDate: START_YEAR,
        endDate: END_YEAR,
      });
    }

    const combinedList = Object.values(
      resultList.reduce((obj: any, item: any) => {
        if (obj[`${item.categoryId}-(${item.factor})`]) {
          const objCopy = {...obj};
          objCopy[`${item.categoryId}-(${item.factor})`].amount += item.amount;
          return {...objCopy};
        } else {
          return {
            ...obj,
            [`${item.categoryId}-(${item.factor})`]: item,
          };
        }
      }, {}),
    );

    setTransList(combinedList);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      loadTransaction(filterTime);
    });
  }, []);

  useEffect(() => {
    loadTransaction(filterTime);
  }, [filterTime]);

  // Logic Data

  const countPercentage = (amount: number, totalAmount: number) => Math.round((amount / totalAmount) * 100);
  const getAmountAndColor = (trans: any, factor: number) => {
    return [
      trans.filter((trans: any) => trans.factor === factor).map((item: any) => getCategoryColor(item.categoryId)),
      trans
        .filter((trans: any) => trans.factor === factor)
        .reduce((total: any, eachItem: any) => total + eachItem.amount, 0),
    ];
  };

  const [colorItemIn, totalAmountIn] = getAmountAndColor(transList, 1);
  const [colorItemOut, totalAmountOut] = getAmountAndColor(transList, -1);

  const getPieChartData = (trans: any, factor: number, totalAmount: number) => {
    return trans
      .filter((trans: any) => trans.factor === factor)
      .map((item: any) => ({
        xName: item.category,
        x: countPercentage(item.amount, totalAmount) + '%',
        y: item.amount,
      }));
  };

  const pieChartIn = getPieChartData(transList, 1, totalAmountIn);
  const pieChartOut = getPieChartData(transList, -1, totalAmountOut);

  return (
    <SafeAreaView>
      <ScrollView
        style={{}}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Layout style={styles.btnGroup}>
          <ButtonGroupA title="Thu" active={transType === 0} onPress={() => setTransType(0)} />
          <ButtonGroupA title="Chi" active={transType === 1} onPress={() => setTransType(1)} />
        </Layout>
        <Layout style={styles.btnGroup}>
          <ButtonGroupB title="Tuần" active={filterTime === 2} onPress={() => setFilterTime(2)} />
          <ButtonGroupB title="Tháng" active={filterTime === 1} onPress={() => setFilterTime(1)} />
          <ButtonGroupB title="Năm" active={filterTime === 0} onPress={() => setFilterTime(0)} />
        </Layout>
        {/* Pie chart here */}
        <Layout style={{marginVertical: 40}}>
          <Layout style={styles.container}>
            <VictoryPie
              data={transType === 0 ? pieChartIn : pieChartOut}
              colorScale={transType === 0 ? colorItemIn : colorItemOut}
              width={width * 0.8}
              height={height * 0.5}
              labels={({datum}) => datum.x}
              radius={({datum}) => width * 0.4}
              innerRadius={80}
              labelRadius={110}
              style={{labels: {fontSize: 18, fill: 'white'}}}
            />
            <Layout
              style={{
                position: 'absolute',
                top: '44%',
                left: filterTime === 2 ? '35%' : '40%',
                display: 'flex',
                alignItems: 'center',
              }}>
              {/* Week */}
              {filterTime === 2 && (
                <>
                  <Text style={styles.textCirlce1}>Tháng {moment().format('M')}</Text>
                  <Text style={styles.textCircle2}>{`Ngày ${moment().startOf('W').format('DD')} - Ngày ${moment()
                    .endOf('W')
                    .format('DD')}`}</Text>
                </>
              )}
              {/* Month */}
              {filterTime === 1 && (
                <>
                  <Text style={styles.textCirlce1}>Tháng {moment().format('M')}</Text>
                </>
              )}
              {/* Year */}
              {filterTime === 0 && (
                <>
                  <Text style={styles.textCirlce1}>Năm {moment().format('Y')}</Text>
                </>
              )}
            </Layout>
          </Layout>
        </Layout>
        <Layout style={styles.infoContainer}>
          {transType === 0
            ? transList.length > 0 &&
              transList
                .filter((trans: any) => trans.factor === 1)
                .map((trans: any, index: number) => (
                  <Layout style={{marginBottom: 8}} key={`${trans.id}-${index}`}>
                    <StatisticGroup data={trans} />
                  </Layout>
                ))
            : transList
                .filter((trans: any) => trans.factor === -1)
                .map((trans: any, index: number) => (
                  <Layout style={{marginBottom: 8}} key={`${trans.id}-${index}`}>
                    <StatisticGroup data={trans} />
                  </Layout>
                ))}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnGroup: {
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  infoContainer: {
    padding: 24,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textCirlce1: {
    fontSize: 20,
  },
  textCircle2: {
    fontSize: 16,
    color: '#bebebe',
  },
});

export default DataAnalysisActivity;
