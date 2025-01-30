import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createUserWithEmailAndPassword, sendEmailVerification, updateCurrentUser } from 'firebase/auth';
import { auth} from '../Firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Background from '../hooks/ImageBackground';

const Registro = ({navigation}) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContrasena, setshowContrasena] = useState(false);

  const handleSignUp = async () => {
    if(!nombre || !apellido || !correoElectronico || !contrasena) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, llena todos los campos',
        button: 'Cerrar'
      });
      return;
    }

    //Validación de formato de correo electronico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(correoElectronico)){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, ingresa un formato de correo electronico valido',
        button: 'Cerrar'
      });
      return;
    }

    //Validacion de longitud de contraseña
    if(contrasena.length < 6){
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'La contraseña debe tener al menos 6 caracteres',
        button: 'Cerrar'
      });
      return;
    }
    
    setLoading(true);
    try {
      //Se crea el usuario
      const userCredentials = await createUserWithEmailAndPassword(auth, correoElectronico, contrasena);
      const user = userCredentials.user;

      //Se envia el enlace de verificacion de correo
      await sendEmailVerification(user);
      Dialog.show({
        type:ALERT_TYPE.SUCCESS,
        title: 'Registro Exitoso',
        textBody: 'Se ha enviado un enlace de verificación a tu correo electronico. Por favor, verifica tu correo antes de iniciar sesión.',
        button: 'Cerrar'
      });

      //Verificar si el correo está verificado
      const interval = setInterval(async () => {
        await user.reload(); //Recargar el estado del usuario
        if(user.emailVerified) {
          clearInterval(interval);
          Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title: 'Verificación Completada',
            textBody: 'Correo electronico verificado. Puedes continuar con tu registro.',
            button: 'Cerrar',
          });
          navigation.navigate('EstadoFisico', {uid:user.uid, nombre, apellido, correoElectronico});
        }
      }, 3000); //Verificar cada 3 segundos

    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'El correo electrónico ya está en uso, intenta de nuevo',
          button: 'Cerrar'
        });
      }else{
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'Error al registrar al usuario',
          button: 'Cerrar'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const SignIn = () => {
    navigation.navigate('Login');
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image source={require('../img/gymProLogo.png')} style={styles.logoImage}/>
        <Text style={styles.txtRegistrate}>Registrate</Text>
        <TextInput
            style={styles.txtNombre}
            placeholder="Nombre"
            placeholderTextColor={'white'}
            value={nombre}
            onChangeText={setNombre}
            selectionColor="orange"
          />
          <TextInput
            style={styles.txtApellido}
            placeholder="Apellido"
            placeholderTextColor={'white'}
            value={apellido}
            onChangeText={setApellido}
            selectionColor="orange"
          />
        <TextInput
          style={styles.txtCorreoElectronico}
          placeholder="Correo Electrónico"
          placeholderTextColor={'white'}
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
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
        <TouchableOpacity style={styles.btnRegistrarse} onPress={handleSignUp} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtBtnRegistrarse}>Continuar</Text>}
          </TouchableOpacity>
        <Text style={styles.txtCuenta}>¿Ya tienes una cuenta?</Text>
        <TouchableOpacity onPress={SignIn}>
          <Text style={styles.txtIniciaSesion}>Inicia Sesión</Text>
        </TouchableOpacity>
      </View>
    </Background>
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
    marginTop: -80,
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