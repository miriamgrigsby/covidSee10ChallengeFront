import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { StyleSheet } from 'react-native';
import Home from './Components/Home'
import MainPage from './Components/MainPage';
import LandingPage from './Components/LandingPage';
import SignUp from './Components/SignUp';
import CompleteChallengeModal from './Components/CompleteChallengeModal';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Landing' headerMode='none'>
          <Stack.Screen
            name="Landing"
            component={LandingPage}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Main Page"
            component={MainPage}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
          />
          <Stack.Screen
            name="MyModal"
            component={CompleteChallengeModal}
          >
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}







