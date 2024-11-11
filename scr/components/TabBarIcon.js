import {Image, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

export function TabBarIcon(props) {
  const {tabIcon, color} = props;

  TabBarIcon.propTypes = {
    color: PropTypes.string,
    tabIcon: PropTypes.number,
  };

  return (
    <View>
      <Image
        source={tabIcon}
        style={[styles.bottomTabIcon, {tintColor: color}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTabIcon: {
    height: 24,
    width: 24,
  },
});
