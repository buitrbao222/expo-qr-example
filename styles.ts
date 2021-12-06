import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
  },
  absoluteFill: StyleSheet.absoluteFillObject,
  bgWhite: {
    backgroundColor: 'white',
  },
  bgRed: {
    backgroundColor: 'red',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  }
});

export default styles;
