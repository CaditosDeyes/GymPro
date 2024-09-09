import React from 'react';
import { View, Text, Button } from 'react-native';

const Inicio = ({ navigation }) => {
  return (
    <View>
      <Text>Inicio</Text>
      <Button
        title="Ir a Comunidad"
        onPress={() => navigation.navigate('Comunidad')}
      />
    </View>
  );
};

export default Inicio;
