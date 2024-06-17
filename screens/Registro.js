import React, { useState } from 'react';
import { View, Text, TextInput, Button, ImageBackground, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';

const Registro = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Aquí va la lógica para registrar al usuario con Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log('Registrado con:', user.email);
      })
      .catch((error) => {
        console.error('Error al registrar:', error.message);
      });
  };

  const SignIn = () => {
    props.navigation.navigate('Login');
  }

  return (
    <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
    <View style={styles.container}>
      <Image source={require('../img/gymProLogo.png')} style={styles.logoImage}/>
      <Text style={styles.txtRegistrate}>Registrate</Text>
      <TextInput
      style={styles.txtNombre}
      placeholder="Nombre"
      placeholderTextColor={'white'}
      />
      <TextInput
      style={styles.txtApellido}
      placeholder="Apellido"
      placeholderTextColor={'white'}
      />
      <TextInput
        style={styles.txtCorreoElectronico}
        placeholder="Correo Electrónico"
        placeholderTextColor={'white'}
      />
      <TextInput
        style={styles.txtContrasena}
        placeholder="Contraseña"
        placeholderTextColor={'white'}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.btnRegistrarse}>
        <Text style={styles.txtBtnRegistrarse}>Registrarse</Text>
      </TouchableOpacity>
      <Text style={styles.txtCuenta}>¿Ya tienes una cuenta?</Text>
      <TouchableOpacity onPress={SignIn}>
        <Text style={[styles.txtIniciaSesion]}>Inicia Sesión</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
  },
  logoImage: {
    height: 250,
    width: 250,
    marginTop: -122,
    marginLeft: 5,
  },
  txtRegistrate: {
    fontSize: 18,
    color: 'white',
    marginTop: 15,
    justifyContent: 'center',
  },
  txtNombre: {
    backgroundColor: 'transparent',
    width: 280,
    height: 43,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  txtApellido: {
    backgroundColor: 'transparent',
    width: 280,
    height: 43,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  txtCorreoElectronico: {
    backgroundColor: 'transparent',
    width: 280,
    height: 43,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  txtContrasena: {
    backgroundColor: 'transparent',
    width: 280,
    height: 43,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  btnRegistrarse: {
    width: 280,
    height: 43,
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  txtBtnRegistrarse: {
    color: 'white',
    fontSize: 20,
    marginTop: -4,
  },
  txtCuenta: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    marginRight: 120,
  },
  txtIniciaSesion: {
    color: 'white',
    fontSize: 20,
    marginTop: -27,
    marginLeft: 205,
    textDecorationLine: 'underline',
  },
});

export default Registro;
