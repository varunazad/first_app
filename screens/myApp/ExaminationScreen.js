import React, { Component,useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const urlImage = 'https://www.mypathsala.co.in/assets/mobile_app_images/examDashboard/';
import { useTheme } from '@react-navigation/native';

export default class ExaminationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
     
  }
  componentDidMount() {
    this.getExamList();
    
  }
  getExamList = async () => {
        try {
            const examinationScreenList = [
                {
                    title:'Exams',
                    image:urlImage+'exam2.png',
                    screen:'ExamsScreen'
                },
                {
                    title:'Paper',
                    image:urlImage+'exam_paper.png',
                    screen:'SubjectPaperScreen'
                },
                {
                    title:'Marks',
                    image:urlImage+'marks.png',
                    screen:'MarksManagmentsScreen'
                },
                {
                    title:'Admit-Card',
                    image:urlImage+'admin_card.png',
                    screen:'AdmitCardScreen'
                },
                {
                    title:'Role Number',
                    image:urlImage+'role_number.jpg',
                    screen:'RoleNumberScreen'
                },
                {
                    title:'Report-Card',
                    image:urlImage+'report_icon.jpg',
                    screen:'ReportCardScreen'
                },
                {
                    title:'Result Summary',
                    image:urlImage+'result_list.png',
                    screen:'ResultSummaryScreen'
                },
                {
                    title:'Datesheet',
                    image:urlImage+'datasheet.gif',
                    screen:'DatesheetScreen'
                },
                {
                    title:'Meritorious',
                    image:urlImage+'meritorious.png',
                    screen:'MeritoriousScreen'
                }
                 
              ];
              this.setState({
                data:  examinationScreenList 

              })

        }catch(error){

        }
   }
  renderItem = ({item,index}) => {

    const imgLink=item.image;
    return <View key={index} style={styles.item}>
      <TouchableOpacity  onPress={() => this.props.navigation.navigate(item.screen,{user_id:2,name:'varun',class_id:12})}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: imgLink }}
          
          
        />
        <Text style={styles.text}>{item.title} {}</Text>
      </TouchableOpacity>
    </View>
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          numColumns={3}
          style={styles.container}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={item => `key-${item.name}`}
        />
      </SafeAreaView>
    );
  }

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      padding:14,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      marginTop: 8,
      marginHorizontal: 5,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    image: {
      width: 100,
      height: 100
    },
    text: {
      color: 'blue',
      fontWeight:'bold',
      textAlign:'center'
    }
  })
