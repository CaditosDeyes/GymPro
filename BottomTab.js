import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import Inicio from "./screens/Inicio";
import Calendario from "./screens/Calendario";
import Comunidad from "./Comunidad/Comunidad";
import Perfil from "./Comunidad/Perfil"; // Pantalla adicional dentro de Comunidad

const Tab = createBottomTabNavigator();
const ComunidadStack = createNativeStackNavigator();

// Stack Navigator para la pestaña Comunidad
const ComunidadStackNavigator = () => {
    return (
        <ComunidadStack.Navigator>
            <ComunidadStack.Screen
                name="ComunidadMain"
                component={Comunidad}
                options={{ headerShown: false }}
            />
            <ComunidadStack.Screen
                name="Perfil"
                component={Perfil}
                options={{ headerShown: false}}
            />
        </ComunidadStack.Navigator>
    );
};

// Bottom Tab Navigator
export const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#007AFF", // Color cuando está seleccionado
                tabBarInactiveTintColor: "#8e8e93", // Color cuando no está seleccionado
                tabBarStyle: { backgroundColor: "#f8f8f8", paddingBottom: 5 }, // Estilos del tab bar
            }}
        >
            <Tab.Screen
            name="Inicio"
            component={Inicio}
            options={{
                headerShown: false,
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
                ),
            }}
            />
            <Tab.Screen
                name="Calendario"
                component={Calendario}
                options={{
                    headerShown: false,
                    tabBarLabel: "Calendario",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar-today" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Comunidad"
                component={ComunidadStackNavigator} // Usa el Stack Navigator para Comunidad
                options={{
                    headerShown: false,
                    tabBarLabel: "Comunidad",
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="group" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
