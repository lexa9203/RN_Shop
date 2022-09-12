import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, RefreshControl, Image } from 'react-native';
import Card from '../components/Card';
import { IProduct } from '../interfaces/interfaces';
import { PageSlider } from '@pietile-native-kit/page-slider';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([] as IProduct[])
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = () => {
    try {
      axios.get('https://6309e266f8a20183f77838e3.mockapi.io/products')
        .then(res => setProducts(res.data))
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить данные home')
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView refreshControl={<RefreshControl refreshing={false} onRefresh={getProducts} />}>
        <View>
          <Text style={styles.title}>Хиты сезона</Text>
          <PageSlider
            style={styles.pageSlider}
            onCurrentPageChange={() => { selectedPage }}
            onSelectedPageChange={setSelectedPage}
          >
            <View>
              <Image source={{ uri: 'https://gnom.land/upload/iblock/5ed/5edf226738acbcea75e8d280145db530.jpg' }} style={styles.img} />
            </View>
            <View>
              <Image source={{ uri: 'https://openshop.ua/image/cache/catalog/prod_crm/dytyachi-konstruktory/IMGddd4782e7648f404a1bc9d03885a762f-1200x1200.jpg' }} style={styles.img} />
            </View>
            <View>
              <Image source={{ uri: 'https://jucarici.ro/wp-content/uploads/2022/03/LEGO%C2%AE-Technic-ATV-Vehicul-De-Teren-42139.jpg' }} style={styles.img} />
            </View>
          </PageSlider>
          <View>
            {selectedPage === 0 
              ? <View style={styles.wrapPoints}>
                  <Text style={styles.activePoint}></Text>
                  <Text style={styles.point}></Text>
                  <Text style={styles.point}></Text>
                </View> 
              : selectedPage === 1 
              ? <View style={styles.wrapPoints}>
                  <Text style={styles.point}></Text>
                  <Text style={styles.activePoint}></Text>
                  <Text style={styles.point}></Text>
                </View> 
              : <View style={styles.wrapPoints}>
                  <Text style={styles.point}></Text>
                  <Text style={styles.point}></Text>
                  <Text style={styles.activePoint}></Text>
                </View>
            }
          </View>
        </View>
        {products.length ? <Text style={styles.subtitle}>Каталог</Text> : null}
        <View style={styles.cards}>
          {products.map((product: IProduct) => {
            return <View key={product.id} style={{ width: '50%' }}><Card isCart={true} product={product}></Card></View>
          })}
        </View>
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
  },
  slider: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'visible'
  },
  pageSlider: {
    width: '100%',
  },
  point: {
    width: 10,
    height: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    margin: 3
  },
  activePoint: {
    width: 10,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 50,
    margin: 3
  },
  wrapPoints: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{ translateX: -25 }]
  },
  title: {
    fontSize: 26,
    paddingLeft: 18,
    fontWeight: '700'
  },
  subtitle: {
    marginTop: 5,
    fontSize: 22,
    paddingLeft: 18,
    fontWeight: '500'
  },
  img: {
    height: 300, 
    width: '96%', 
    marginHorizontal: '2%'
  }
});
