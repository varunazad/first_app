import React from "react";
import {View, Text,StyleSheet, SafeAreaView,TextInput,TouchableHighlight} from "react-native";
import {connect} from "react-redux"
class TeacherScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name:"",
      email:"",
      password:"",
      mobile:"",
      designation:"",

    }
  }
  render(){
    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
      <Text style={styles.mainTextStyle}>Submit Teacher Details</Text>
      <Text style={styles.textStyle}>Teacher Name</Text>
      <TextInput
      style={styles.textInputStyle}
      underlineColorAndroid="transparent"
      placeholderTextColor="#cccccc"
      placeholder="Teacher Name"
      onChangeText={name => {
      this.setState({ name: name }, () => {
      });
      }}
      />
      <Text style={styles.textStyle}>Enter Email</Text>
      <TextInput
      style={styles.textInputStyle}
      underlineColorAndroid="transparent"
      placeholderTextColor="#cccccc"
      placeholder="Enter Email"
      onChangeText={email => {
      this.setState({ email: email }, () => {
      });
      }}
      />
      <Text style={styles.textStyle}>Password</Text>
      <TextInput
      style={styles.textInputStyle}
      underlineColorAndroid="transparent"
      placeholderTextColor="#cccccc"
      placeholder="Password"
      onChangeText={password => {
      this.setState({ password: password }, () => {
      });
      }}
      />
      <TouchableHighlight
      underlayColor="transparent"
      style={
      styles.buttonStyle
      }
      onPress={() => {
      //Here we will call our Action
      }}
      >
      <Text style={styles.buttonTextStyle}>Submit</Text>
      </TouchableHighlight>
      </View>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
container: {
flex: 1,
width: "100%",
height:"100%",
justifyContent: 'flex-start',
alignItems: 'center',
backgroundColor:"lightgray",
//   paddingHorizontal:10,
paddingBottom:50
},
mainView:{
width:"100%",
height:"50%",
justifyContent: "flex-start",
alignItems: "center",
padding:20,
},
textInputStyle:{
width:"100%",
height:40,
backgroundColor:"white",
paddingHorizontal:15,
marginBottom:10,
marginTop:10
},
textStyle:{
width:"100%",
height:20,
//paddingHorizontal:15,
textAlign:"left",
marginTop:10,
fontSize:15
},
mainTextStyle:{
width:"100%",
height:40,
//paddingHorizontal:15,
textAlign:"center",
marginTop:10,
marginBottom:10,
fontSize:20
},
buttonStyle:{
width: "100%",
height: 40,
borderRadius: 5,
justifyContent: "center",
alignItems: "center",
backgroundColor: "white",
marginTop:20
},
buttonTextStyle:{
width:"100%",
height:"100%",
textAlign:"center",
marginTop:10,
fontSize:18
},
})
export default TeacherScreen;