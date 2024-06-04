import React, { View, Text } from 'react-native';

const Inicio = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>GymPro</Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
};

export default Inicio;
