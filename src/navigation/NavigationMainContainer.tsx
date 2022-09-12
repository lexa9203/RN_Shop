import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Favorite from '../screens/Favorite';

const Tab = createBottomTabNavigator()

export default function NavigationMainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Home' screenOptions={{
        tabBarActiveTintColor: '#383838',
      }}>
        <Tab.Screen name='Главная страница' component={Home} options={{
          tabBarLabel: 'Главная',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name='Избранное' component={Favorite} options={{
          tabBarLabel: 'Избранное',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name='Корзина' component={Cart} options={{
          tabBarLabel: 'Корзина',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
        />
        <Tab.Screen name='Ваши заказы' component={Orders} options={{
          tabBarLabel: 'Заказы',
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size} />
          ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
