import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import {Icon} from '../utils/icons';
import PropTypes from 'prop-types';

export const Header = props => {
  const {isHideSearchBell, headerText, searchBtn} = props;

  Header.propTypes = {
    isHideSearchBell: PropTypes.bool,
    headerText: PropTypes.string,
    searchBtn: PropTypes.func,
  };

  return (
    <View
      style={{
        width: '100%',
        height: 60,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingTop: 5,
        paddingHorizontal: '5%',
        backgroundColor: colors.activeIconColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.8,
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => Alert.alert('comming soon')}>
          <Image
            style={{
              height: 24,
              width: 24,
            }}
            source={Icon.menu}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            marginLeft: 15,
            color: colors.white,
            textAlign: 'left',
            alignSelf: 'flex-start',
          }}>
          {headerText}
        </Text>
      </View>
      {isHideSearchBell && (
        <View
          style={{
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity onPress={searchBtn}>
            <Image
              style={{
                height: 24,
                width: 24,
                marginRight: 20,
              }}
              source={Icon.search}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => Alert.alert('comming soon')}>
            <Image
              style={{
                height: 24,
                width: 24,
              }}
              source={Icon.bell}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
