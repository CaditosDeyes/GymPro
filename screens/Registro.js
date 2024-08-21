import React, { useState } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { addDoc, collection } from 'firebase/firestore';

const Registro = ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if(!nombre || !apellido || !correoElectronico || !contrasena) {
      Alert.alert('Error', 'Por favor, llena todos los campos');
      return;
    }

    //Validación de formato de correo electronico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(correoElectronico)){
      Alert.alert('Error', 'Por favor, ingresa un correo electronico valido');
      return;
    }

    //Validacion de longitud de contraseña
    if(contrasena.length < 6){
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, correoElectronico, contrasena);
      const user = userCredentials.user;

      // Guardar la información adicional del usuario en Firestore
      await addDoc(collection(db, 'usuarios'), {
        uid: user.uid,
        nombre: nombre,
        apellido: apellido,
        correoElectronico: correoElectronico,
      });

      Alert.alert("Registro exitoso", "Usuario registrado correctamente");
      navigation.navigate('Inicio');
    } catch (error) {
      Alert.alert("Error al registrar:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const SignIn = () => {
    navigation.navigate('Login');
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
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.txtApellido}
          placeholder="Apellido"
          placeholderTextColor={'white'}
          value={apellido}
          onChangeText={setApellido}
        />
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
      <TouchableOpacity style={styles.btnRegistrarse} onPress={handleSignUp} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtBtnRegistrarse}>Registrarse</Text>}
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
