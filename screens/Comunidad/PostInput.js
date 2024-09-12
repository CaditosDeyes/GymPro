// PostInput.js
import React from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';

const PostInput = ({ user, value, onChangeText, onSubmit }) => {
  return (
    <View style={styles.inputContainer}>
      <Image source={user.image} style={styles.avatar} />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder="Escribe una publicación..."
          placeholderTextColor="#ccc"
        />
        <Button title="Publicar" onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textInput: {
    flex: 1,
    color: '#fff',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
    marginRight: 10,
  },
});

export default PostInput;
