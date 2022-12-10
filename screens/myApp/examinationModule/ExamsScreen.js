import React, {useState} from 'react';
import {
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  List,
  Title,
  IconButton,
  Text as PaperText,
  Button as PaperButton,
  TextInput as PaperTextInput,
} from 'react-native-paper';
import {connect} from "react-redux"
import { useTheme } from '@react-navigation/native';
const examList=[
  {
    'id':'1',
    'title':'UT-I',
    'done':false
  },
  {
    'id':'2',
    'title':'UT-II',
    'done':false
  },
  {
    'id':'3',
    'title':'HALF YEARLY',
    'done':false
  },
  {
    'id':'4',
    'title':'YEARLY',
    'done':false
  },


];



const ExamsScreen = () => {
  const [task, setTask] = useState();
  const [examListData, setTaskItems] = useState();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  
  
    // Functions used by the screen components
    const createTodo = async function () {
     console.log(newTodoTitle);
      Alert.alert('Success!', 'New Exam Created! '+newTodoTitle);
    };
  
    const readTodos = async function () {
      setTaskItems({examList})
      console.log(examList);
      Alert.alert('Success!', 'try to read record!');
    };
  
    const updateTodo = async function (id,title) {
      setNewTodoTitle(title)
      Alert.alert('Success!', 'Record updated! '+id);
    };
  
    const deleteTodo = async function (id) {
      Alert.alert('Success!', 'Record deleted! '+id);
     
    };
  return (
      
    <>
    <StatusBar backgroundColor="#208AEC" />
    <SafeAreaView style={Styles.container}>
      {/* <View style={Styles.header}>
        <PaperText style={Styles.header_text_bold}>
          {'Exam Configuration'}
        </PaperText>
        
      </View> */}
      <View style={Styles.wrapper}>
        <View style={Styles.flex_between}>
          <Title>Exam List</Title>
         
          <IconButton
            icon="refresh"
            color={'#208AEC'}
            size={24}
            onPress={() => readTodos()}
          />
        </View>
        <View style={Styles.create_todo_container}>
          {/* Todo create text input */}
          <PaperTextInput
            value={newTodoTitle}
            onChangeText={text => setNewTodoTitle(text)}
            label="Exam"
            mode="outlined"
            style={Styles.create_todo_input}
          />
          {/* Todo create button */}
          <PaperButton
            onPress={() => createTodo()}
            mode="contained"
            icon="plus"
            color={'#208AEC'}
            style={Styles.create_todo_button}>
            {'Add'}
          </PaperButton>
        </View>
        <ScrollView>
          {/* Todo read results list */}
          {examList !== null &&
            examList !== undefined &&
            examList.map((exam) => (
              <List.Item
                key={exam.id}
                title={exam.title}
                titleStyle={Styles.todo_text}            
                style={Styles.todo_item}
                right={props => (
                  <>
                    {/* Todo update button */}
                    {exam.done !== true && (
                      <TouchableOpacity
                        onPress={() => updateTodo(exam.id,exam.title)}>
                        <List.Icon
                          {...props}
                          icon="eye"
                          color={'#4CAF50'}
                        />
                      </TouchableOpacity>
                    )}
                    {/* Todo delete button */}
                    <TouchableOpacity onPress={() => deleteTodo(exam.id)}>
                      <List.Icon {...props} icon="close" color={'#ef5350'} />
                    </TouchableOpacity>
                  </>
                )}
              />
            ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  </>
    );
};

export default ExamsScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#208AEC',
  },
  header_logo: {
    width: 170,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  header_text_bold: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  header_text: {
    marginTop: 3,
    color: '#fff',
    fontSize: 14,
  },
  flex_between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  create_todo_container: {
    flexDirection: 'row',
  },
  create_todo_input: {
    flex: 1,
    height: 38,
    marginBottom: 16,
    backgroundColor: '#FFF',
    fontSize: 14,
  },
  create_todo_button: {
    marginTop: 6,
    marginLeft: 15,
    height: 40,
  },
  todo_item: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
  },
  todo_text: {
    fontSize: 15,
  },
  todo_text_done: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
});
