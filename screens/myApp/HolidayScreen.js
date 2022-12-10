import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HolidayScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Holiday Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default HolidayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
