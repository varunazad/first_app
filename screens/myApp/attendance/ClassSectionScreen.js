import React, { Component,useEffect, useState, useRef } from 'react';
import { StyleSheet,Picker, Text, View, Alert, TextInput, Button, Platform, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';
// import DatePicker from 'react-native-neat-date-picker'
import DatePicker from 'react-native-datepicker';
import { useSelector, useDispatch } from "react-redux";

// import { DatePickerModal } from 'react-native-paper-dates';
const urlImage = 'https://www.mypathsala.co.in/assets/';
const initialClassChangeState = {
  user_id:null,
  class_id: null,
  section_id: null,
  class_name: null,
  section_name:null,
};

// const classChangReducer = (prevState, action) => {
//   switch( action.type ) {
//     case 'RETRIEVE_CLASS_CHANGE': 
//       return {
//         ...prevState,
//         class_id: action.class_id,
//         section_id: action.section_id,
//         class_name: action.class_name,
//         section_name: action.section_name,
//         isLoading: false,
//       };
    
//     case 'SET_CLASS_CHANGE': 
//       return {
//         ...prevState,
//         class_id: action.class_id,
//         section_id: action.section_id,
//         class_name: action.class_name,
//         section_name: action.section_name,
//         isLoading: false,
//       };
//   }
// };
import { useTheme } from '@react-navigation/native';

export default class ClassSectionScreen extends Component {
  constructor(props) {
    super(props);
    this.navigate = this.props.navigation.navigate; 
    this.state = {
      data: [],
      school_id:1,
      user_type:'',
      user_id:1,
      loading: false, 
      authenticate:'',
      classes: [],
      selectedClass: "",
      sections: [],
      selectedSection:"Select Section",
      myDate:'09-10-2020',
      minDate:'',
      selectedClassName:'',
      selectedSectionName:''
    };
     
  }

  
  componentDidMount() {
    //const [classChangeState, dispatch] = React.useReducer(classChangReducer, initialClassChangeState);
    //this.getUserInfo();
    this.getClassList();
   //this.setDefaultData();
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    
    this.setState({
      //Setting the value of the date time
      myDate: date + '-' + month + '-' + year ,
    });

    this.setState({
      //Setting the value of the date time
      minDate: date + '-' + month + '-' + year ,
    });
    
  }
  
  getClassList=async () =>{
    try {

      let authenticate= await AsyncStorage.getItem('token');
      let user_type= await AsyncStorage.getItem('login_type');
      let login_user_id= await AsyncStorage.getItem('login_user_id');
      let school_id= await AsyncStorage.getItem('school_id');
      
      this.setState({ authenticate: authenticate });
      this.setState({ user_type: user_type });
      this.setState({ user_id: login_user_id });
      this.setState({ school_id: school_id });
      this.setState({loading:true});
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
      this.setState({loading:false});
    //console.log(json.result[0].sections[0].name);
      if(json.status=='success'){
        this.setState({classes: json.result});
        this.setState({sections:json.result[0].sections})
        //console.warn('classes-'+json.result)
        this.setState({selectedClass: json.result[0].class_id});
        this.setState({selectedSection: json.result[0].sections[0].section_id});

        this.setState({selectedClassName:json.result[0].name})
        this.setState({selectedSectionName:json.result[0].sections[0].name})
        //console.warn('selected class-'+json.result[0].class_id);
       // console.warn('selected section-'+json.result[0].sections[0].section_id);
        await  AsyncStorage.setItem('selected_class_name',json.result[0].name);
        await  AsyncStorage.setItem('selected_class',json.result[0].class_id);
        await  AsyncStorage.setItem('selected_section',json.result[0].sections[0].section_id);
        await  AsyncStorage.setItem('selected_section_name',json.result[0].sections[0].name);
        //console.log('class response-'+json.result[0].class_id);
       // dispatch({user_id:login_user_id,class_id:json.result[0].class_id,section_id:json.result[0].sections[0].section_id,class_name:json.result[0].name,section_name:json.result[0].sections[0].name});
      }else{

        // r

      }
    } catch (error) {
      //console.log('error:', error);
    }

  }
  
  async onValueChangeClass(value) {
    
    //const class_id=await this.state.selectedClass;
    
    const data=await this.state.classes;
    //alert(value)
    
    await  AsyncStorage.setItem('selected_class',value);
    
    const index = data.findIndex(x => x.class_id == value);
   
    const sectionsData=data[index].sections;
    await  AsyncStorage.setItem('selected_class_name',data[index].name);

    this.setState({ selectedClass: value });
    this.setState({ sections: sectionsData });
    this.setState({ selectedSection: sectionsData[0].section_id });
    await  AsyncStorage.setItem('selected_section',sectionsData[0].section_id);
    await  AsyncStorage.setItem('selected_section_name',sectionsData[0].name);

    this.setState({selectedClassName:data[index].name})
    this.setState({selectedSectionName:sectionsData[0].name})
    let user_id=await AsyncStorage.getItem('login_user_id');
    console.warn('selected_class-'+value);
    console.warn('selected_section-'+sectionsData[0].section_id);
   // dispatch({user_id:user_id,class_id:value,section_id:sectionsData[0].section_id,class_name:data[index].name,section_name:sectionsData[0].name});
    
  
  }
  async onValueChangeSection(value){
    this.setState({ selectedSection: value });
    const data=this.state.sections;
    const index = data.findIndex(x => x.section_id == value);
    const section=data[index].name;
    //console.log('selected class-'+data.section_id);
    await  AsyncStorage.setItem('selected_section',value);
    await  AsyncStorage.setItem('selected_section_name',section);
    let user_id=await AsyncStorage.getItem('login_user_id');
    this.setState({selectedSectionName:section})
    //dispatch({user_id:user_id,class_id:this.state.selectedClass,section_id:value,class_name:this.state.selectedClassName,section_name:section});
  }
  async setDate (dateValue) {
    
    //console.log('selected date-'+dateValue);
    this.setState({
      myDate: dateValue
    })
    await  AsyncStorage.setItem('att_date',this.state.myDate);
   
  }

  
  render() {
   
    const { data } = this.state.data;
    const {newDate}=this.state.myDate;
    const {params}=[{ 
                    'class_id': this.state.selectedClass,
                    'section_id': this.state.selectedSection, 
                    'class_name': this.state.selectedClassName,
                    'section_name': this.state.selectedSectionName, 
                
                  }];
    return (
        <PaperProvider>
              <View style={styles.MainContainer}>
              {this.state.loading === true &&
          <View style={styles.myloader}>
            <Text>Please wait...</Text>
          </View>
        }
          <Text style={{fontSize: 16,  marginBottom: 7}}>Select Class</Text>
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
                label={item.name+'-'+item.class_id}
                value={item.class_id}
                index={index}
              />
            ))}
          </Picker>
        
          <Text style={{fontSize: 16,  marginBottom: 7}}>Select Section</Text>
      
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
                label={item.name+'-'+item.section_id}
                value={item.section_id}
                index={index}
              />
            ))}
          </Picker>

          <Text style={{fontSize: 16,  marginBottom: 7}}>Date</Text>
          
          <DatePicker
          style={styles.datePickerStyle}
          date={this.state.myDate} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate={this.state.minDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(newDate) => {
            this.setDate(newDate);
          }}
        />
      
          <TouchableOpacity 
            activeOpacity = { 0.4 } 
            style={styles.TouchableOpacityStyle}
           
            onPress={() => this.navigate('AttandenceScreen', {
                    params:{
                      class_id: this.state.selectedClass,
                      section_id: this.state.selectedSection, 
                      class_name: this.state.selectedClassName,
                      section_name: this.state.selectedSectionName, 
                    }
                    
                
                  
            })}
          >
          <Text style={styles.TextStyle}> Take Attendance </Text>
          </TouchableOpacity>
          
      </View>
      </PaperProvider>
     
    );
  }

}

const styles = StyleSheet.create({
    
    MainContainer: {
      alignItems: 'center',
      flex: 1,
      paddingTop: 30,
      backgroundColor: '#fff'
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
  
    itemStyle: {
        fontSize: 10,
        fontFamily: "Roboto-Regular",
        color: "#007aff",
        width: '90%',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: '#FF5722',
        borderRadius: 5,
      },
      pickerStyle: {
        width: "70%",
        height: 80,
        padding:20,
        color: "#007aff",
        fontSize: 14,
        fontFamily: "Roboto-Regular",
        borderWidth: 5,
        borderColor: '#FF5722',
        borderRadius: 5,
      },
      title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
      },
      datePickerStyle: {
        width: 200,
        marginTop: 20,
        marginBottom:20,
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
  
  });
  