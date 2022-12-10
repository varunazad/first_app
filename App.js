import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
/**************************/ 

/**************************/ 
import { createAppContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider as PaperProvider,DefaultTheme as PaperDefaultTheme,DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingsScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';

import ExaminationScreen from './screens/myApp/ExaminationScreen';
import AdminScreen from './screens/myApp/AdminScreen';
import StudentScreen from './screens/myApp/StudentScreen';
import TeacherScreen from './screens/myApp/TeacherScreen';
import AssignmentScreen from './screens/myApp/AssignmentScreen';

import ClassSectionScreen from './screens/myApp/attendance/ClassSectionScreen';
import AttandenceScreen from './screens/myApp/attendance/AttandenceScreen';

import EventsScreen from './screens/myApp/EventsScreen';
import FeesScreen from './screens/myApp/FeesScreen';
import HolidayScreen from './screens/myApp/HolidayScreen';
import HomeworkScreen from './screens/myApp/HomeworkScreen';
import NotificationScreen from './screens/myApp/NotificationScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';


const StudentStack = createStackNavigator();
const TeacherStack = createStackNavigator();

const ClassSectionStack = createStackNavigator();
const AttendanceStack = createStackNavigator();

const FeesStack = createStackNavigator();
const HomeWorkStack = createStackNavigator();
const AssignmentStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const EventsStack = createStackNavigator();
const HolidaysStack = createStackNavigator();

/********************Examination**********************/
import AdmitCardScreen from './screens/myApp/examinationModule/AdmitCardScreen';
import DatesheetScreen from './screens/myApp/examinationModule/DatesheetScreen';
import ExamsScreen from './screens/myApp/examinationModule/ExamsScreen';
import MarksManagmentsScreen from './screens/myApp/examinationModule/MarksManagmentsScreen';
import MeritoriousScreen from './screens/myApp/examinationModule/MeritoriousScreen';
import ReportCardScreen from './screens/myApp/examinationModule/ReportCardScreen';
import ResultSummaryScreen from './screens/myApp/examinationModule/ResultSummaryScreen';
import RoleNumberScreen from './screens/myApp/examinationModule/RoleNumberScreen';
import SubjectPaperScreen from './screens/myApp/examinationModule/SubjectPaperScreen';

const ExaminationStack=createStackNavigator();

const ExamAdmitCardStack=createStackNavigator();
const ExamDateSheetStack=createStackNavigator();
const ExamsStack=createStackNavigator();
const ExamMarksStack=createStackNavigator();
const ExamMeritoriousStack=createStackNavigator();
const ExamReportCardStack=createStackNavigator();
const ExamResultSummaryStack=createStackNavigator();
const ExamRoleNumberStack=createStackNavigator();
const ExamSubjectPaperStack=createStackNavigator();

/********************Examination End**************************/ 
const Drawer = createDrawerNavigator();

const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const initialClassChangeState = {
    user_id:null,
    class_id: null,
    section_id: null,
    class_name: null,
    section_name:null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

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

  const classChangReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_CLASS_CHANGE': 
        return {
          ...prevState,
          class_id: action.class_id,
          section_id: action.section_id,
          class_name: action.class_name,
          section_name: action.section_name,
          isLoading: false,
        };
      
      case 'SET_CLASS_CHANGE': 
        return {
          ...prevState,
          class_id: action.class_id,
          section_id: action.section_id,
          class_name: action.class_name,
          section_name: action.section_name,
          isLoading: false,
        };
    }
  };
  const [classChangeState, dispatchClass] = React.useReducer(classChangReducer, initialClassChangeState);

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
      dispatchClass({user_id:id,class_id:19,section_id:29,class_name:6,section_name:'A'})
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch(e) {
        console.log(e);
      }
      //console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return (
    
    <PaperProvider theme={theme}>
      
    <AuthContext.Provider value={authContext}>
    <NavigationContainer theme={theme}>
      { loginState.userToken !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          <Drawer.Screen name="ExaminationScreen" component={ExaminationStackScreen} />
          <Drawer.Screen name="AdminScreen" component={AdminScreen} />
          <Drawer.Screen name="AssignmentScreen" component={AssignmentStackScreen} />
          <Drawer.Screen name="ClassSection" component={ClassSectionStackScreen} />
          <Drawer.Screen name="AttandenceScreen" component={AttendanceStackScreen} />
          <Drawer.Screen name="EventsScreen" component={EventsStackScreen} />
          <Drawer.Screen name="FeesScreen" component={FeesStackScreen} />
          <Drawer.Screen name="HolidayScreen" component={HolidaysStackScreen} />
          <Drawer.Screen name="HomeworkScreen" component={HomeWorkStackScreen} />
          <Drawer.Screen name="NotificationScreen" component={NotificationStackScreen} />
          <Drawer.Screen name="StudentScreen" component={StudentStackScreen} />
          <Drawer.Screen name="TeacherScreen" component={TeacherStackScreen} />

          <Drawer.Screen name="AdmitCardScreen" component={ExamAdmitCardStackScreen} />
          <Drawer.Screen name="DatesheetScreen" component={ExamDateSheetStackScreen} />
          <Drawer.Screen name="ExamsScreen" component={ExamsStackScreen} />
          <Drawer.Screen name="MarksManagmentsScreen" component={ExamMarksStackScreen} />
          <Drawer.Screen name="MeritoriousScreen" component={ExamMeritoriousStackScreen} />
          <Drawer.Screen name="ReportCardScreen" component={ExamReportCardStackScreen} />
          <Drawer.Screen name="ResultSummaryScreen" component={ExamResultSummaryStackScreen} />
          <Drawer.Screen name="RoleNumberScreen" component={ExamRoleNumberStackScreen} />
          <Drawer.Screen name="SubjectPaperScreen" component={ExamSubjectPaperStackScreen} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
    </PaperProvider>
  );
}

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Dashboard',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);
const ExaminationStackScreen = ({navigation}) => (
  <ExaminationStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ExaminationStack.Screen name="Examination" component={ExaminationScreen} options={{
          title:'Examination',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </ExaminationStack.Navigator>
);
export default App;

const StudentStackScreen = ({navigation}) => (
  <StudentStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <StudentStack.Screen name="Student" component={StudentScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
  </StudentStack.Navigator>
  );

  const ClassSectionStackScreen = ({navigation}) => (
    <ClassSectionStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <ClassSectionStack.Screen name="Class Section" component={ClassSectionScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
            )
            }} />
    </ClassSectionStack.Navigator>
    );
  
  const AttendanceStackScreen = ({navigation}) => (
  <AttendanceStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <AttendanceStack.Screen name="Attendance" component={AttandenceScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
  </AttendanceStack.Navigator>
  );

  const TeacherStackScreen = ({navigation}) => (
    <TeacherStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <TeacherStack.Screen name="Teacher" component={TeacherScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </TeacherStack.Navigator>
  );

  const FeesStackScreen = ({navigation}) => (
    <FeesStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <FeesStack.Screen name="Fees" component={FeesScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </FeesStack.Navigator>
  );

  const HomeWorkStackScreen = ({navigation}) => (
    <HomeWorkStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeWorkStack.Screen name="Homework" component={HomeworkScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </HomeWorkStack.Navigator>
  );

  const AssignmentStackScreen = ({navigation}) => (
    <AssignmentStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <AssignmentStack.Screen name="Assignment" component={AssignmentScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </AssignmentStack.Navigator>
  );

  const NotificationStackScreen = ({navigation}) => (
    <NotificationStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <NotificationStack.Screen name="Notification" component={NotificationScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </NotificationStack.Navigator>
  );

  const EventsStackScreen = ({navigation}) => (
    <EventsStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <EventsStack.Screen name="Events" component={EventsScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </EventsStack.Navigator>
  );

  const HolidaysStackScreen = ({navigation}) => (
    <HolidaysStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          FooterStyle: {
            backgroundColor: '#1f65ff',
            },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HolidaysStack.Screen name="Holidays" component={HolidayScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </HolidaysStack.Navigator>
  );

  /*************Examination Stacks************************/ 

  const ExamAdmitCardStackScreen= ({navigation}) => (
        <ExamAdmitCardStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1f65ff',
            },
            FooterStyle: {
                backgroundColor: '#1f65ff',
                },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <ExamAdmitCardStack.Screen name="AdmitCard" component={AdmitCardScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
            )
            }} />
        </ExamAdmitCardStack.Navigator>
  );

  const ExamDateSheetStackScreen = ({navigation}) => (
    <ExamDateSheetStack.Navigator screenOptions={{
            headerStyle: {
            backgroundColor: '#1f65ff',
            },
            FooterStyle: {
            backgroundColor: '#1f65ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontWeight: 'bold'
            }
        }}>
            <ExamDateSheetStack.Screen name="Datesheet" component={DatesheetScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
            )
            }} />
    </ExamDateSheetStack.Navigator>
  );

  const ExamsStackScreen = ({navigation}) => (
    <ExamsStack.Navigator screenOptions={{
      headerStyle: {
      backgroundColor: '#1f65ff',
      },
      FooterStyle: {
        backgroundColor: '#1f65ff',
        },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold'
      }
    }}>
    <ExamsStack.Screen name="Exams" component={ExamsScreen} options={{
      headerLeft: () => (
          <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
      )
      }} />
    </ExamsStack.Navigator>
  );

  const ExamMarksStackScreen = ({navigation}) => (
    <ExamMarksStack.Navigator screenOptions={{
      headerStyle: {
      backgroundColor: '#1f65ff',
      },
      FooterStyle: {
        backgroundColor: '#1f65ff',
        },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold'
      }
    }}>
    <ExamMarksStack.Screen name="Marks Managments" component={MarksManagmentsScreen} options={{
    headerLeft: () => (
        <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
    )
    }} />
    </ExamMarksStack.Navigator>
  );

  const ExamMeritoriousStackScreen = ({navigation}) => (
        <ExamMeritoriousStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          FooterStyle: {
            backgroundColor: '#1f65ff',
            },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
        }}>
        <ExamMeritoriousStack.Screen name="Our Meritorious" component={MeritoriousScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
        </ExamMeritoriousStack.Navigator>
  );

  const ExamReportCardStackScreen = ({navigation}) => (
        <ExamReportCardStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          FooterStyle: {
            backgroundColor: '#1f65ff',
            },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ExamReportCardStack.Screen name="Report Card" component={ReportCardScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
    </ExamReportCardStack.Navigator>
  );

  const ExamResultSummaryStackScreen = ({navigation}) => (
        <ExamResultSummaryStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#1f65ff',
          },
          FooterStyle: {
            backgroundColor: '#1f65ff',
            },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <ExamResultSummaryStack.Screen name="Result Summary" component={ResultSummaryScreen} options={{
          headerLeft: () => (
              <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
          )
          }} />
        </ExamResultSummaryStack.Navigator>
  );

  const ExamRoleNumberStackScreen = ({navigation}) => (
      <ExamRoleNumberStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        FooterStyle: {
          backgroundColor: '#1f65ff',
          },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
      }}>
      <ExamRoleNumberStack.Screen name="Role Numbers" component={RoleNumberScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
        )
        }} />
      </ExamRoleNumberStack.Navigator>
  )
  const ExamSubjectPaperStackScreen = ({navigation}) => (
      <ExamSubjectPaperStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        FooterStyle: {
          backgroundColor: '#1f65ff',
          },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
      }}>
      <ExamSubjectPaperStack.Screen name="Subject Wise Papers" component={SubjectPaperScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-arrow-back" size={25} backgroundColor="#1f65ff" onPress={() => navigation.goBack()}></Icon.Button>
        )
        }} />
      </ExamSubjectPaperStack.Navigator>
  )


  /*************Examination Stacks End************************/ 

 

  
