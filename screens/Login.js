import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../Firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ALERT_TYPE, Dialog, AlertNotificationRoot } from 'react-native-alert-notification';
import Background from '../hooks/ImageBackground';
import ReactNativeBiometrics from 'react-native-biometrics';

const auth = getAuth(appFirebase);

const Login = ({ navigation }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);

  // Función para verificar la disponibilidad de biometría
  useEffect(() => {
    const checkBiometricsAvailability = async () => {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available } = await rnBiometrics.isSensorAvailable();
      setBiometricsAvailable(available);
    };
    checkBiometricsAvailability();
  }, []);

  const SignIn = async () => {
    if (!correoElectronico || !contrasena) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, llena todos los campos',
        button: 'Cerrar',
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
        button: 'Cerrar',
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para iniciar sesión con biometría
  const authenticateWithBiometrics = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (available && (biometryType === 'TouchID' || biometryType === 'FaceID' || biometryType === 'Biometrics')) {
      const { success } = await rnBiometrics.simplePrompt({ promptMessage: 'Iniciar sesión con biometría' });

      if (success) {
        // Aquí se puede autenticar el usuario sin necesidad de correo y contraseña
        navigation.navigate('Inicio');
      } else {
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Autenticación Fallida',
          textBody: 'No se pudo autenticar con biometría',
          button: 'Cerrar',
        });
      }
    } else {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Biometría no disponible',
        textBody: 'Tu dispositivo no soporta huella o reconocimiento facial',
        button: 'Cerrar',
      });
    }
  };

  const [showContrasena, setShowContrasena] = useState(false);

  const SignUp = () => {
    navigation.navigate('Registro');
  };
  return (
    <AlertNotificationRoot>
      <Background>
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
          {/* Botón de autenticación biométrica */}
          <TouchableOpacity style={styles.btnBiometrico} onPress={authenticateWithBiometrics}>
            <Icon name="fingerprint" size={30} color="white" />
            <Text style={styles.txtBtnBiometrico}>Usar biometría</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('RestablecerContrasena')}>
            <Text style={styles.txtOlvidasteContrasena}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
          <Text style={styles.txtCuenta}>¿No tienes una cuenta?</Text>
          <TouchableOpacity onPress={SignUp}>
            <Text style={[styles.txtRegistrate]}>Registrate</Text>
          </TouchableOpacity>
        </View>
      </Background>
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
  logoImage: {
    height: 250,
    width: 250,
    marginTop: -100,
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
  btnBiometrico: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    width: 280,
    height: 43,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  txtBtnBiometrico: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  txtCuenta: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    marginRight: 110,
  },
  txtOlvidasteContrasena: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
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