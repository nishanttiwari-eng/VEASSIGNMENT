import React from 'react';
import {SafeAreaView} from 'react-native';
import {CustomStatusBar} from '../../../components/CustomStatusBar';
import {colors} from '../../../utils/colors';
import {Header} from '../../../components/Header';
import style from './style';
import { CustomText } from '../../../components/CustomText';

const More = () => {
  return (
    <SafeAreaView
      style={style.safeAreaView}>
      <CustomStatusBar color={colors.activeIconColor} />
      <Header isHideSearchBell={false} headerText="More" />
      <CustomText scrName = 'More'/>
    </SafeAreaView>
  );
};

export default More;
