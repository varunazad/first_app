import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MainApp from '../../src/MainApp';
const HomeworkScreen = () => {
    return (
      <View style={styles.container}>
        <MainApp/>
      </View>
    );
};

export default HomeworkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
