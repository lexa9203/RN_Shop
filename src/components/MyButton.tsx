import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyButton({ title, onPress }: {title: string, onPress: any}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#fec341',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  btnText: {
    fontSize: 16,
    color: '000',
    fontWeight: '700',
    alignSelf: 'center',
    textTransform: 'uppercase'
  }
});
