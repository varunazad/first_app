import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

import AdminScreen from './myApp/AdminScreen';
import StudentScreen from './myApp/StudentScreen';
import TeacherScreen from './myApp/TeacherScreen';
import AssignmentScreen from './myApp/AssignmentScreen';
import AttandenceScreen from './myApp/AttandenceScreen';
import EventsScreen from './myApp/EventsScreen';
import FeesScreen from './myApp/FeesScreen';
import HolidayScreen from './myApp/HolidayScreen';
import HomeworkScreen from './myApp/HomeworkScreen';
import NotificationScreen from './myApp/NotificationScreen';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="AdminScreen" component={AdminScreen} />
          <RootStack.Screen name="AssignmentScreen" component={AssignmentScreen} />
          <RootStack.Screen name="AttandenceScreen" component={AttandenceScreen} />
          <RootStack.Screen name="EventsScreen" component={EventsScreen} />
          <RootStack.Screen name="FeesScreen" component={FeesScreen} />
          <RootStack.Screen name="HolidayScreen" component={HolidayScreen} />
          <RootStack.Screen name="HomeworkScreen" component={HomeworkScreen} />
          <RootStack.Screen name="NotificationScreen" component={NotificationScreen} />
          <RootStack.Screen name="StudentScreen" component={StudentScreen} />
          <RootStack.Screen name="TeacherScreen" component={TeacherScreen} />
    
    </RootStack.Navigator>
    
);

export default RootStackScreen;