import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import Background from '../hooks/ImageBackground';

const ResetPassword = ({ navigation }) => {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!correoElectronico) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, ingresa tu correo electrónico',
        button: 'Cerrar',
      });
      return;
    }

    // Validar formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correoElectronico)) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Por favor, ingresa un correo electrónico válido',
        button: 'Cerrar',
      });
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, correoElectronico);
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Correo enviado',
        textBody: 'Se ha enviado un correo con instrucciones para restablecer tu contraseña.',
        button: 'Cerrar',
      });

      // Navegar a otra pantalla si es necesario
      navigation.navigate('Login');
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'No se pudo enviar el correo. Verifica tu dirección e inténtalo de nuevo.',
        button: 'Cerrar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Restablecer Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico"
          placeholderTextColor="white"
          value={correoElectronico}
          onChangeText={setCorreoElectronico}
          selectionColor={'orange'}
        />
        <TouchableOpacity style={styles.btnEnviar} onPress={handleResetPassword} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.txtEnviar}>Enviar Correo</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnVolver} onPress={() => navigation.goBack()}>
          <Text style={styles.txtVolver}>Volver</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    color: 'white',
    padding: 15,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  btnEnviar: {
    width: '50%',
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  txtEnviar: {
    color: 'white',
    fontSize: 18,
  },
  btnVolver: {
    width: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  txtVolver: {
    color: 'white',
    fontSize: 18,
  },
});

export default ResetPassword;