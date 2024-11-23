import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, ProgressBar } from 'react-native-paper';
import useNombreUsuario from '../hooks/ObtenerNombreUsuario';
import Background from '../hooks/ImageBackground';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { Picker } from '@react-native-picker/picker'; // Importación correcta

const Inicio = ({ navigation }) => {
  const { nombreUsuario } = useNombreUsuario();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Pierna'); // Inicializar con una categoría existente
  const [ejercicios, setEjercicios] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');

  // Obtener ejercicios según la categoría seleccionada
  useEffect(() => {
    const cargarEjercicios = async () => {
      try {
        // Ruta de la subcolección correspondiente
        const ejerciciosRef = collection(
          db,
          'ejercicios',
          categoriaSeleccionada,
          `ejercicios_${categoriaSeleccionada.toLowerCase()}`
        );

        // Obtener los documentos de la subcolección
        const snapshot = await getDocs(ejerciciosRef);
        const listaEjercicios = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEjercicios(listaEjercicios); // Guardar en el estado
        setNombreCategoria(categoriaSeleccionada); // Establece el nombre de la categoría seleccionada
      } catch (error) {
        console.error('Error al cargar los ejercicios:', error);
      }
    };

    cargarEjercicios();
  }, [categoriaSeleccionada]); // Se ejecuta cada vez que cambia la categoría seleccionada

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.txtSaludo}>Hola, {nombreUsuario}!</Text>
          <Icon name="menu" size={30} style={styles.iconMenu} />
        </View>

        <Text style={styles.txtRecordatorioRutina}>
          Recuerda que hoy toca entrenar: {nombreCategoria}
        </Text>

        {/* Selección de la categoría de ejercicio */}
        <Picker
          selectedValue={categoriaSeleccionada}
          onValueChange={(itemValue) => setCategoriaSeleccionada(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pierna" value="Pierna" />
          <Picker.Item label="Pecho" value="Pecho" />
          <Picker.Item label="Bíceps" value="Biceps" />
          <Picker.Item label="Espalda" value="Espalda" />
        </Picker>

        <View style={styles.tabla}>
          <Text style={styles.tablaEncabezado}>Ejercicios del día</Text>
          {ejercicios.length > 0 ? (
            ejercicios.map((ejercicio, index) => (
              <View key={index} style={styles.fila}>
                <Text style={styles.celda}>{ejercicio.nombre || ejercicio.id}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noEjercicios}>No hay ejercicios disponibles</Text>
          )}
        </View>

        <Text style={styles.txtEntrenamientos}>Mis entrenamientos</Text>
        <Text style={styles.txtRutinasEntrenamiento}>Crea tus propias rutinas de entrenamiento</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.titleHeaderCard}>Entrenamiento en progreso</Text>
            <Text style={styles.textTonoMuscular}>Tono Muscular</Text>
            <Text style={styles.textProgreso}>Progreso 0%</Text>
            <ProgressBar progress={0.1} style={styles.progressBar} />
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
  background: {
    flex: 1,
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
    color: "white",
  },
  txtRecordatorioRutina: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
    marginLeft: 10,
  },
  iconMenu: {
    color: "white",
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
    color: "black",
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
    width: 330,  // Ancho de la barra de progreso
    height: 10,  // Grosor de la barra de progreso
    borderRadius: 10,  // Esquinas redondeadas
    backgroundColor: '#e0e0e0',  // Color de fondo de la barra
  },
  picker: {
    width: '100%',
    height: 20,
    backgroundColor: '#6bbcff',
    color: 'white',
    marginBottom: 20,
  },
});

export default Inicio;
