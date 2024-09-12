// en Comunidad.js
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import Post from './Post';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Comunidad = () => {
    const [posts, setPosts] = useState([]);
    const [inputText, setInputText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const addPost = () => {
        if (inputText.trim() || selectedImage) {
            setPosts([...posts, { id: posts.length.toString(), content: inputText, image: selectedImage }]);
            setInputText('');
            setSelectedImage(null);
        }
    };

    const selectImage = () => {
        ImagePicker.launchImageLibrary({}, response => {
            if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0].uri);
            }
        });
    };

    return (
        <ImageBackground source={require('./img/background_image.jpg')} style={styles.background}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.userContainer}>
                    <Icon name="account-circle" size={40} color="white"/>
                    <Text style={styles.userName}>  Usuario</Text>
                </View>
                <View style={styles.postInputContainer}>
                    <View style={styles.inputAndButtonContainer}>
                        <TextInput
                            style={styles.input}
                            value={inputText}
                            onChangeText={setInputText}
                            placeholder="¿Qué estás pensando?"
                            placeholderTextColor="#fff"
                            multiline
                        />
                        <TouchableOpacity style={styles.postButton} onPress={addPost}>
                            <Text style={styles.postButtonText}>Publicar</Text>
                        </TouchableOpacity>
                    </View>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                    )}
                    <View style={styles.attachmentButtons}>
                        <TouchableOpacity style={styles.attachmentButton} onPress={selectImage}>
                            <Icon name="add-photo-alternate" size={20} color="white"/>
                            <Text style={styles.attachmentButtonText}>Adjuntar imagen</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.attachmentButton} onPress={() => { /* lógica para adjuntar video */ }}>
                            <Icon name="videocam" size={20} color="white"/>
                            <Text style={styles.attachmentButtonText}> Adjuntar video</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <Post post={item} />}
                    keyExtractor={item => item.id}
                />
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
    userIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 18,
        color: '#fff',
    },
    postInputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    inputAndButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: '#fff',
        marginRight: 10,
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginTop: 10,
    },
    attachmentButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    attachmentButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attachmentIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    attachmentButtonText: {
        color: '#fff',
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
