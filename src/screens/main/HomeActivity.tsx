import React, {useCallback, useEffect, useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import CardInfo from 'components/home/CardInfo';
import InfoGroup from 'components/home/InfoGroup';
import LineChartGroup from 'components/home/LineChartGroup';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';
import {getDBConnection, getTransactions} from 'db/db-service';
import moment from 'moment';
import {calcTotalTrans} from 'utils/utils';

interface Props {}

const wait = (timeout: any) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeActivity = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateNoteTransaction = () => {
    navigation.navigate('Sub', {screen: 'NoteTransaction'});
  };
  const TODAY = new Date();
  const YESTERDAY = moment(TODAY).subtract(1, 'd').toDate();

  // STATE
  const [transToday, setTransToday] = useState<any>([]);
  const [transYesterday, setTransYesterday] = useState<any>([]);

  const [salary, setSalary] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  // FUNCTION
  const loadListTrans = async () => {
    const db = await getDBConnection();
    // get income amount
    const incomeThisMonth = await getTransactions(db, {
      startDate: moment(TODAY).startOf('M').toDate(),
      endDate: moment(TODAY).endOf('M').toDate(),
      category: 'income',
    });
    if (incomeThisMonth.length > 0) {
      setSalary(incomeThisMonth[0].amount);
    }
    const listToday = await getTransactions(db, {
      startDate: moment(TODAY).startOf('d').toDate(),
      endDate: moment(TODAY).endOf('d').toDate(),
    });
    const listYesterDay = await getTransactions(db, {
      startDate: moment(YESTERDAY).startOf('d').toDate(),
      endDate: moment(YESTERDAY).endOf('d').toDate(),
    });

    const combinedList = Object.values(
      listToday.reduce((obj: any, item: any) => {
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

    setTransToday(combinedList);
    setTransYesterday(listYesterDay);
  };

  const totalUpToday = calcTotalTrans(transToday, 1) + Math.round(salary / 30);
  const totalDownToday = calcTotalTrans(transToday, -1);
  const totalUpYesterday = calcTotalTrans(transYesterday, 1) + Math.round(salary / 30);
  const totalDownYesterday = calcTotalTrans(transYesterday, -1);

  const cardDict: any = {
    'Hôm nay': {
      downPrice: totalDownToday,
      upPrice: totalUpToday,
      savePrice: totalUpToday - totalDownToday,
    },
    'Hôm qua': {
      downPrice: totalDownYesterday,
      upPrice: totalUpYesterday,
      savePrice: totalUpYesterday - totalDownYesterday,
    },
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      loadListTrans();
    });
  }, []);

  useEffect(() => {
    loadListTrans();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Layout style={styles.headerContainer}>
          <Image source={require('assets/images/header.png')} resizeMode="cover" style={styles.imageBG} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardInfoContainer}>
            {Object.keys(cardDict).map(item => {
              return (
                <React.Fragment key={item}>
                  <CardInfo
                    day={item}
                    downPrice={cardDict[item].downPrice}
                    upPrice={cardDict[item].upPrice}
                    savePrice={cardDict[item].savePrice}
                  />
                </React.Fragment>
              );
            })}
          </ScrollView>
        </Layout>
        <Layout style={styles.groupContainer}>
          <Layout style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={styles.titleStyle}>Các khoản thu chi hôm nay</Text>
            <TouchableOpacity onPress={navigateNoteTransaction}>
              <Text style={{color: '#00C689', fontSize: 18}}>Xem thêm</Text>
            </TouchableOpacity>
          </Layout>
          <Layout style={styles.infoGroupContainer}>
            {transToday.map((trans: any, index: number) => (
              <React.Fragment key={`${trans.id}+${index}`}>
                <InfoGroup data={trans} />
              </React.Fragment>
            ))}
          </Layout>
        </Layout>
        <Layout style={styles.groupContainer}>
          <Layout>
            <Text style={styles.titleStyle}>Báo cáo tuần</Text>
          </Layout>
          <Layout style={styles.infoGroupContainer}>
            <LineChartGroup refreshing={refreshing}/>
          </Layout>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageBG: {
    width: '100%',
  },
  headerContainer: {
    position: 'relative',
  },
  cardInfoContainer: {
    position: 'absolute',
    bottom: 30,
    left: 12,
    width: '100%',
    height: 180,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  groupContainer: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: '500',
  },
  infoGroupContainer: {
    paddingTop: 16,
  },
});

export default HomeActivity;
