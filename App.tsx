import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, RefreshControl } from 'react-native';
import Card from './src/components/Card';

export interface IProduct {
  id: number,
  title: string,
  price: number,
  imgUrl: string
}

export default function App() {
  const [products, setProducts] = useState([] as IProduct[])
  const [refreshing, setRefreshing] = useState(false)


  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    fetch('https://6309e266f8a20183f77838e3.mockapi.io/products')
      .then(res => res.json())
      .then((res: IProduct[]) => setProducts(res))
      .catch(() => {
        Alert.alert('Ошибка', 'Не удалось загрузить данные')
      })
  }

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getProducts}/>}>
          <Text style={styles.title}>MAIN PAGE</Text>
          <View style={styles.cards}>
            {products.map((product: IProduct) => {
              return <Card key={product.id} product={product}></Card>
            })}
          </View>
        </ScrollView>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    paddingHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid'
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
