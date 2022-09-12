import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, RefreshControl } from 'react-native';
import Card from '../components/Card';
import Empty from '../components/Empty';
import Load from '../components/Load';
import { IProduct } from '../interfaces/interfaces';

export default function Favorite() {
  const [products, setProducts] = useState([] as IProduct[])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    try {
      axios.get('https://6309e266f8a20183f77838e3.mockapi.io/products')
        .then(res => setProducts(res.data))
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные favorite')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={getProducts} />}>
        <View style={styles.cards}>
          {products.filter((product: IProduct) => product.favorite).map((product: IProduct) => {
            return <View key={product.id} style={{ width: '50%' }}><Card isCart={true} product={product}></Card></View>
          })}
        </View>
        {!products.filter((product: IProduct) => product.favorite).length ? <><Load/><Empty title='Товаров в закладках нет :(' /></> : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});
