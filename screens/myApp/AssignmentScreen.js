import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AssignmentScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Assignment Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default AssignmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
