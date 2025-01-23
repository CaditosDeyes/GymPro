import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

import { db, auth, GoogleSignin } from '../Firebase'; //  aqui depende de la produndiddd de la carpeta
// console.log('¡Conexión a Firebase exitosa!', db);


//Firebase y DateTimePicker Helpers ===
import { 
  onAuthStateChanged 
} from 'firebase/auth';

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';

// Para seleccionar hora en formato 12h AM/PM
import DateTimePicker from '@react-native-community/datetimepicker'; //npm install @react-native-community/datetimepicker

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

const HistoryItem = ({ date, text, onEdit, onDelete, isSelected, onSelect }) => (
  <TouchableOpacity onPress={onSelect} style={[styles.historyItem, isSelected && styles.selectedHistoryItem]}>
    <View style={styles.historyDate}>
      <Text style={styles.historyDay}>{moment(date).format('DD')}</Text>
      <Text style={styles.historyMonth}>{moment(date).format('MMM')}</Text>
    </View>
    <Text style={styles.historyText}>{text}</Text>
    {isSelected && (
      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.editButton}>
          <Text style={styles.buttonText}>Modificar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    )}
  </TouchableOpacity>
);

const Calendario = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM'));
  const [key, setKey] = useState(0); 
  const [modalVisible, setModalVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [history, setHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(null);

  // Estado para almacenar el uid y el docID autogenerado del usuario
  const [userUid, setUserUid] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  // NUEVO estado para la HORA en formato 12h (ej. "07:30 AM")
  const [selectedTime, setSelectedTime] = useState('');

  // Para mostrar u ocultar el DateTimePicker de hora
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Detectar el usuario logueado (uid)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Usuario logueado con UID:', user.uid);
        setUserUid(user.uid);

        try {
          // Buscar en "usuarios" donde doc.data().uid == user.uid
          const usuariosRef = collection(db, 'usuarios');
          const qUser = query(usuariosRef, where('uid', '==', user.uid));
          const snapUser = await getDocs(qUser);

          if (!snapUser.empty) {
            const found = snapUser.docs[0];
            setUserDocId(found.id);
            console.log('DocID autogenerado del usuario:', found.id);
          } else {
            console.log('No se encontró un documento en "usuarios" con uid:', user.uid);
            setUserDocId(null);
          }
        } catch (error) {
          console.error('Error al buscar docID del usuario:', error);
          setUserDocId(null);
        }

      } else {
        console.log('No hay usuario logueado');
        setUserUid(null);
        setUserDocId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // fecha local sin adelantar un día
  useEffect(() => {
    // Obtenemos la fecha real local sin adelantos
    const now = new Date();
    // Asignamos esa fecha a selectedDate y currentMonth
    setSelectedDate(moment(now).format('YYYY-MM-DD'));
    setCurrentMonth(moment(now).format('YYYY-MM'));
  }, []);

  const handleMonthChange = (direction) => {
    const newMonth = moment(currentMonth).add(direction, 'month').format('YYYY-MM');
    setCurrentMonth(newMonth);
    setKey(prevKey => prevKey + 1); 
  };

  const handleDayPress = async (day) => {
    setSelectedDate(day.dateString);
    console.log('selected day', day);

    if (!userDocId) {
      setHistory([]);
      return;
    }

    try {
      const fechaDocRef = doc(db, 'usuarios', userDocId, 'recordatorios', day.dateString);
      const fechaSnap = await getDoc(fechaDocRef);

      if (fechaSnap.exists()) {
        const dataFecha = fechaSnap.data();
        console.log('Data en fecha seleccionada:', dataFecha);
        setHistory(dataFecha.recordatorios || []);
      } else {
        console.log('No existe doc para esta fecha, subcolección vacía');
        setHistory([]);
      }
    } catch (error) {
      console.error('Error obteniendo recordatorios de la fecha:', error);
      setHistory([]);
    }
  };

  // FUNCIÓN que abre el timePicker y maneja la hora seleccionada
  const openTimePicker = () => {
    setShowTimePicker(true);
  };

  // Manejo de la selección de hora en DateTimePicker
  const handleTimeChange = (event, date) => {
    setShowTimePicker(false);
    if (date) {
      // Formateamos la hora en 12h AM/PM
      const formatted = moment(date).format('hh:mm A');
      setSelectedTime(formatted);
    }
  };

  const handleAddPress = async () => {
    if (!inputText) return;

    if (!userDocId) {
      console.log('No se tiene docID del usuario; no se puede guardar en Firestore.');
      if (editingIndex !== null) {
        const updatedHistory = [...history];
        updatedHistory[editingIndex] = { date: selectedDate, text: inputText };
        setHistory(updatedHistory);
        setEditingIndex(null);
      } else {
        setHistory([...history, { date: selectedDate, text: inputText }]);
      }
      setInputText('');
      setSelectedTime('');
      setModalVisible(false);
      return;
    }

    try {
      const fechaDocRef = doc(db, 'usuarios', userDocId, 'recordatorios', selectedDate);
      const fechaSnap = await getDoc(fechaDocRef);

      if (editingIndex !== null) {
        // Editando
        const updatedHistory = [...history];
        updatedHistory[editingIndex] = { 
          date: selectedDate, 
          text: inputText,
          time: selectedTime 
        };
        setHistory(updatedHistory);

        await updateDoc(fechaDocRef, { recordatorios: updatedHistory });
        setEditingIndex(null);

      } else {
        // Nuevo recordatorio
        if (fechaSnap.exists()) {
          const dataFecha = fechaSnap.data();
          const oldArray = dataFecha.recordatorios || [];
          const newArray = [
            ...oldArray, 
            {
              date: selectedDate, 
              text: inputText,
              time: selectedTime
            }
          ];
          await updateDoc(fechaDocRef, { recordatorios: newArray });
          setHistory(newArray);
        } else {
          // Crear el doc con un array
          const newArray = [{
            date: selectedDate,
            text: inputText,
            time: selectedTime
          }];
          await setDoc(fechaDocRef, { recordatorios: newArray });
          setHistory(newArray);
        }
      }

    } catch (error) {
      console.error('Error al guardar/editar el recordatorio en Firestore:', error);
    }

    setInputText('');
    setSelectedTime('');
    setModalVisible(false);
  };

  const handleEditPress = (index) => {
    setEditingIndex(index);
    setInputText(history[index].text);
    setSelectedTime(history[index].time || '');
    setModalVisible(true);
  };

  const handleDeletePress = async (index) => {
    const recordToDelete = history[index];
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    setSelectedHistoryIndex(null);

    if (!userDocId) return; 

    try {
      const fechaDocRef = doc(db, 'usuarios', userDocId, 'recordatorios', recordToDelete.date);
      await updateDoc(fechaDocRef, { recordatorios: updatedHistory });
      console.log('Recordatorio eliminado de la fecha:', recordToDelete.date);
    } catch (error) {
      console.error('Error al eliminar el recordatorio:', error);
    }
  };

  const handleSelectHistoryItem = (index) => {
    setSelectedHistoryIndex(index === selectedHistoryIndex ? null : index);
  };

  return (
    <ImageBackground source={require('../img/background_image.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleMonthChange(-1)} style={styles.arrowButton}>
            <Text style={styles.arrow}>{'<'}</Text>
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Histórico</Text>
            <Text style={styles.headerMonth}>{moment(currentMonth).format('MMMM, YYYY')}</Text>
          </View>
          <TouchableOpacity onPress={() => handleMonthChange(1)} style={styles.arrowButton}>
            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.calendarContainer}>
          <Calendar
            key={key} 
            current={currentMonth}
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: '#00adf5' },
            }}
            theme={{
              backgroundColor: '#333333',
              calendarBackground: '#333333',
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

        <ScrollView style={styles.historyContainer} contentContainerStyle={{ paddingBottom: 150 }}>
          {history.filter(item => item.date === selectedDate).map((item, index) => (
            <HistoryItem
              key={index}
              date={item.date}
              text={item.time ? `${item.text} - ${item.time}` : item.text}
              onEdit={() => handleEditPress(index)}
              onDelete={() => handleDeletePress(index)}
              isSelected={selectedHistoryIndex === index}
              onSelect={() => handleSelectHistoryItem(index)}
            />
          ))}
          {history.filter(item => item.date === selectedDate).length === 0 && (
            <HistoryItem date={selectedDate} text="Actualizar información del cuerpo" />
          )}
        </ScrollView>

        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>Regresar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setEditingIndex(null);
            setInputText('');
            setSelectedTime('');
            setModalVisible(true);
          }} style={styles.addButton}>
            <Text style={styles.addButtonIcon}>+</Text>
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{editingIndex !== null ? 'Modificar Recordatorio' : 'Nuevo Recordatorio'}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { height: 80, width: '95%', backgroundColor: '#f5f5f5', borderRadius: 15, textAlignVertical: 'top' }]}
                placeholder="Agregar información"
                placeholderTextColor="#999"
                value={inputText}
                onChangeText={setInputText}
                multiline={true}
              />
            </View>

            {/* Campo para seleccionar la hora en formato 12h (ej. 07:30 AM) */}
            <View style={styles.inputContainer}>
              <TouchableOpacity 
                style={[styles.input, { height: 50, width: '95%', backgroundColor: '#f5f5f5', borderRadius: 15, justifyContent: 'center' }]}
                onPress={openTimePicker}
              >
                <Text style={{ color: '#000', marginLeft: 10 }}>
                  {selectedTime ? selectedTime : 'Hora (ej. 07:30 AM)'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* DateTimePicker para la hora (solo se muestra cuando showTimePicker = true) */}
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={false}
                onChange={handleTimeChange}
              />
            )}

            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddPress} style={styles.saveButton}>
                <Text style={styles.buttonText}>{editingIndex !== null ? 'Guardar Cambios' : 'Guardar'}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

// =============================================
//       ESTILOS (NO ELIMINAR NI MODIFICAR)
// =============================================
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 30
  },
  arrowButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  arrow: {
    color: '#fff',
    fontSize: 18,
  },
  headerTextContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerMonth: {
    color: '#fff',
    fontSize: 16,
    marginTop: 4,
  },
  calendarContainer: {
    marginVertical: 10,
    backgroundColor: '#333333', // Gris oscuro
    borderRadius: 15,
    padding: 10,
  },
  historyTitle: {
    color: '#fff',
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyContainer: {
    flex: 1,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedHistoryItem: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  historyDate: {
    marginRight: 10,
    alignItems: 'center',
  },
  historyDay: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  historyMonth: {
    fontSize: 14,
    color: '#888',
  },
  historyText: {
    flex: 1,
    fontSize: 16,
  },
  floatingButtonsContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 5,
    marginRight: 5
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  buttonText: {
    color: 'white',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10
  },
  backButton: {
    backgroundColor: 'gray',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonIcon: {
    color: '#fff',
    fontSize: 24,
    marginRight: 5
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  cancelButton: {
    backgroundColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10
  },
  saveButton: {
    backgroundColor: '#28a745',
    borderRadius: 5,
    padding: 10,
  },
});

export default Calendario;
