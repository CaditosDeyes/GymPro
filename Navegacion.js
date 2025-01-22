import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Importa el Drawer
import { NavigationContainer } from '@react-navigation/native';
import LOGIN from './screens/Login';
import REGISTRO from './screens/Registro';
import RESTABLECERCONTRASENA from './screens/RestablecerContrasena';
import INICIO from './screens/Inicio';
// import COMUNIDAD from './screens/Comunidad/Comunidad';
import Calendario from './screens/Calendario';
import ESTADO_FISICO from './screens/EstadoFisico';

// Crea el Stack y el Drawer
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Aquí configuramos el Drawer con las pantallas que deben estar dentro del menú hamburguesa
function MyDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Inicio" component={INICIO} />
            {/* <Drawer.Screen name="Comunidad" component={COMUNIDAD} /> */}
            <Drawer.Screen name="Calendario" component={Calendario} />
            <Drawer.Screen name="EstadoFisico" component={ESTADO_FISICO} />
        </Drawer.Navigator>
    );
}

// Navegación principal
const Navegacion = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LOGIN} options={{ headerShown: false }} />
                <Stack.Screen name="Registro" component={REGISTRO} options={{ headerShown: false }} />
                <Stack.Screen name="RestablecerContrasena" component={RESTABLECERCONTRASENA} options={{ headerShown: false }} />
                {/* Cambié esta línea para que el 'Drawer' se pase como componente */}
                <Stack.Screen name="Inicio" component={MyDrawer} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navegacion;
