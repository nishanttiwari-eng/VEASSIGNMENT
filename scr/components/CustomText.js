import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/colors';
import PropTypes from 'prop-types';

export const CustomText = props => {
  const {scrName} = props;

  CustomText.propTypes = {
    scrName: PropTypes.string,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.srcName}>{scrName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  srcName: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.activeIconColor,
  },
});
