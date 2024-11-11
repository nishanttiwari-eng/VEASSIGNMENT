import React, {useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import style from './style';

const Splash = ({navigation}) => {
  useEffect(() => {
    SplashScreen.hide();
    setTimeout(() => {
      navigation.replace('Dashboard');
    }, 2000);
  });

  return (
    <SafeAreaView style={style.safeAreaView}>
      <Text style={style.text}>VE Assignment</Text>
    </SafeAreaView>
  );
};

export default Splash;
