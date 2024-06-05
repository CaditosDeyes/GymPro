import { useState } from 'react';
import React from 'react';
import { View, Text, ImageBackground, Image, Alert, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Inicio = () => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión
    if (correoElectronico === '' || contrasena === '') {
      Alert.alert('Error', 'Por favor, ingrese su correo electrónico y contraseña.');
    } else {
      Alert.alert('Éxito', 'Has iniciado sesión con éxito.');
      // Aquí puedes agregar la lógica para redirigir al usuario a otra pantalla
    }
  };

  const handleLoginGoogle = () => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión con Google
    Alert.alert('Éxito', 'Inicio de sesión con Google realizado');
  };

  const handleLoginFacebook = () => {
    // Aquí puedes agregar la lógica para manejar el inicio de sesión con Google
    Alert.alert('Éxito', 'Inicio de sesión con Facebook realizado');
  };

  const handleRegistro = () => {
    // Aquí puedes agregar la lógica para el registro
    Alert.alert('Registro', 'Redirigir al usuario a la página de registro');
  };

  return (
    <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../img/gymProLogo.png')} style={styles.logoImage} />
        <Text style={styles.txtBienvenida}>El acompañante perfecto para tu vida fitness</Text>
        <TextInput
          style={styles.txtCorreoElectronico}
          placeholder="Correo Electrónico"
          placeholderTextColor={'white'}
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
        />
        <TextInput
          style={styles.txtContrasena}
          placeholder="Contraseña"
          placeholderTextColor={'white'}
          secureTextEntry={true}
          value={contrasena}
          onChangeText={setContrasena}
        />
        <TouchableOpacity style={styles.btnIniciarSesion} onPress={handleLogin}>
          <Text style={styles.txtBtnIniciarSesion}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <Text style={styles.txtAccesoRapido}>Acceso Rápido</Text>
        <TouchableOpacity style={styles.btnGoogle} onPress={handleLoginGoogle}>
          <Image source={require('../img/googleLogo.png')} style={styles.googleLogo} />
          <Text style={styles.txtAccesoGoogle}>Continuar Con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnFacebook} onPress={handleLoginFacebook}>
          <Image source={require('../img/facebookLogo.png')} style={styles.facebookLogo} />
          <Text style={styles.txtAccesoFacebook}>Continuar Con Facebook</Text>
        </TouchableOpacity>
        <Text style={styles.txtCuenta}>¿No tienes una cuenta?</Text>
        <TouchableOpacity onPress={handleRegistro}>
          <Text style={[styles.txtRegistrate]}>Registrate</Text>
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
    marginTop: -50,
    marginLeft: 18,
  },
  txtBienvenida: {
    fontSize: 18,
    color: 'white',
    marginTop: 15,
    justifyContent: 'center',
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
  btnIniciarSesion: {
    width: 280,
    height: 43,
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  txtBtnIniciarSesion: {
    color: 'white',
    fontSize: 20,
    marginTop: -4,
  },
  txtAccesoRapido: {
    fontSize: 20,
    color: 'white',
    marginTop: 40,
    textAlign: 'center',
  },
  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  txtAccesoGoogle: {
    color: 'white',
    fontSize: 20,
  },
  btnFacebook: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  facebookLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  txtAccesoFacebook: {
    color: 'white',
    fontSize: 20,
  },
  txtCuenta: {
    color: 'white',
    fontSize: 20,
    marginTop: 30,
    marginRight: 110,
  },
  txtRegistrate: {
    color: 'white',
    fontSize: 20,
    marginTop: -27,
    marginLeft: 200,
    textDecorationLine: 'underline',
  },
});

export default Inicio;
