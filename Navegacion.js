import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LOGIN from './screens/Login';
import REGISTRO from './screens/Registro';
import RESTABLECERCONTRASENA from './screens/RestablecerContraseña';
import COMUNIDAD from './Comunidad/Comunidad';
import Calendario from './screens/Calendario';
import ESTADO_FISICO from './screens/EstadoFisico';
import PERFIL from './Comunidad/Perfil';
import MISPUBLICACIONES from './Comunidad/MisPublicaciones';
import { BottomTab } from './BottomTab'; // Contiene la pantalla Inicio y otras

// Crea el Stack
const Stack = createNativeStackNavigator();

// Navegación principal
const Navegacion = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LOGIN} options={{ headerShown: false }} />
        <Stack.Screen name="Registro" component={REGISTRO} options={{ headerShown: false }} />
        <Stack.Screen name="RestablecerContrasena" component={RESTABLECERCONTRASENA} options={{ headerShown: false }} />
        <Stack.Screen name="Comunidad" component={COMUNIDAD} options={{ headerShown: false }} />
        <Stack.Screen name="Calendario" component={Calendario} options={{ headerShown: false }} />
        <Stack.Screen name="EstadoFisico" component={ESTADO_FISICO} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={PERFIL} options={{ headerShown: false }} />
        <Stack.Screen name="MisPublicaciones" component={MISPUBLICACIONES} options={{ headerShown: false }} />
        
        {/* Esta es la pantalla con el BottomTab */}
        <Stack.Screen name="Inicio" component={BottomTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navegacion;
