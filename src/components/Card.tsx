import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import { IProduct } from '../interfaces/interfaces';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import MyButton from './MyButton';

export default function Card({ product, isCart, favorites = true }: { product: IProduct, isCart: boolean, favorites?: boolean }) {
  const [isFavorite, setIsFavorite] = useState(product.favorite)

  const addToCart = async (product: IProduct) => {
    try {
      axios.post('https://6309e266f8a20183f77838e3.mockapi.io/cart', { product })
    } catch (error) {
      Alert.alert('Ошибка', 'Повторите позже')
    }
  }

  const addToFavorite = async (product: IProduct) => {
    product.favorite = !product.favorite
    setIsFavorite(!isFavorite)
    try {
      await fetch('https://6309e266f8a20183f77838e3.mockapi.io/products/' + product.id, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      Alert.alert('Ошибка')
    }
  }

  return (
    <View style={styles.card}>
      {favorites && <MaterialCommunityIcons style={styles.badge} onPress={() => { addToFavorite(product) }} name={isFavorite ? "heart" : "heart-outline"} size={20} />}
      <Image style={isCart ? styles.img : styles.imgBig} source={{ uri: product.imgUrl }} />
      <>
        <Text style={styles.cardTitle}>{product.title}</Text>
        <Text style={styles.cardPrice}>{product.price} руб.</Text>
      </>
      <View style={styles.btn}>
        {isCart && <MyButton onPress={() => { addToCart(product) }} title={'Купить'}></MyButton>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    marginHorizontal: '2%',
    marginVertical: 5,
    padding: 10,
    paddingTop: 25,
    height: 260,
    borderStyle: 'solid',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 18
  },
  cardPrice: {
    fontWeight: '700',
  },
  img: {
    width: '80%',
    height: '45%',
  },
  imgBig: {
    width: '55%',
    height: '65%',
  },
  badge: {
    position: 'absolute',
    top: 7,
    right: 7,
  },
  btn: {
    width: '100%'
  },

});
