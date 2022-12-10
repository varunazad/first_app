import React, { Component,useEffect, useState, useRef } from 'react';
import { View, Picker,Text, StyleSheet, FlatList, Image,TouchableOpacity ,useColorScheme } from 'react-native';
import { Appbar,RadioButton,Drawer,DefaultTheme,Button, Provider as PaperProvider,DataTable,Title,Card,ActivityIndicator, Colors} from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
const urlImage = 'https://www.mypathsala.co.in/assets/';
import { useTheme } from '@react-navigation/native';
import { Alert } from 'react-native';
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
    //console.warn('props-data-'+props.route.class_id);
    //const pData = this.props.useRoute();
    //this.params = this.props.navigation.state.params;

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
      attendaceState:[],
      class:'',
      section:'',
      class_display:'',
      editableComparatorIndexes:[],
      timestamp:'',
      
    };
    
  }

  
  async componentDidMount() {
    const class_id =await AsyncStorage.getItem('selected_class');
    const section_id =await AsyncStorage.getItem('selected_section');
    const class_name=await AsyncStorage.getItem('selected_class_name');
    const section_name=await AsyncStorage.getItem('selected_section_name');
    const class_display=class_name+'-'+section_name;
    this.setState({class:class_id });
    this.setState({section: section_id});
    this.setState({class_display: class_display});

    this.getAttendanceInfo();
    window.location.reload();
    //const route = useRoute();
    //const { route } = this.props;
   // console_log('params_data-'+route);
    //console.log('params-'+this.props.class_id);
    // /* 2. Get the param */
    // const { text,receivedValue } = route.params;

  }
  

  getAttendanceInfo = async() => {
    try{  
      const authenticate= await AsyncStorage.getItem('token');
      const user_type= await AsyncStorage.getItem('login_type');
      const school_id= await AsyncStorage.getItem('school_id');
      const class_id=this.state.class;
      // const class_id =await AsyncStorage.getItem('selected_class');
      // const section_id =await AsyncStorage.getItem('selected_section');
      // const class_name=await AsyncStorage.getItem('selected_class_name');
      // const section_name=await AsyncStorage.getItem('selected_section_name');
      // const class_display=class_name+'-'+section_name;
      // this.setState({class:class_name });
      // this.setState({section: section_name});
      // this.setState({class_display: class_display});
      const att_date=await AsyncStorage.getItem('att_date');
      console.warn('class_id-'+this.state.class);
      console.warn('section_id-'+this.state.section);
      console.warn('school_id-'+school_id);
      console.warn('date--'+att_date);
      console.warn('user_type-'+user_type);
      console.warn('authenticate-'+authenticate);
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
            "class_id":this.state.class,
            "section_id":this.state.section,
            "date":att_date,
            "user_type": user_type,
            "authenticate":authenticate
          })
        });
        let json = await response.json();
        //console.log('respose-data'+json);
        this.setState({loading:false});
        if(json.status=='success'){
          this.setState({data: json.result});
          this.setState({attendaceState:json.attendanceData});
          this.setState({timestamp:json.timestamp});
        //console.log(json.result);
        }else{
          alert('something error');
          // r

        }
      }catch(error){
        alert(error);
      }

      
    
  }
  checkAttendance(rawObj,object,index){
    var i;
    const attData=this.state.data;
    const indexAtt2 = attData.findIndex(x => x.attendance_id == object.attendance_id);
    console.log('attendance-data-'+attData[indexAtt2].attendance_id);
    this.state.data[indexAtt2].status = rawObj.value;
    this.forceUpdate()

    const attendaceState=this.state.attendaceState;
    const indexAtt = attendaceState.findIndex(x => x.attendance_id == object.attendance_id);
    attendaceState[indexAtt]
    this.state.attendaceState[indexAtt].status = rawObj.value;
    this.forceUpdate()

    //console.log('radio button checked-'+rawObj.value+' attendanceId-'+object.attendance_id+'-at-'+attendaceState[indexAtt].attendance_id);
    rawObj.isChecked = "checked";
    this.setState({ refresh: true });
        
    //console.log(this.state.attendaceState);
  }

  handleClick = async() => {
    try {
      const authenticate= await AsyncStorage.getItem('token');
      const user_type= await AsyncStorage.getItem('login_type');
      const school_id= await AsyncStorage.getItem('school_id');
      const class_id =await AsyncStorage.getItem('selected_class');
      const section_id =await AsyncStorage.getItem('selected_section');
      const updateAttendance=this.state.attendaceState;
      const time_stamp= this.state.timestamp;
      // console.log({
      //   "school_id":school_id,
      //   "class_id":class_id,
      //   "section_id":section_id,
      //   "user_type": user_type,
      //   "school_id":school_id,
      //   "authenticate":authenticate,
      //   "timestamp":time_stamp,
      //   "updateAttendance":updateAttendance,
        
      // });
      //console.log('timestamp-'+updateAttendance[0].status);
      const response= await fetch('https://mypathsala.co.in/index.php/mobile/attendance_update',
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
            "user_type": user_type,
            "school_id":school_id,
            "authenticate":authenticate,
            "timestamp":time_stamp,
            "updateAttendance":updateAttendance,
            
          })
        });
        let json = await response.json();
        
        if(json.status=='success'){
          alert('Attendance Captured');
          //console.log('new-data-'+json);
        }else{
          alert('something error');
          // r

        }
      } catch (error) {
        console.log('error:', error);
      }
      
    
  }
  render() {
    
    // const { navigation } = this.props;  
    //     const class_id = navigation.getParam('class_id', 'NO-User');  
    //     const section_id = navigation.getParam('section_id', 'some default value');  

    const renderItem = ({item,index}) => (
    
        
            
          <View style={{flexDirection:"row",alignItems:'center'}}>
            <View style={{flex:3}}>
              <Text style={styles.text}>{item.name} -{item.attendance_id}</Text>
            </View>
            {item.statusRaw.map((attdRawObj, i) =>
              <View key={i} style={{flex:1,backgroundColor:'lightgrey'}}>
                <RadioButton name={item.attendance_id} value={attdRawObj.value} status={(i==item.status)?'checked':'unchecked'} onPress={() => this.checkAttendance(attdRawObj,item,i)} />
                <Text style={{ fontSize: 10, paddingLeft: 10 }}>{attdRawObj.label+'-'+i+'-'+item.status}</Text>
              </View>
            )}
                        
          </View>
       
      
        
        
    
     
    );
    const { data } = this.state.data;
    const {class_name} =this.state.class;
    const {section_name} = this.state.section;
    const {class_display}=class_name+'-'+section_name
  
    return (
      
      <PaperProvider theme={theme}>
          <Appbar.Header>
            <Appbar.Content title={this.state.class_display} subtitle='' />
            
          </Appbar.Header>
       {this.state.loading === true &&
          <View style={styles.myloader}>
            <Text>Please wait...</Text>
          </View>
        }
      
        <FlatList
        contentContainerStyle={{ paddingBottom: 60}}
          style={{ flex: 1, fontSize: 12,marginTop:5,marginRight:10 }}
          data={this.state.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />

        <Button icon="camera" mode="contained" onPress={this.handleClick}>
            Capture Attendance
          </Button>
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
    padding: 12,
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
    color: "#0a3d18",
    
  },
  pickerStyle: {
    width: "100%",
    height: 40,
    color: "#0a3d18",
    fontSize: 14,
    fontFamily: "Roboto-Regular"
  },
  textStyle: {
    fontSize: 12,
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