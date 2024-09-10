import React, { useState } from 'react';
import { View, Text, ImageBackground, Image, Alert, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../Firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

const auth = getAuth(appFirebase);

const Login = ({ navigation }) => {
  const [correoElectronico, setCorreoElectronico] = useState();
  const [contrasena, setContrasena] = useState();
  const [loading, setLoading] = useState(false);

  const SignIn = async () => {
    if(!correoElectronico || !contrasena) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, llena todos los campos',
        button: 'Cerrar'
      });
      return;
    }
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, correoElectronico, contrasena);
      navigation.navigate('Inicio');
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, verifica tus credenciales',
        button: 'Cerrar'
      })
    } finally {
      setLoading(false);
    }
  };

  const [showContrasena, setshowContrasena] = useState(false);

  const SignUp = () => {
    navigation.navigate('Registro');
  };

  return (
    <AlertNotificationRoot>
      <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Image source={require('../img/gymProLogo.png')} style={styles.logoImage} />
          <Text style={styles.txtBienvenida}>El acompañante perfecto para tu vida fitness</Text>
          <TextInput
            style={styles.txtCorreoElectronico}
            placeholder="Correo Electrónico"
            placeholderTextColor={'white'}
            value={correoElectronico}
            onChangeText={(text) => setCorreoElectronico(text)}
            selectionColor="orange"
          />
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.txtContrasena}
                placeholder="Contraseña"
                placeholderTextColor={'white'}
                secureTextEntry={!showContrasena} // Alternar visibilidad
                value={contrasena}
                onChangeText={(text) => setContrasena(text)}
                selectionColor="orange"
              />
              <TouchableOpacity style={styles.iconEye} onPress={() => setshowContrasena(!showContrasena)}>
                <Icon name={showContrasena ? "visibility-off" : "visibility"} size={24} color="white" />
              </TouchableOpacity>
            </View>
          <TouchableOpacity style={styles.btnIniciarSesion} onPress={SignIn} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtBtnIniciarSesion}>Iniciar Sesión</Text>}
          </TouchableOpacity>
          <Text style={styles.txtCuenta}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={SignUp}>
            <Text style={[styles.txtRegistrate]}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4%',
  },
  background: {
    flex: 1,
  },
  logoImage: {
    height: 250,
    width: 250,
    marginTop: -200,
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginLeft: 30,
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
  iconEye: {
    marginTop: 15,
    marginLeft: 10,
  },
  btnIniciarSesion: {
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
  txtBtnIniciarSesion: {
    color: 'white',
    fontSize: 20,
    marginTop: -4,
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

export default Login;
