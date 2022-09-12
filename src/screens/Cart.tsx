import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, RefreshControl } from 'react-native';
import Card from '../components/Card';
import { IProduct } from '../interfaces/interfaces';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Empty from '../components/Empty';
import Load from '../components/Load';
import MyButton from '../components/MyButton';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState([] as IProduct[])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    try {
      axios.get('https://6309e266f8a20183f77838e3.mockapi.io/cart')
        .then(res => setCartProducts(res.data))
    } catch (error) {
      Alert.alert('Ошибка')
    }
  }

  const makeOrder = async (cartProducts: IProduct[]) => {
    try {
      axios.post('https://6309e266f8a20183f77838e3.mockapi.io/orders', {
        cartProducts
      });
      for (let i = 0; i < cartProducts.length; i++) {
        const el = cartProducts[i];
        await axios.delete('https://6309e266f8a20183f77838e3.mockapi.io/cart/' + el.id);
      }
      Alert.alert('Ваш заказ оформлен')
    } catch (error) {
      Alert.alert('Ошибка')
    }
    setCartProducts([])
  }
    
  const deleteItem = (id: string | undefined) => {
    axios.delete('https://6309e266f8a20183f77838e3.mockapi.io/cart/' + id);
    setCartProducts(cartProducts.filter((el: IProduct) => el.id !== id))
  }

  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={getProducts} />}>
        {cartProducts.length 
          ? <>
              <View style={styles.cards}>
                {cartProducts.map((el: any) => {
                  return (
                    <View key={el.id}>
                      <MaterialCommunityIcons style={styles.deleteIcon} onPress={() => { deleteItem(el.id) }} name={'close'} size={20} />
                      <Card favorites={false} isCart={false} product={el.product}></Card>
                    </View>)
                })}
              </View>
              <View style={styles.wrapBtn}>
                <MyButton title={'Оформить заказ'} onPress={() => { makeOrder(cartProducts) }}></MyButton>
              </View>
            </>
            : <><Load/><Empty title='Здесь пока пусто :(' /></>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 3,
    paddingBottom: 5
  },
  cards: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  deleteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2
  },
  wrapBtn: {
    paddingHorizontal: '2%'
  }
});
