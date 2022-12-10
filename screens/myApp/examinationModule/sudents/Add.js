import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Platform, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default class StudentScreen extends Component {
  static navigationOptions = 
  {
    title: 'MainActivity',
  };
  constructor(props) {
    super(props)

    this.state = {
      TextInput_Student_Name: '',
      TextInput_Student_Class: '',
      TextInput_Student_PhoneNumber: '',
      TextInput_Student_Email: '',
    }
  }


  /******************/ 
  InsertStudentRecordsToServer = () =>{
    const studentName=this.state.TextInput_Student_Name;
    const studentClass=this.state.TextInput_Student_Class;
    const studentEmail=this.state.TextInput_Student_Email;
    const studentPhone=this.state.TextInput_Student_PhoneNumber;
   
    console.log('student name-'+studentName);
  }

  GoTo_Show_StudentListActivity_Function = () =>
  {
    this.props.navigation.navigate('Second');
  }

  render() {
    return (
      <View style={styles.MainContainer}>
          <Text style={{fontSize: 20, textAlign: 'center', marginBottom: 7}}>Register Your Students</Text>
          <TextInput
              placeholder="Enter Student Name"
              onChangeText={ TextInputValue => this.setState({ TextInput_Student_Name : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Student Class"
              onChangeText={ TextInputValue => this.setState({ TextInput_Student_Class : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Student Phone Number"
              onChangeText={ TextInputValue => this.setState({ TextInput_Student_PhoneNumber : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TextInput 
              placeholder="Enter Student Email"
              onChangeText={ TextInputValue => this.setState({ TextInput_Student_Email : TextInputValue }) }
              underlineColorAndroid='transparent'
              style={styles.TextInputStyleClass}
          />
          <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.InsertStudentRecordsToServer} >
            <Text style={styles.TextStyle}> Add Students </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity = { 0.4 } style={styles.TouchableOpacityStyle} onPress={this.GoTo_Show_StudentListActivity_Function} >
            <Text style={styles.TextStyle}> Show All Students</Text>
          </TouchableOpacity>
      </View>
    );
  }
  /***************end return render **************/ 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MainContainer: {
    alignItems: 'center',
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff'
  },
  MainContainer_For_Show_StudentList_Activity: {
    flex: 1,
    paddingTop: (Platform.OS == 'ios') ? 20 : 0,
    marginLeft: 5,
    marginRight: 5
  },
  TextInputStyleClass: {
    textAlign: 'center',
    width: '90%',
    marginBottom: 7,
    height: 40,
    borderWidth: 1,
    borderColor: '#FF5722',
    borderRadius: 5,
  },
  TouchableOpacityStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 7,
    width: '90%',
    backgroundColor: '#00BCD4'
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },

  rowViewContainer: {
    fontSize: 20,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  }
});





