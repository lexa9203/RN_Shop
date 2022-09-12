import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Alert, RefreshControl } from 'react-native';
import Card from '../components/Card';
import Empty from '../components/Empty';
import Load from '../components/Load';
import { IOrder } from '../interfaces/interfaces';

export default function Orders() {
  const [orders, setOrders] = useState([] as IOrder[])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getOrders()
  }, [])

  const getOrders = () => {
    try {
      setIsLoading(true)
      axios.get('https://6309e266f8a20183f77838e3.mockapi.io/orders')
        .then(res => setOrders(res.data))
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные orders')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={getOrders} />}>
        <View style={styles.cards}>
          {orders.map(item => item.cartProducts).flat().map(order => {
            return (
              <View key={order.id + order.product.id} style={{ width: '50%' }}>
                <Card favorites={false} isCart={true} product={order.product}></Card>
              </View>)
          })}
        </View>
        {!orders.length && !isLoading ? <><Load/><Empty title='Покупок нет:(' /></> : null}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});
