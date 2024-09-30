import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native'; // Asegúrate de importar ScrollView
import { useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';


// Configuración del calendario en español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ],
  today: 'Hoy'
};
LocaleConfig.defaultLocale = 'es';

const HistoryItem = ({ date, text }) => (
  <View style={styles.historyItem}>
    <View style={styles.historyDate}>
      <Text style={styles.historyDay}>{moment(date).format('DD')}</Text>
      <Text style={styles.historyMonth}>{moment(date).format('MMM')}</Text>
    </View>
    <Text style={styles.historyText}>{text}</Text>
    <TouchableOpacity>
      <Text style={styles.historyArrow}>&gt;</Text>
    </TouchableOpacity>
  </View>
);

const Calendario = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
  const [key, setKey] = useState(0); // Agregar una key para forzar el re-render
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [history, setHistory] = useState([]);

  const handleMonthChange = (direction) => {
    const newMonth = moment(currentMonth).add(direction, 'month').format('YYYY-MM');
    setCurrentMonth(newMonth);
    setKey(prevKey => prevKey + 1); // Incrementar la key para forzar el re-render
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    console.log('selected day', day);
  };

  const handleAddPress = () => {
    if (inputText) {
      setHistory([...history, { date: selectedDate, text: inputText }]);
      setInputText('');
      setModalVisible(false);
    }
  };

  return (
    <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleMonthChange(-1)} style={styles.arrowButton}>
            <Text style={styles.arrow}>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Histórico</Text>
            <Text style={styles.headerMonth}>{moment(currentMonth).format('MMMM, YYYY')}</Text>
          </View>
          <TouchableOpacity onPress={() => handleMonthChange(1)} style={styles.arrowButton}>
            <Text style={styles.arrow}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarContainer}>
          <Calendar
            key={key} // Usar la key para forzar el re-render
            current={currentMonth}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: '#00adf5' },
            }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#b6c1cd',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#00adf5',
              dayTextColor: '#ffffff',
              textDisabledColor: '#d9e1e8',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: 'white',
              monthTextColor: 'white',
              indicatorColor: 'white',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 12,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 12,
            }}
            hideArrows={true}  
            hideExtraDays={false}  
            disableMonthChange={true}
          />
        </View>
        <Text style={styles.historyTitle}>Historia</Text>

        <ScrollView style={styles.historyContainer}>
          {history.filter(item => item.date === selectedDate).map((item, index) => (
            <HistoryItem key={index} date={item.date} text={item.text} />
          ))}
          {history.filter(item => item.date === selectedDate).length === 0 && (
            <HistoryItem date={selectedDate} text="Actualizar información del cuerpo" />
          )}
        </ScrollView>

        <View style={styles.addButtonContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
            <Text style={styles.addButtonIcon}>+</Text>
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Agregar información"
            value={inputText}
            onChangeText={setInputText}
          />
          <Button title="Guardar" onPress={handleAddPress} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  // Mantén tus estilos existentes y agrega lo siguiente:
  historyContainer: {
    maxHeight: 200, // Establece una altura máxima para que no ocupe demasiado espacio
    width: '90%', // Ancho similar al de los items de la historia
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Mueve todo hacia la parte superior
    paddingTop: 30, // Ajusta el padding superior según sea necesario
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55%',
    marginVertical: 10,
  },
  arrowButton: {
    padding: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#fff',
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerMonth: {
    fontSize: 18,
    color: '#fff',
  },
  calendarContainer: {
    backgroundColor: 'rgba(70, 70, 70, 1)',  // Fondo opaco
    borderRadius: 10,  // Esquinas redondeadas
    padding: 5,  // Reducir el padding interno para disminuir la altura
    marginBottom: 20,  // Espacio inferior
    width: '95%', // Ancho del calendario
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingLeft: '5%',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '90%',
  },
  historyDate: {
    alignItems: 'center',
    marginRight: 10,
  },
  historyDay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00adf5',
  },
  historyMonth: {
    fontSize: 12,
    color: '#00adf5',
  },
  historyText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  historyArrow: {
    fontSize: 16,
    color: '#00adf5',
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '90%',
    marginBottom: 10,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#000',
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#00adf5',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
  }
});

export default Calendario;
