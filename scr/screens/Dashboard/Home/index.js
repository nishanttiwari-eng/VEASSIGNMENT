import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {CustomStatusBar} from '../../../components/CustomStatusBar';
import {colors} from '../../../utils/colors';
import style from './style';
import {Header} from '../../../components/Header';
import { CustomText } from '../../../components/CustomText';

const Home = () => {
  return (
    <SafeAreaView style={style.safeAreaView}>
      <CustomStatusBar color={colors.activeIconColor} />
      <Header isHideSearchBell={false} headerText="Home" />
      <CustomText scrName = 'Home'/>
    </SafeAreaView>
  );
};

export default Home;
