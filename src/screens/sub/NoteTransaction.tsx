/*
  TODO: Khi tạo chi, kiểm tra số tiền hiện có và số tiền cần tiết kiệm để cảnh báo
 */
import {Icon, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';
import {convertCurrencyVN, getCategoryName} from 'utils/utils';
import {getDBConnection, getTransactions} from 'db/db-service';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

interface Props {}

const NoteItem = (props: any) => {
  const {data} = props;
  console.log(new Date());
  const convertDate = (date: string) => {
    return date.slice(0, 10);
  };
  return (
    <Layout>
      <Layout style={styles.flexContainer}>
        <Text style={styles.titleStyle}>Category</Text>
        <Text style={styles.contentStyle}>: {getCategoryName(data.category)}</Text>
      </Layout>
      <Layout style={styles.flexContainer}>
        <Text style={styles.titleStyle}>Wallet</Text>
        <Text style={styles.contentStyle}>: {data.wallet}</Text>
      </Layout>
      <Layout style={styles.flexContainer}>
        <Text style={styles.titleStyle}>Amount</Text>
        <Text style={[styles.contentStyle, {color: data.factor === 1 ? '#00C689' : '#FE645A'}]}>
          : {convertCurrencyVN(parseInt(data.amount))}
        </Text>
      </Layout>
      <Layout style={styles.flexContainer}>
        <Text style={styles.titleStyle}>Date</Text>
        <Text style={styles.contentStyle}>: {convertDate(data.date)}</Text>
      </Layout>
      <Layout style={styles.flexContainer}>
        <Text style={styles.titleStyle}>Note</Text>
        <Text style={[styles.contentStyle, {color: '#aeaeae'}]}>: {data.note}</Text>
      </Layout>
    </Layout>
  );
};

const NoteTransaction = (props: Props) => {
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  // STATE
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(moment().add(1, 'd').toDate());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);

  const [listTrans, setListTrans] = useState<any>([]);

  const onChangeFromDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || fromDate;
    setShowFromDate(Platform.OS === 'ios');

    setFromDate(currentDate);
  };

  const onChangeToDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || toDate;
    setShowToDate(Platform.OS === 'ios');

    setToDate(currentDate);
  };

  const navigateHome = () => {
    navigation.navigate('Tab', {screen: 'Home'});
  };

  const searchByDate = () => {
    loadListTrans();
  };

  const loadListTrans = async () => {
    const db = await getDBConnection();
    const transList = await getTransactions(db, {
      startDate: moment(fromDate).startOf('d').toDate(),
      endDate: moment(toDate).endOf('d').toDate(),
    });
    setListTrans(transList);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadListTrans();
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {showFromDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={fromDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeFromDate}
          />
        )}
        {showToDate && (
          <DateTimePicker
            testID="dateTimePicker"
            value={toDate}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeToDate}
          />
        )}
        <Layout style={{padding: 16, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={navigateHome}>
            <Layout style={styles.btnBackStyle}>
              <Text style={{fontSize: 18}}>Quay lại</Text>
            </Layout>
          </TouchableOpacity>
          <Layout>
            <Text category="h4">Danh sách giao dịch</Text>
          </Layout>
        </Layout>
        <Layout style={styles.root}>
          <Layout style={[styles.itemContainer, {padding: 10, alignItems: 'center'}]}>
            <Layout>
              <TouchableOpacity onPress={() => setShowFromDate(true)}>
                <Layout style={[styles.flexContainer, styles.dateContainer]}>
                  <Text style={{width: 70}}>Từ ngày</Text>
                  <Text>: {moment(fromDate).format('DD/MM/YYYY')}</Text>
                </Layout>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowToDate(true)}>
                <Layout style={[styles.flexContainer, styles.dateContainer]}>
                  <Text style={{width: 70}}>Đến ngày</Text>
                  <Text>: {moment(toDate).format('DD/MM/YYYY')}</Text>
                </Layout>
              </TouchableOpacity>
            </Layout>
            <TouchableOpacity onPress={searchByDate}>
              <Layout style={styles.searchContainer}>
                <Text style={{color: '#fff'}}>Tìm kiếm theo ngày</Text>
              </Layout>
            </TouchableOpacity>
          </Layout>
          {/* TODO: Display List transaction here */}
          {listTrans.map((trans: any, index: any) => (
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={() => navigation.navigate('Sub', {screen: 'UpdateFolder', params: {transInfo: trans}})}
              key={`${trans.id}+${index}`}>
              <Layout style={styles.itemContainer}>
                <NoteItem data={trans} />
              </Layout>
            </TouchableOpacity>
          ))}
          {listTrans.length === 0 && <Text style={styles.contentStyle}>Không có giao dịch nào được tìm thấy</Text>}
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    // marginTop: 20,
  },
  backWrapper: {
    width: '100%',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 16,
  },
  btnTwoStyle: {
    // backgroundColor: '#00C6C6',
    borderRadius: 30,
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dateContainer: {
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#eeeeee',
  },
  searchContainer: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 10,
    backgroundColor: '#00C6C6',
    marginVertical: 12,
  },
  itemContainer: {
    width: '90%',
    borderRadius: 10,
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 100,
  },
  contentStyle: {
    fontSize: 22,
    fontWeight: 'normal',
    fontStyle: 'italic',
  },
  btnBackStyle: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 6,
    marginRight: 5,
  },
});

export default NoteTransaction;
