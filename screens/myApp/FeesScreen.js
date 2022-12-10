import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const FeesScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Fees Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default FeesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
