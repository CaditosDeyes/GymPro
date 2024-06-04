import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import INICIO from './screens/Inicio';
//La importacion de lo que usemos

const Stack = createNativeStackNavigator();
//Las acciones de los objetos
const Navegacion = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Inicio" component={INICIO} options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
      );
      
}

export default Navegacion;
