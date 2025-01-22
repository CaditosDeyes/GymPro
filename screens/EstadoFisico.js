import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../Firebase';
import { doc, updateDoc, getDoc, setDoc, addDoc, collection } from 'firebase/firestore';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { Picker } from '@react-native-picker/picker';
import Background from '../hooks/ImageBackground';

const EstadoFisico = ({ route, navigation }) => {
  const { uid, nombre, apellido, correoElectronico } = route.params;
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [nivelExperiencia, setNivelExperiencia] = useState(null);
  const [loading, setLoading] = useState(false);

  const guardarEstadoFisico = async () => {
    if (!peso || !estatura || !nivelExperiencia) {
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
      await addDoc(collection(db, 'usuarios'),{
        uid,
        nombre,
        apellido,
        correoElectronico,
        peso: parseFloat(peso),
        estatura: parseFloat(estatura),
        nivelExperiencia,
      });

      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Éxito',
        textBody: 'Usuario creado correctamente',
        button: 'Cerrar',
      });
      navigation.navigate('Inicio');
    } catch (error) {
      Dialog.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'Error al crear el usuario',
        button: 'Cerrar',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text style={styles.title}>Información Física</Text>

        <TextInput
          style={styles.input}
          placeholder="Peso (kg)"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />

        <TextInput
          style={styles.input}
          placeholder="Estatura (m)"
          placeholderTextColor="white"
          keyboardType="numeric"
          value={estatura}
          onChangeText={setEstatura}
        />

        <Picker
          selectedValue={nivelExperiencia}
          onValueChange={(itemValue) => setNivelExperiencia(itemValue)}
          style={styles.picker}
        >
          {nivelExperiencia === null && (
            <Picker.Item label="Selecciona un nivel de experiencia" value={null} color="gray" />
          )}
          <Picker.Item label="Básico" value="Básico" />
          <Picker.Item label="Intermedio" value="Intermedio" />
          <Picker.Item label="Avanzado" value="Avanzado" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={guardarEstadoFisico} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Guardar</Text>}
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#309dd3',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default EstadoFisico;