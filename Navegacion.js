import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LOGIN from './screens/Login';
import HOME from './screens/Home';
//La importacion de lo que usemos

const Stack = createNativeStackNavigator();
//Las acciones de los objetos
const Navegacion = () =>{
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LOGIN} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name="Home" component={HOME} options={{headerShown:false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
      );
      
}

export default Navegacion;
