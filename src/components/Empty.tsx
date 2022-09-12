import React, { useEffect, useRef } from 'react';
import { Text, StyleSheet, Animated, Image } from 'react-native';

export default function Empty({ title }: {title: string}) {
  const animation = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(
      animation,
      {
        toValue: 1,
        duration: 500,
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
      <Image style={{height: 200, width: 200}} source={{uri: 'https://alpacaexpeditions.files.wordpress.com/2013/05/lego.jpg'}}/>
      <Text>{title}</Text>
    </Animated.View>)
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '-45%'
  }
});
