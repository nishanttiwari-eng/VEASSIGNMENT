import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export const CustomStatusBar = props => {
  const {color} = props;

  CustomStatusBar.propTypes = {
    color: PropTypes.string,
  };

  return (
    <View style={styles.statusBarContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  statusBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
