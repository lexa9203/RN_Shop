import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';

export default function Load() {
  const animation = useRef(new Animated.Value(1)).current
  useEffect(() => {
    Animated.timing(
      animation,
      {
        toValue: 0,
        duration: 0,
        delay: 3000,
        useNativeDriver: true,
      }
    ).start();
  }, [animation])

  return (
    <Animated.View
      style={[{
        opacity: animation,
       }, styles.wrap]}
    >
      <ActivityIndicator size="large" color={'#fec341'} />
      <Text>Загрузка...</Text>
    </Animated.View>)
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '80%'
  }
});