import React from 'react';
import {SafeAreaView} from 'react-native';
import {CustomStatusBar} from '../../../components/CustomStatusBar';
import {colors} from '../../../utils/colors';
import {Header} from '../../../components/Header';
import style from './style';
import { CustomText } from '../../../components/CustomText';

const Planner = () => {
  return (
    <SafeAreaView
      style={style.safeAreaView}>
      <CustomStatusBar color={colors.activeIconColor} />
      <Header isHideSearchBell={false} headerText="Planner" />
      <CustomText scrName = 'Planner'/>
    </SafeAreaView>
  );
};

export default Planner;
