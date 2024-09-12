// Reaction.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Reaction = ({ icon, count, onPress }) => {
  return (
    <TouchableOpacity style={styles.reaction} onPress={onPress}>
      <Image source={icon} style={styles.icon} />
      <Text style={styles.count}>{count}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#fff', // Iconos blancos
    marginRight: 5,
  },
  count: {
    color: '#fff', // Texto blanco
  },
});

export default Reaction;
