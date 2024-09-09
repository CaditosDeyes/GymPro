import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, FlatList, TextInput, Button, Image, TouchableOpacity } from 'react-native';
//import Icon from 'react-native-vector-icons/AntDesign';

// Asegúrate de que las rutas a las imágenes sean correctas
//const backgroundImg = require('./img/background_image.jpg'); // Ruta a la imagen de fondo
//const logoImg = require('./img/gymProLogo.png'); // Ruta al logo en formato PNG

const Comunidad = () => {
    const [posts, setPosts] = useState([]);
    const [inputText, setInputText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null); // Estado para la imagen seleccionada

    const addPost = () => {
        if (inputText.trim() || selectedImage) {
            setPosts([...posts, { id: posts.length.toString(), content: inputText, image: selectedImage }]);
            setInputText('');
            setSelectedImage(null); // Limpiamos la imagen seleccionada después de agregar el post
        }
    };

    // Función para seleccionar una imagen (a implementar)
    const selectImage = () => {
        // Aquí se implementaría la lógica para seleccionar imágenes
        // Por ahora, simplemente establecemos una imagen de ejemplo
        setSelectedImage('https://via.placeholder.com/150');
    };

    return (
        <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../img/gymProLogo.png')} style={styles.logo} />
                    <Text style={styles.title}>Comunidad</Text>
                </View>
                <View style={styles.userContainer}>
                        {/*<Icon name="user" size={40} color="#ccc" style={styles.userIcon} />*/}
                    <Text style={styles.userName}>Usuario</Text>
                </View>
                <View style={styles.postInputContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder="¿Qué estás pensando?"
                        placeholderTextColor="#333"
                        multiline
                    />
                    <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                        {/*<Icon name="camera" size={30} color="#333" />*/}
                        <Text style={styles.imagePickerText}>Adjuntar imagen</Text>
                    </TouchableOpacity>
                </View>
                {selectedImage && (
                    <View style={styles.selectedImageContainer}>
                        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                    </View>
                )}
                <Button title="Publicar" onPress={addPost} />
                <FlatList
                    data={posts}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text style={styles.postContent}>{item.content}</Text>
                            {item.image && (
                                <Image source={{ uri: item.image }} style={styles.postImage} />
                            )}
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ flexGrow: 1, width: '100%' }}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginRight: 50,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    userIcon: {
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        color: '#fff',
    },
    postInputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 80,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        color: '#333',
        backgroundColor: '#fff',
        marginRight: 10,
        textAlignVertical: 'top',
    },
    imagePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    imagePickerText: {
        marginLeft: 10,
        color: '#333',
    },
    selectedImageContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        resizeMode: 'cover',
    },
    postContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
    },
    postContent: {
        fontSize: 16,
        color: '#333',
    },
    postImage: {
        marginTop: 10,
        width: '100%',
        height: 200,
        borderRadius: 5,
        resizeMode: 'cover',
    },
});

export default Comunidad;
