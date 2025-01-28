import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const Background = ({ children }) => {
  return (
    <ImageBackground 
      source={require('../img/background_image.jpg')}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
      },
});

export default Background;