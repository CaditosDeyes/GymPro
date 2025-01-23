import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import useUsuarioInfo from '../hooks/UseUsuarioInfo';

const Perfil = ({ navigation }) => {
  const { usuarioInfo, actualizarUsuarioInfo } = useUsuarioInfo();
  const [editando, setEditando] = useState(false);

  // Estados para campos editables
  const [peso, setPeso] = useState('');
  const [estatura, setEstatura] = useState('');
  const [nivelExperiencia, setNivelExperiencia] = useState('');
  const [cargando, setCargando] = useState(false); // Estado para cargar cambios

  // Sincronizar valores de usuarioInfo con estados editables
  useEffect(() => {
    if (usuarioInfo) {
      setPeso(usuarioInfo.peso);
      setEstatura(usuarioInfo.estatura);
      setNivelExperiencia(usuarioInfo.nivelExperiencia);
    }
  }, [usuarioInfo]);

  const manejarEdicion = () => {
    setEditando(!editando);
  };

  const guardarCambios = async () => {
    setCargando(true); // Activar indicador de carga
    try {
      await actualizarUsuarioInfo({
        peso,
        estatura,
        nivelExperiencia,
      });
      setEditando(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      alert('Hubo un error al guardar los cambios. Intenta nuevamente.');
    } finally {
      setCargando(false); // Desactivar indicador de carga
    }
  };

  if (!usuarioInfo) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        {/* Información básica del usuario */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          <View style={styles.infoRow}>
            <Icon name="account" size={20} color="#555" />
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{usuarioInfo.nombre}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="account" size={20} color="#555" />
            <Text style={styles.label}>Apellido:</Text>
            <Text style={styles.value}>{usuarioInfo.apellido}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="email" size={20} color="#555" />
            <Text style={styles.label}>Correo:</Text>
            <Text style={styles.value}>{usuarioInfo.correoElectronico}</Text>
          </View>
        </View>

        {/* Información editable */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información Editable</Text>

          {/* Peso */}
          <View style={styles.infoRow}>
            <Icon name="weight-kilogram" size={20} color="#555" />
            <Text style={styles.label}>Peso (kg):</Text>
            {editando ? (
              <TextInput
                style={styles.input}
                value={peso}
                onChangeText={setPeso}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.value}>{peso}</Text>
            )}
          </View>

          {/* Estatura */}
          <View style={styles.infoRow}>
            <Icon name="ruler" size={20} color="#555" />
            <Text style={styles.label}>Estatura (cm):</Text>
            {editando ? (
              <TextInput
                style={styles.input}
                value={estatura}
                onChangeText={setEstatura}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.value}>{estatura}</Text>
            )}
          </View>

          {/* Nivel de experiencia */}
          <View style={styles.infoRow}>
            <Icon name="chart-line" size={20} color="#555" />
            <Text style={styles.label}>Nivel de Experiencia:</Text>
            {editando ? (
              <Picker
                selectedValue={nivelExperiencia}
                style={styles.picker}
                onValueChange={(itemValue) => setNivelExperiencia(itemValue)}
              >
                <Picker.Item label="Sin experiencia" value="Sin experiencia" />
                <Picker.Item label="Novato" value="Novato" />
                <Picker.Item label="Intermedio" value="Intermedio" />
                <Picker.Item label="Experto" value="Experto" />
              </Picker>
            ) : (
              <Text style={styles.value}>{nivelExperiencia}</Text>
            )}
          </View>
        </View>

        {/* Botones */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={manejarEdicion}>
            <Icon name={editando ? 'cancel' : 'account-edit'} size={20} color="#fff" />
            <Text style={styles.buttonText}>{editando ? 'Cancelar' : 'Editar'}</Text>
          </TouchableOpacity>
          {editando && (
            <TouchableOpacity style={styles.button} onPress={guardarCambios}>
              {cargando ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Icon name="content-save" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Guardar</Text>
                </>
              )}
            </TouchableOpacity>
          )}
        </View>

        {/* NUEVOS BOTONES AGREGADOS */}
        <View style={styles.newActions}>
  {/* Botón 1: Regresar a comunidad */}
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('Comunidad')} // Navegar a la pantalla "Comunidad"
  >
    <Icon name="keyboard-backspace" size={20} color="#fff" />
    <Text style={styles.buttonText}>Regresar a comunidad</Text>
  </TouchableOpacity>

  {/* Botón 2: Mis publicaciones */}
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('MisPublicaciones')} // Navegar a la pantalla "MisPublicaciones"
  >
    <Icon name="note-search" size={20} color="#fff" />
    <Text style={styles.buttonText}>Mis publicaciones</Text>
  </TouchableOpacity>
</View>
  

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    flex: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    flex: 2,
    fontSize: 16,
  },
  picker: {
    flex: 2,
    height: 40,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newActions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
});

export default Perfil;