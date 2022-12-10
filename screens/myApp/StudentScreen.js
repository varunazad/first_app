import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, TextInput, Button, Platform, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const students=[
  {
      'student_id':'1',
      'student_name':'Varun kumar',
      'student_class':'6A',
      'student_phone_number':'434343434',
      'student_email':'dsdsds@gmail.com'
  },
  {
      'student_id':'2', 
      'student_name':'Arub kumar',
      'student_class':'6A',
      'student_phone_number':'434343434',
      'student_email':'dsdsds@gmail.com'
  },
  {
      'student_id':'3',
      'student_name':'Mukesh kumar',
      'student_class':'6A',
      'student_phone_number':'434343434',
      'student_email':'dsdsds@gmail.com'
  },
  {
       'student_id':'4',
      'student_name':'Sudesh kumar',
      'student_class':'6A',
      'student_phone_number':'434343434',
      'student_email':'dsdsds@gmail.com'
  }


];
export default class StudentScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    isLoading: true
    }
}

static navigationOptions = 
{
    title: 'ShowStudentListActivity',
};

componentDidMount() {
  this.setState({
    isLoading: false,
    dataSource: {students},
  });
    
}
GetStudentIDFunction = (student_id, student_name, student_class, student_phone_number, student_email)=>{
    this.props.navigation.navigate('Third', {
    ID : student_id,
    NAME : student_name,
    CLASS : student_class,
    PHONE_NUMBER : student_phone_number,
    EMAIL : student_email
    });
}
ListViewItemSeparator = () => {
    return(
    <View
        style={{
        height: 0.5,
        width: "100%",
        backgroundColor: "#000",
        }} />
    );
}

render() {
    if (this.state.isLoading) {
    return(
        <View style={{flex: 1, paddingTop: 20}} >
        <ActivityIndicator />
        </View>
    );
    }
    const Item = ({ title }) => (
      <View style={styles.item}>
        <Text style={styles.student_id}>{title}</Text>
      </View>
    );

    const renderItem = ({ item }) => (
      <Item title={item.student_name} />
      
    );
    return(

      
    <View style={styles.MainContainer_For_Show_StudentList_Activity}>
       <FlatList
        data={students}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});





