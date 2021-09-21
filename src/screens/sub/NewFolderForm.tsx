import {
  Button,
  Icon,
  Layout,
  Tab,
  TabBar,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import TextInputGroup from '../../components/common/TextInputGroup';

const NewFolderForm = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [folderName, setFolderName] = useState('');
  const [walletType, setWalletType] = useState('');
  const [moneyAmount, setMoneyAmount] = useState(0);
  const [notes, setNotes] = useState('');

  const {width, height} = Dimensions.get('screen');

  const renderScene = ({route, jumpTo}: any) => {
    switch (route.key) {
    }
  };

  const BackIcon = (props: any) => (
    <Icon {...props} name="arrow-back" fill="#FFF" />
  );

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => console.log('pushs')} />
  );

  const SetTitle = (props: any, title: string) => (
    <Text {...props} style={{color: 'white', fontSize: 20}}>
      {title}
    </Text>
  );

  return (
    <Layout>
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
        <TextInputGroup
          style={styles.textInput}
          layoutProps={{style: styles.textInputLayout}}
          onChangeText={text => setFolderName(text)}
          label="Tên danh mục"
        />
        <TextInputGroup
          style={styles.textInput}
          layoutProps={{style: styles.textInputLayout}}
          onChangeText={text => setWalletType(text)}
          label="Loại ví"
        />
        <TextInputGroup
          style={styles.textInput}
          layoutProps={{style: styles.textInputLayout}}
          onChangeText={text => setMoneyAmount(Number(text))}
          label="Số tiền"
          keyboardType="numeric"
        />
        <TextInputGroup
          style={styles.textInput}
          layoutProps={{style: styles.textInputLayout}}
          onChangeText={text => setNotes(text)}
          label="Ghi chú"
        />
        <Button style={styles.button} appearance="filled" size="medium">
          <Text style={styles.buttonText}>Lưu</Text>
        </Button>
      </Layout>
    </Layout>
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
  button: {
    width: 150,
    backgroundColor: '#00C6C6',
    borderColor: '#00C6C6',
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default NewFolderForm;
