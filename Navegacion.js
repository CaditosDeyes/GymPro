import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LOGIN from './screens/Login';
import REGISTRO from './screens/Registro';
import INICIO from './screens/Inicio';
import COMUNIDAD from './screens/Comunidad';
import Calendario from './screens/Calendario';

// La importación de lo que usamos

const Stack = createNativeStackNavigator();

// Las acciones de los objetos
const Navegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LOGIN} options={{ headerShown: false }} />
                <Stack.Screen name="Registro" component={REGISTRO} options={{ headerShown: false }} />
                <Stack.Screen name="Inicio" component={INICIO} options={{ headerShown: false }} />
                <Stack.Screen name="Comunidad" component={COMUNIDAD} options={{ headerShown: false }} />
                <Stack.Screen name="Calendario" component={Calendario} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navegacion;
