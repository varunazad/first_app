import React, { Component,useEffect, useState, useRef } from 'react';
import { View, Picker,Text, StyleSheet, FlatList, Image,Button,TouchableOpacity ,useColorScheme } from 'react-native';
import { RadioButton,Drawer,DefaultTheme, Provider as PaperProvider,DataTable,Title,Card,ActivityIndicator, Colors} from 'react-native-paper';
import 
  SegmentedControlTab 
from 'react-native-segmented-control-tab';

import AsyncStorage from '@react-native-community/async-storage';
const urlImage = 'https://www.mypathsala.co.in/assets/';
import { useTheme } from '@react-navigation/native';
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};
export default class AttandenceScreen extends Component {
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
      loading: false, 
      selectedIndex:0,
      checked: 0,
      selectedSection:"Select Section",
      attendaceState:[]
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
    this.setState({loading:true});
    const response= await fetch('https://mypathsala.co.in/index.php/mobile/get_attendance',
       {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "school_id":school_id,
          "class_id":class_id,
          "section_id":section_id,
          "date":"02",
          "month":"12",
          "year":"2021",
          "user_type": user_type,
          "school_id":school_id,
          "authenticate":authenticate
        })
      });
      let json = await response.json();
      this.setState({loading:false});
      if(json.status=='success'){
        this.setState({data: json.result});
        this.setState({attendaceState:json.attendanceData});
       //console.log(json.result);
      }else{
        alert('something error');
        // r

      }

      
    
  }
  checkAttendance(rawObj,object){
    var i;
    // let autocheck=object.status;
    // object.statusRaw[autocheck].isChecked = 'unchecked';
  
    for (i = 0; i < object.statusRaw.length; i++) {
      if (object.statusRaw[i].isChecked === 'checked') {
        object.statusRaw[i].isChecked = 'unchecked';
      }
    }
    const attendaceState=this.state.attendaceState;
    //const indexAtt = attend.findIndex(x => x.attendance_id == object.attendance_id);
    //console.log('attendIndex-'+indexAtt);
    let newMarkers = attendaceState.map(el => (
      el.attendance_id==object.attendance_id? {...el, key: rawObj.value}: el
    ))
    this.setState({attendaceState: newMarkers });
    // let attendaceState = [ ...this.state.attendaceState ];
    // attendaceState[indexAtt] = {...attendaceState[indexAtt], status: rawObj.value};
    // this.setState({ attendaceState });
   
    const attend2=this.state.attendaceState;
   
    console.log('radio button checked-'+rawObj.value+' attendanceId-'+object.attendance_id);
    rawObj.isChecked = "checked";
    this.setState({ refresh: true });
    //console.log(attend2);
  }
  render() {
    
    const renderItem = ({item,index}) => (
      <Card >
        <Card>
          <View style={{flexDirection:"row",alignItems:'center'}}>
            <View style={{flex:3}}>
              <Text style={styles.text}>{item.name} -{item.attendance_id}</Text>
            </View>
            {item.statusRaw.map((attdRawObj, i) =>
              <View key={i} style={{flex:1,backgroundColor:'lightgrey'}}>
                <RadioButton name={item.attendance_id} value={attdRawObj.value} status={attdRawObj.isChecked} onPress={() => this.checkAttendance(attdRawObj,item)} />
                <Text style={{ fontSize: 20, paddingLeft: 10 }}>{attdRawObj.label}</Text>
              </View>
            )}
                        
          </View>
       
        </Card>
        
        
      </Card>
     
    );
    const { data } = this.state.data;
    return (
      
      <PaperProvider theme={theme}>
       {this.state.loading === true &&
          <View style={styles.myloader}>
            <Text>Please wait...</Text>
          </View>
        }
      <View style={styles.viewStyle}>
        
        <View style={{ flex: 1, fontSize: 14 }}>
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
         <View style={{ flex: 0.8 }}>
           
          <Button
              
              title="Click"
              color="#841584"
              onPress={this.handleClick}
          />
         
        </View>
      </View>
      <FlatList
        style={{ flex: 1, fontSize: 14,marginTop:5,marginTop:15,top:45 }}
        data={this.state.data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      </PaperProvider>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
  
  myloader: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    backgroundColor: "#ffffff",
    opacity: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%"
},
  text: {
    backgroundColor:'lightgrey',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex:0.5,
    flexDirection: "row",
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
    alignItems: "center",
    position:"absolute",
    top:10,
    zIndex:100
  },
  itemStyle: {
    fontSize: 10,
    fontFamily: "Roboto-Regular",
    color: "#007aff",
    
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
  },
  tabStyle: {
    borderColor: '#D52C43',
  },
  activeTabStyle: {
    backgroundColor: '#057594',
  },
});