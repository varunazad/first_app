import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { Provider as PaperProvider,DefaultTheme as PaperDefaultTheme,DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
const ReportCardScreen = () => {
    return (
      
      <PaperProvider  >
      <View style={styles.container}>
        <Text>ReportCardScreen Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
      </PaperProvider>
    );
};

export default ReportCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
