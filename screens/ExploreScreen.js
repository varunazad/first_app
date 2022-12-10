import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
const initialLoginState = {
  isLoading: true,
  userName: null,
  userToken: null,
};
const loginReducer = (prevState, action) => {
  switch( action.type ) {
    case 'RETRIEVE_TOKEN': 
      return {
        ...prevState,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGIN': 
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
    case 'LOGOUT': 
      return {
        ...prevState,
        userName: null,
        userToken: null,
        isLoading: false,
      };
    case 'REGISTER': 
      return {
        ...prevState,
        userName: action.id,
        userToken: action.token,
        isLoading: false,
      };
  }
};
const ExploreScreen = ({route}) => {
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  //const data=dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });

    return (
      <View style={styles.container}>
        <Text>ExploreScreen </Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});
