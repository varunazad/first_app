import React, { Component,useEffect, useState, useRef } from 'react';
import { View, Picker,Text, SafeAreaView, StyleSheet, FlatList, Image,Button,TouchableOpacity  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';
const urlImage = 'https://www.mypathsala.co.in/assets/';
import { useTheme } from '@react-navigation/native';
export default class ClassSectionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      school_id:1,
      user_type:'',
      user_id:1,
      authenticate:'',
      classes: [],
      selectedClass: "",
      sections: [],
      selectedSection:"Select Section",
    };
     
  }

  componentDidMount() {
    this.getUserInfo();
    //this.getClassList();
    
  }
  getUserInfo=async () =>{
    try {

      let authenticate= await AsyncStorage.getItem('token');
      let user_type= await AsyncStorage.getItem('login_type');
      let login_user_id= await AsyncStorage.getItem('login_user_id');
      let school_id= await AsyncStorage.getItem('school_id');
      
      this.setState({ authenticate: authenticate });
      this.setState({ user_type: user_type });
      this.setState({ user_id: login_user_id });
      this.setState({ school_id: school_id });
      const response= await fetch('https://mypathsala.co.in/index.php/mobile/get_class',
       {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_type": user_type,
          "school_id":school_id,
          "authenticate":authenticate
        })
      });
      let json = await response.json();
      //console.log(json);
      if(json.status=='success'){
        this.setState({
          classes: json.result
        })
      }else{

        // r

      }
    } catch (error) {
      //console.log('error:', error);
    }

  }
  async onValueChangeClass(value) {
    this.setState({ selectedClass: value });
    const class_id=await this.state.selectedClass;
    
    const data=this.state.classes;
    //alert(value)
    const index = data.findIndex(x => x.class_id == value);
 
    const sections=data[index].sections;
    this.setState({ sections: sections });


  }
  async onValueChangeSection(value){
    this.setState({ selectedSection: value });
  }
  handleClick = async() => {
    const user_type=this.state.user_type;
    const authenticate=this.state.authenticate;
    const school_id=this.state.school_id;;
    const class_id=await this.state.selectedClass;
    const section_id=await this.state.selectedSection;
    this.props.navigation.navigate('ProfileScreen', {
        paramKey: userName,
      })
    console.log('natvigate to attendence');
      
    
  }
  
  render() {
   
    
    const { data } = this.state.data;
    return (
        <PaperProvider>
     
     

            <View style={styles.container}>
            <Picker
                style={styles.pickerStyles}
                selectedValue={this.state.selectedClass}
                onValueChange={this.onValueChangeClass.bind(this)}>
                <Picker.Item label="Pikachu" value="pikachu" />
                <Picker.Item label="Charmander" value="charmander" />
                <Picker.Item label="Squirtle" value="Squirtle" />
            </Picker>
            </View>
                
      <View style={styles.viewStyle}>
      <View style={{ flex: 0.3 }}>
          <Text style={styles.textStyle}>Class</Text>
        </View>
        <View style={{ flex: 0.7, fontSize: 14 }}>
          <Picker
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.selectedClass}
            onValueChange={this.onValueChangeClass.bind(this)}
          >
            {this.state.classes.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.name}
                value={item.class_id}
                index={index}
              />
            ))}
          </Picker>
        </View>
         <View style={{ flex: 0.3 }}>
          <Text style={styles.textStyle}>Section</Text>
        </View>
        <View style={{ flex: 1, fontSize: 14 }}>
          <Picker
            itemStyle={styles.itemStyle}
            mode="dropdown"
            style={styles.pickerStyle}
            selectedValue={this.state.selectedSection}
            onValueChange={this.onValueChangeSection.bind(this)}
            
          >
            {this.state.sections.map((item, index) => (
              <Picker.Item
                color="#0087F0"
                label={item.name}
                value={item.section_id}
                index={index}
              />
            ))}
          </Picker>
        </View>
         <View style={{ flex: 1 }}>
           
          <Button
              
              title="Click"
              color="#841584"
              onPress={() => this.props.navigation.navigate('AttandenceScreen')}
          />
         
        </View>
      </View>
      </PaperProvider>
     
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  text: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  viewStyle: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#007aff"
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    color: "#007aff",
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  textStyle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  textStyle: {
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  button:{
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  }
});