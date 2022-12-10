import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Drawer,DefaultTheme, Provider as PaperProvider,DataTable,Button,Title} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const StudentScreen = () => {
  return (
    <PaperProvider theme={theme}>
      <Drawer.Item
     style={{ backgroundColor: '#64ffda' }}
     label="Studets List"
   />
          <DataTable.Header>
          <DataTable.Title sortDirection='descending' >Sr. </DataTable.Title>
          <DataTable.Title numeric>Name</DataTable.Title>
          <DataTable.Title numeric>Attendance</DataTable.Title>
          
        </DataTable.Header>
        <DataTable.Row>
        <DataTable.Cell sortDirection='descending'>1</DataTable.Cell> 
        <DataTable.Cell numeric>Mukesh</DataTable.Cell>
        <DataTable.Cell numeric>a</DataTable.Cell>
       
      </DataTable.Row>
      <DataTable.Row>
      <DataTable.Cell sortDirection='descending'>2</DataTable.Cell> 
        <DataTable.Cell numeric>Suresh</DataTable.Cell>
        <DataTable.Cell numeric>a</DataTable.Cell>
       
      </DataTable.Row>
    </PaperProvider>
  );
};

export default StudentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
