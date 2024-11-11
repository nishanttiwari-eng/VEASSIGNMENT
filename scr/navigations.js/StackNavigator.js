import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VehicleList from '../screens/Dashboard/Trace/VehicleList/index.js';
import VehicleDetail from '../screens/Dashboard/Trace/VehicleDetail.js/index.js';
import Splash from '../screens/Splash/index.js';
import BottomTabNavigator from './BottomTabNavigator.js';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name="SplashScreen" component={Splash} />
      <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export const TrackStackNavigator = () => {
  return (
    <Stack.Navigator
    initialRouteName="VehicleListScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen name="VehicleListScreen" component={VehicleList} />
      <Stack.Screen name="VehicleDetailScreen" component={VehicleDetail} />
    </Stack.Navigator>
  );
};

export default RootStack;
