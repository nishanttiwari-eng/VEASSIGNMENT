import {StyleSheet} from 'react-native';
import { colors } from '../../utils/colors';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  text: {
    color: colors.activeIconColor,
    fontSize: 26,
    fontWeight: '900',
    alignSelf: 'center',
  },
});
