import React from 'react';
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native';
import { IProduct } from '../../App';

export default function Card(props: {product: IProduct}) {
  const {product} = props
  const addToCart = async (product: IProduct) => {  
    try {
        await fetch('https://6309e266f8a20183f77838e3.mockapi.io/cart', {
          method: 'POST',
          body: JSON.stringify(product),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        Alert.alert('Ошибка', 'Повторите позже')
      }
  }

  return (
    <View style={styles.card}>
      <Image style={styles.img} source={{uri:product.imgUrl}} />
      <Text>{product.title}</Text>
      <Text>{product.price} руб.</Text>
      <Button onPress={() => {addToCart(product)}} title={'Купить'}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        width: '48%',
        marginHorizontal: '1%',
        height: 200,
        borderStyle: 'solid',
        borderColor: 'red',
        borderWidth: 1,
        alignItems: 'center'
    },
    img: {
        width: 100,
        height: 100,
    }
  });
