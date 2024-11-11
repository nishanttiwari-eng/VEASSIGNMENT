import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Dashboard/Home';
import Planner from '../screens/Dashboard/Planner';
import More from '../screens/Dashboard/More';
import {TrackStackNavigator} from './StackNavigator';
import {StyleSheet} from 'react-native';
import {Icon} from '../utils/icons';
import {colors} from '../utils/colors';
import {TabBarIcon} from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // Set icons and icon name for each tab
        tabBarIcon: ({color, size}) => {
          let iconName;
          let tabIcon;
          if (route.name === 'Home') {
            iconName = 'Home';
            tabIcon = require('../assets/images/home.png');
          } else if (route.name === 'Trace') {
            iconName = 'Trace';
            tabIcon = require('../assets/images/traceIcon.png');
          } else if (route.name === 'Planner') {
            iconName = 'Planner';
            tabIcon = require('../assets/images/calendar.png');
          } else if (route.name === 'More') {
            iconName = 'More';
            tabIcon = require('../assets/images/star.png');
          }

          return <TabBarIcon tabIcon={tabIcon} color={color} />;
        },
        tabBarStyle: styles.bottomTab,
        tabBarLabelStyle: styles.bottomBarLabel,
        tabBarInactiveTintColor: colors.inActiveIconColor,
        tabBarActiveTintColor: colors.activeIconColor,
        tabBarShowLabel: true,
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trace" component={TrackStackNavigator} />
      <Tab.Screen name="Planner" component={Planner} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  bottomTab: {
    height: 70,
    paddingTop: 5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  bottomBarLabel:{
    paddingTop: 5,
  }
});
