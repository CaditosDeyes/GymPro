import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer'; // Importa el Drawer
import { NavigationContainer } from '@react-navigation/native';
import LOGIN from './screens/Login';
import REGISTRO from './screens/Registro';
import RESTABLECERCONTRASENA from './screens/RestablecerContraseña';
import INICIO from './screens/Inicio';
import COMUNIDAD from './Comunidad/Comunidad';
import Calendario from './screens/Calendario';
import ESTADO_FISICO from './screens/EstadoFisico';
import PERFIL from './Comunidad/Perfil'; // Asegúrate de importar el componente Perfil
import MISPUBLICACIONES from './Comunidad/MisPublicaciones';

// Crea el Stack y el Drawer
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
                <Stack.Screen name="Inicio" component={INICIO} options={{ headerShown: false }} />
                <Stack.Screen name="EstadoFisico" component={ESTADO_FISICO} options={{ headerShown: false }} />
                <Stack.Screen name="Perfil" component={PERFIL} options={{ headerShown: false }} />
                <Stack.Screen name="MisPublicaciones" component={MISPUBLICACIONES} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navegacion;