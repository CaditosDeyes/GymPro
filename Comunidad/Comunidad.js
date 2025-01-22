import React, { useState } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useUsuarioInfo from '../hooks/ObtenerNombreUsuario';
import { db } from '../fireBaseConfig'; // Importa db desde fireBaseConfig.js
import { collection, addDoc, serverTimestamp, doc } from 'firebase/firestore';
import PostList from './PostList';

const Comunidad = () => {
    const { usuarioInfo } = useUsuarioInfo();
    const [inputText, setInputText] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigation = useNavigation();

    const addPost = async () => {
        const trimmedText = inputText.trim();
        if (!trimmedText) {
            alert('Por favor, ingresa texto válido para publicar.');
            return;
        }

        setCargando(true);

        try {
            const post = {
                autor: `${usuarioInfo.nombre} ${usuarioInfo.apellido}`,
                contenido: trimmedText,
                fecha: serverTimestamp(),
                uid: usuarioInfo.uid || 'Desconocido',
                reacciones: {
                    meDivierte: 0,
                    meInteresa: 0,
                },
            };

            // Agregar publicación a Firestore
            const postRef = await addDoc(collection(db, 'posts'), post);



            setInputText('');
        } catch (error) {
            console.error('Error al guardar la publicación:', error);
            alert('Ocurrió un error al publicar. Por favor, intenta nuevamente.');
        } finally {
            setCargando(false);
        }
    };

    return (
        <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                {/* Encabezado de usuario */}
                <View style={styles.userContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                        <MaterialCommunityIcons name="home-account" size={30} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.userInfo}>
                        <Text style= {styles.userName}>¡Hola, {usuarioInfo.nombre} {usuarioInfo.apellido}!</Text>
                    </View>
                </View>

                {/* Campo para agregar publicación */}
                <View style={styles.postInputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="¿Qué estás pensando?"
                        placeholderTextColor="#888" // Color visible para el placeholder
                        multiline
                    />
                    <TouchableOpacity style={styles.postButton} onPress={addPost} disabled={cargando}>
                        {cargando ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.postButtonText}>Publicar</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Lista de publicaciones */}
                <PostList usuarioInfo={usuarioInfo} />
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userInfo: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 18,
        color: '#fff',
    },
    postInputContainer: {
        backgroundColor: 'rgba(7, 7, 7, 0.5)',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '100%',
    },
    input: {
        height: 60, // Asegura espacio suficiente
        fontSize: 16,
        color: '#fff', // Asegura un color visible
    },
    postButton: {
        backgroundColor: '#1DA1F2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Comunidad;
