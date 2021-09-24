import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, Image, SafeAreaView, ScrollView} from 'react-native';
import CardInfo from 'components/home/CardInfo';
import InfoGroup from 'components/home/InfoGroup';
import LineChartGroup from 'components/home/LineChartGroup';

interface Props {}

const infoDict: any = {
  MS: {
    name: 'Đi chợ/Siêu thị',
    price: 300000,
    date: new Date().toDateString(),
    isIncrease: false,
  },
  AB: {
    name: 'Vay mượn',
    price: 300000,
    date: new Date().toDateString(),
    isIncrease: true,
  },
  BM: {
    name: 'Tiền lì xì',
    price: 300000,
    date: new Date().toDateString(),
    isIncrease: true,
  },
};

const cardDict: any = {
  'Hôm nay': {
    downPrice: 3000,
    upPrice: 5000,
    savePrice: 2000,
  },
  'Hôm qua': {
    downPrice: 3000,
    upPrice: 5000,
    savePrice: 2000,
  },
};

const HomeActivity = (props: Props) => {
  return (
    <SafeAreaView>
      <ScrollView
        style={{marginBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <Layout style={styles.headerContainer}>
          <Image
            source={require('assets/images/header.png')}
            resizeMode="cover"
            style={styles.imageBG}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardInfoContainer}>
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
          <Layout>
            <Text style={styles.titleStyle}>Các khoản thu chi hôm nay</Text>
          </Layout>
          <Layout style={styles.infoGroupContainer}>
            {Object.keys(infoDict).map(item => {
              return (
                <React.Fragment key={item}>
                  <InfoGroup
                    shortcutName={item}
                    name={infoDict[item].name}
                    price={infoDict[item].price}
                    date={infoDict[item].date}
                    isIncrease={infoDict[item].isIncrease}
                  />
                </React.Fragment>
              );
            })}
          </Layout>
        </Layout>
        <Layout style={styles.groupContainer}>
          <Layout>
            <Text style={styles.titleStyle}>Báo cáo tuần</Text>
          </Layout>
          <Layout style={styles.infoGroupContainer}>
            <LineChartGroup />
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
    marginLeft: 24,
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
