import {Icon, Layout, Text, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import CustomModal from 'components/common/CustomModal';
import {useNavigation, NavigationProp, ParamListBase} from '@react-navigation/native';
import { createAccessStatus, getDBConnection } from 'db/db-service';

interface Props {}

const SecondIntroActivity = (props: Props) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />;

  const navigateHomePage = async () => {
    const db = await getDBConnection();
    await createAccessStatus(db);
    navigation.navigate('Tab', {screen: 'Home'});
  };

  const renderRightActions = () => (
    <TouchableOpacity onPress={navigateHomePage}>
      <Text style={styles.textNavStyle}>Skip</Text>
    </TouchableOpacity>
  );

  const nextIntro = () => {
    navigation.navigate('IntroThree');
  };

  return (
    <Layout>
      <Image source={require('assets/images/intro-2.png')} style={styles.imageStyle} />
      <Layout style={styles.navContainer}>
        <TopNavigation
          accessoryLeft={renderBackAction}
          accessoryRight={renderRightActions}
          style={{backgroundColor: '#AADAF1'}}
        />
      </Layout>
      <Layout style={styles.modalContainer}>
        <CustomModal
          title="QUẢN LÝ TÀI CHÍNH THÔNG MINH"
          content="Đưa ra kế hoạch chi tiêu tối ưu nhất thông qua việc cập nhật tình hình tài chính thường xuyên"
          stepActive={2}
          onPress={nextIntro}
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  navContainer: {
    position: 'absolute',
    backgroundColor: '#AADAF1',
    width: '100%',
  },
  textNavStyle: {
    fontSize: 18,
    color: '#888A8C',
    marginRight: 10,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: '#AADAF1',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default SecondIntroActivity;
