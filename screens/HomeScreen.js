import React, { Component,useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const urlImage = 'https://www.mypathsala.co.in/assets/';
import { useTheme } from '@react-navigation/native';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading:false,
    };
     
  }

  componentDidMount() {
    this.getListDashboard();
    
  }
  
  getListDashboard = async () => {
    try {
      this.setState({loading:true});
      let user_login_type= await AsyncStorage.getItem('login_type');
      const response= await fetch('https://mypathsala.co.in/index.php/LoginMobile/getdashboardList', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user_type: user_login_type,
        })
      });
      let json = await response.json();
      this.setState({loading:false});
      if(json.status=='success'){
        this.setState({
          data: json.results
        })
        //console.log(json.results);
        //console.log({user_login_type});
      }else{

        this.setState({
          data: []
        })

      }
    } catch (error) {
      //console.log('error:', error);
    }
  }
   
 
  renderItem = ({item,index}) => {

    const imgLink=urlImage+item.image;
    return <View key={index} style={styles.item}>
      <TouchableOpacity  onPress={() => this.props.navigation.navigate(item.linked_page)}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: imgLink }}
          
        />
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={styles.container}>
         {this.state.loading === true &&
          <View style={styles.myloader}>
            <Text>Please wait...</Text>
          </View>
        }
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
})