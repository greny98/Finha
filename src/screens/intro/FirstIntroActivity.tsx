import {
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import CustomModal from '../../components/common/CustomModal';

interface Props {}

const FirstIntroActivity = (props: Props) => {
  const BackIcon = (props: any) => <Icon {...props} name="arrow-back" />;

  const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

  const renderRightActions = () => (
    <TouchableOpacity>
      <Text style={styles.textNavStyle}>Skip</Text>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <Image
        source={require('../../../static/images/intro-1.png')}
        style={styles.imageStyle}
      />
      <Layout style={styles.navContainer}>
        <TopNavigation
          accessoryRight={renderRightActions}
          style={{backgroundColor: '#AADAF1'}}
        />
      </Layout>
      <Layout style={styles.modalContainer}>
        <CustomModal
          title="CHÀO MỪNG BẠN ĐẾN VỚI FIHA"
          content="Ứng dụng giúp bạn quản lý tài chính phù hợp với mục tiêu tiết kiệm của bạn"
          stepActive={1}
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

export default FirstIntroActivity;
