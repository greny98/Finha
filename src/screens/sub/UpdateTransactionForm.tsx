import {Layout, Text} from '@ui-kitten/components';
import CustomButton from 'components/common/CustomButton';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/core';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import TextInputGroup from 'components/common/TextInputGroup';
import {NavigationProp, useNavigation, ParamListBase} from '@react-navigation/native';
import {getAllCategories, getDBConnection, getProfile, getWallets, updateTransaction} from 'db/db-service';
import {Picker} from '@react-native-picker/picker';
import {getCategoryName} from 'utils/utils';
import CurrencyInput from 'react-native-currency-input';

const UpdateTransactionForm = () => {
  // Route
  const route = useRoute<any>();
  const {transInfo} = route.params;

  //Navigation
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const navigateSuccess = () => {
    navigation.navigate<any>('Sub', {screen: 'CreateSuccess'});
  };

  const [walletId, setWalletId] = useState(transInfo.walletId);
  const [walletType, setWalletType] = useState<any>([]);

  const [categoryId, setCategoryId] = useState(transInfo.categoryId);
  const [categoryType, setCategoryType] = useState<any>([]);

  const [moneyAmount, setMoneyAmount] = useState<any>(transInfo.amount + '');
  const [notes, setNotes] = useState(transInfo.note);

  // Get DATA
  const loadWalletAndCategory = async () => {
    const db = await getDBConnection();
    const walletList = await getWallets(db);
    const categoryList = await getAllCategories(db);
    setWalletType(walletList);
    setCategoryType(categoryList);
  };

  const updateTrans = async () => {
    const db = await getDBConnection();
    const updateTrans = {
      id: transInfo.id,
      categoryId: transInfo.categoryId,
      factor: transInfo.factor,
      note: notes,
      amount: moneyAmount,
      walletId: transInfo.walletId,
    };
    await updateTransaction(db, updateTrans);
    navigateSuccess();
  };

  useEffect(() => {
    loadWalletAndCategory();
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <ScrollView style={{marginBottom: 16}}>
          <Layout style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Layout style={styles.btnBackStyle}>
                <Text style={{fontSize: 18}}>Quay lại</Text>
              </Layout>
            </TouchableOpacity>
            <Layout style={{paddingLeft: 20}}>
              <Text category="h4">Giao dịch {transInfo.factor === 1 ? 'Thu' : 'Chi'}</Text>
            </Layout>
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
            <CustomButton title="Cập nhật" onPress={updateTrans} />
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
  inputNumber: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 50,
    borderColor: '#dedede',
    paddingLeft: 20,
    marginBottom: 24,
    height: 50,
  },
  pickerStyle: {
    width: '100%',
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
  btnBackStyle: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 6,
    marginRight: 16,
  },
});

export default UpdateTransactionForm;
