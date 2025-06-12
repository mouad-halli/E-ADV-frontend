import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
interface Proptype {
    visible: boolean
    onPress: ((event: GestureResponderEvent) => void) | undefined
}
const Backdrop = ({ visible, onPress }: Proptype) => {
  if (!visible) return null;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.backdrop} />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Backdrop;
