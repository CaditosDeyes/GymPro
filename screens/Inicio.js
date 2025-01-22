import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, ProgressBar } from 'react-native-paper';
import useUsuarioInfo from '../hooks/ObtenerNombreUsuario';
import Background from '../hooks/ImageBackground';

const Inicio = ({ navigation }) => {
  const { usuarioInfo } = useUsuarioInfo(); // Obtener la información completa del usuario

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.txtSaludo}>Hola, {usuarioInfo.nombre} {usuarioInfo.apellido}!</Text>
          <Icon name="menu" size={30} style={styles.iconMenu} />
        </View>
        
        <Text style={styles.txtRecordatorioRutina}>Recuerda que hoy toca entrenar: Pierna</Text>
        
        {/* Tabla de ejercicios */}
        <View style={styles.tabla}>
          <Text style={styles.tablaEncabezado}>Ejercicios del día</Text>
          <View style={styles.fila}>
            <Text style={styles.celda}>Press En Prensa</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.celda}>Sentadilla Libre</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.celda}>Extensiones de cuadriceps</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.celda}>Sentadilla hack</Text>
          </View>
        </View>

        <Text style={styles.txtEntrenamientos}>Mis entrenamientos</Text>
        <Text style={styles.txtRutinasEntrenamiento}>Crea tus propias rutinas de entrenamiento</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.titleHeaderCard}>Entrenamiento en progreso</Text>
            <Text style={styles.textTonoMuscular}>Tono Muscular</Text>
            <Text style={styles.textProgreso}>Progreso 0%</Text>
            <ProgressBar progress={1} style={styles.progressBar} />
          </Card.Content>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.txtCrearRutina}>Crear una rutina de entrenamiento</Text>
            <Icon name="add-circle" size={60} style={styles.iconAdd}></Icon>
          </Card.Content>
        </Card>

        <Button
          title="Ir a Comunidad"
          onPress={() => navigation.navigate('Comunidad')}
        />
        <Button
          title="Ir a Calendario"
          onPress={() => navigation.navigate('Calendario')}
        />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '4%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  txtSaludo: {
    fontSize: 20,
    color: 'white',
  },
  txtRecordatorioRutina: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    marginLeft: 10,
  },
  iconMenu: {
    color: 'white',
  },
  tabla: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  tablaEncabezado: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  fila: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  celda: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    marginTop: 10,
    marginBottom: 10,
    height: 120,
  },
  txtEntrenamientos: {
    color: 'white',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  txtRutinasEntrenamiento: {
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
    marginTop: 3,
  },
  titleHeaderCard: {
    color: 'blue',
    fontSize: 20,
  },
  textTonoMuscular: {
    color: 'black',
    fontSize: 15,
    marginTop: 5,
  },
  textProgreso: {
    color: 'blue',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  txtCrearRutina: {
    fontSize: 15,
    color: 'black',
    marginTop: 30,
  },
  iconAdd: {
    color: 'rgb(37, 54, 86)',
    marginLeft: 270,
    marginTop: -40,
  },
  progressBar: {
    width: 330,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
});

export default Inicio;
