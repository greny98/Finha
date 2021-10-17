import React from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import BtnNavigation from './common/BtnNavigation';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/src/types';

const btnIcons = [
  {
    iconActive: require('assets/icon/overview-active.png'),
    icon: require('assets/icon/overview.png'),
  },
  {
    iconActive: require('assets/icon/analysis-active.png'),
    icon: require('assets/icon/analysis.png'),
  },
  {
    iconActive: require('assets/icon/transaction-active.png'),
    icon: require('assets/icon/transaction.png'),
  },
  {
    iconActive: require('assets/icon/profile-active.png'),
    icon: require('assets/icon/profile.png'),
  },
];

const BtnNavigationGroup = (props: BottomTabBarProps) => {
  const {state, descriptors, navigation} = props;

  return (
    <Layout style={styles.flexBox}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label = options.tabBarLabel;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true} as any);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View key={label as string}>
            <BtnNavigation
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              text={label as string}
              iconActive={btnIcons[index].iconActive}
              icon={btnIcons[index].icon}
              active={isFocused}
            />
          </View>
        );
      })}
    </Layout>
  );
};

const styles = StyleSheet.create({
  flexBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 8,
  },
});

export default BtnNavigationGroup;
