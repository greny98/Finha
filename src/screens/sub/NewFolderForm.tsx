import {Button, Icon, Layout, Tab, TabBar, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import CustomButton from 'components/common/CustomButton';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import TextInputGroup from 'components/common/TextInputGroup';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';
import {
  createTransactions,
  getAllCategories,
  getDBConnection,
  getProfile,
  getSaveMoney,
  getWallets,
} from 'db/db-service';
import {Picker} from '@react-native-picker/picker';
import {getCategoryName} from 'utils/utils';
import CurrencyInput from 'react-native-currency-input';

const NewFolderForm = () => {
  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateSuccess = () => {
    navigation.navigate<any>('Sub', {screen: 'CreateSuccess'});
  };

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [walletId, setWalletId] = useState(0);
  const [walletType, setWalletType] = useState<any>([]);

  const [categoryId, setCategoryId] = useState(0);
  const [categoryType, setCategoryType] = useState<any>([]);

  const [moneyAmount, setMoneyAmount] = useState(0);
  const [notes, setNotes] = useState('');

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" fill="#FFF" />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.navigate<any>('Tab', {screen: 'Home'})} />
  );

  const SetTitle = (props: any, title: string) => (
    <Text {...props} style={{color: 'white', fontSize: 20}}>
      {title}
    </Text>
  );

  // Get DATA
  const loadWalletAndCategory = async () => {
    const db = await getDBConnection();
    const walletList = await getWallets(db);
    const categoryList = await getAllCategories(db);
    setWalletType(walletList);
    setCategoryType(categoryList);
  };

  const createTrans = async () => {
    const db = await getDBConnection();
    const saveMoneyList: any = await getSaveMoney(db);

    const profileResult = await getProfile(db);
    const dataCreateTrans = {
      categoryId: categoryId,
      factor: selectedIndex === 0 ? -1 : 1,
      note: notes,
      amount: moneyAmount,
      date: new Date(),
      walletId: walletId,
    };
    const restAmount = profileResult[0].amount - (saveMoneyList.length > 0 ? saveMoneyList[0].amount : 0);

    if (selectedIndex === 0 && moneyAmount > restAmount) {
      return navigation.navigate<any>('Target', {
        screen: 'WarningSaveMoney',
        params: {
          dataCreateTrans,
        },
      });
    }

    await createTransactions(db, dataCreateTrans);
    navigateSuccess();
  };

  useEffect(() => {
    loadWalletAndCategory();
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <ScrollView style={{marginBottom: 16, backgroundColor: 'red'}}>
          <Layout>
            <TopNavigation
              accessoryLeft={BackAction}
              title={(props: any) => SetTitle(props, 'Thêm giao dịch')}
              style={{backgroundColor: '#00C6C6'}}
            />
            <TabBar
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
              indicatorStyle={{
                backgroundColor: '#fff',
                zIndex: 10,
              }}
              style={{backgroundColor: '#00C6C6'}}>
              <Tab title={(props: any) => SetTitle(props, 'Chi')} />
              <Tab title={(props: any) => SetTitle(props, 'Thu')} />
            </TabBar>
            <Layout
              style={{
                width: '100%',
                height: 20,
                backgroundColor: '#00C6C6',
                top: -4,
                zIndex: 2,
                marginBottom: 24,
              }}
            />
          </Layout>
          <Layout style={styles.root}>
            <Layout style={{width: '90%'}}>
              <Text category="s2" style={styles.titleStyle}>
                Tên danh mục
              </Text>
              <Layout style={styles.pickerContainer}>
                <Picker
                  selectedValue={categoryId}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) => {
                    setCategoryId(itemValue);
                  }}>
                  {Boolean(categoryType.length) &&
                    categoryType.map((each: any, index: number) => {
                      return (
                        <Picker.Item label={getCategoryName(each.name)} value={each.id} key={`${each.id}-${index}`} />
                      );
                    })}
                </Picker>
              </Layout>
            </Layout>
            <Layout style={{width: '90%'}}>
              <Text category="s2" style={styles.titleStyle}>
                Loại ví
              </Text>
              <Layout style={styles.pickerContainer}>
                <Picker
                  selectedValue={walletId}
                  style={styles.pickerStyle}
                  onValueChange={(itemValue, itemIndex) => {
                    setWalletId(itemValue);
                  }}>
                  {Boolean(walletType.length) &&
                    walletType.map((each: any, index: number) => {
                      return <Picker.Item label={each.name} value={each.id} key={`${each.id}-${index}`} />;
                    })}
                </Picker>
              </Layout>
            </Layout>
            <Layout style={{width: '90%'}}>
              <Text category="s2" style={styles.titleStyle}>
                Số tiền
              </Text>
              <CurrencyInput
                style={styles.inputNumber}
                value={moneyAmount}
                onChangeValue={text => setMoneyAmount(Number(text))}
                separator=","
                suffix={' VND'}
                precision={0}
                minValue={0}
              />
            </Layout>
            <Layout style={{width: '90%'}}>
              <Text category="s2" style={styles.titleStyle}>
                Ghi chú
              </Text>
              <TextInput style={styles.inputNumber} value={notes} onChangeText={text => setNotes(text)} />
            </Layout>
            <CustomButton title="Lưu" onPress={createTrans} />
          </Layout>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {},
  root: {
    alignItems: 'center',
    width: '100%',
  },
  textInputLayout: {
    width: '90%',
    marginBottom: 24,
  },
  textInput: {
    borderRadius: 50,
  },
  pickerStyle: {
    width: '100%',
  },
  inputNumber: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 50,
    borderColor: '#dedede',
    paddingLeft: 20,
    marginBottom: 24,
    height:50
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#E1E4EA',
    borderRadius: 50,
    marginBottom: 24,
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default NewFolderForm;
