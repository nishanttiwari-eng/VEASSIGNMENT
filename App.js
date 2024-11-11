import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStack from './scr/navigations.js/StackNavigator';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <RootStack/>
    </NavigationContainer>
  );
};

export default App;
