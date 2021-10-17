import React, {useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, View, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import ButtonGroupA from 'components/data-analysis/ButtonGroupA';
import ButtonGroupB from 'components/data-analysis/ButtonGroupB';
import StatisticGroup from 'components/data-analysis/StatisticGroup';
import {VictoryPie} from 'victory-native';

interface Props {}

interface IInfoDict {
  color: string;
  price: number;
  name: string;
}

const infoDict: {[key: string]: IInfoDict} = {
  market: {
    color: '#00C689',
    price: 40000,
    name: 'Đi chợ',
  },
  living: {
    color: '#FE645A',
    price: 60000,
    name: 'Sinh hoạt',
  },
  rent: {
    color: '#2A327D',
    price: 20000,
    name: 'Thuê nhà',
  },
  payoff: {
    color: '#FFB039',
    price: 30000,
    name: 'Trả góp',
  },
};

const DataAnalysisActivity = (props: Props) => {
  const {width, height} = Dimensions.get('screen');

  //State

  // Logic Data
  const colorItem = Object.keys(infoDict).map(item => infoDict[item].color);
  const totalPrice = Object.keys(infoDict).reduce((total, eachItem) => {
    return total + infoDict[eachItem].price;
  }, 0);
  const countPercentage = (price: number) => Math.round((price / totalPrice) * 100);

  const pieChartData = Object.keys(infoDict).map(item => ({
    xName: item,
    x: countPercentage(infoDict[item].price) + '%',
    y: infoDict[item].price,
  }));

  return (
    <SafeAreaView>
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        <Layout style={styles.btnGroup}>
          <ButtonGroupA title="Thu" active={true} />
          <ButtonGroupA title="Chi" active={false} />
        </Layout>
        <Layout style={styles.btnGroup}>
          <ButtonGroupB title="Năm" active={true} />
          <ButtonGroupB title="Tháng" active={false} />
          <ButtonGroupB title="Tuần" active={false} />
        </Layout>
        {/* Pie chart here */}
        <Layout style={{marginVertical: 40}}>
          <Layout style={styles.container}>
            <VictoryPie
              data={pieChartData}
              colorScale={colorItem}
              width={width * 0.8}
              height={height * 0.5}
              labels={({datum}) => datum.x}
              radius={({datum}) => width * 0.4}
              innerRadius={80}
              labelRadius={110}
              style={{labels: {fontSize: 18, fill: 'white'}}}
              //   events={[{
              //     target: "data",
              //     eventHandlers: {
              //         onPress: () => {
              //           return[
              //             {
              //               target: "data",
              //               mutation: ({ style }) => {
              //                 return style.fill === "#c43a31" ? null : { style: { fill: "#c43a31" } };
              //               }
              //             }
              //           ]
              //         }
              //     }
              // }]}
            />
            <Layout
              style={{
                position: 'absolute',
                top: '44%',
                left: '41%',
                display: 'flex',
                alignItems: 'center',
              }}>
              <Text style={styles.textCirlce1}>Tháng 8</Text>
              <Text style={styles.textCircle2}>21 ngày</Text>
            </Layout>
          </Layout>
        </Layout>
        <Layout style={styles.infoContainer}>
          {Object.keys(infoDict).map(item => (
            <Layout style={{marginBottom: 8}} key={item}>
              <StatisticGroup color={infoDict[item].color} text={infoDict[item].name} price={infoDict[item].price} />
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
