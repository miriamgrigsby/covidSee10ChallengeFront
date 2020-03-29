import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Image } from 'react-native';
import Home from './Components/Home'
import MainPage from './Components/MainPage';
import LandingPage from './Components/LandingPage';
import SignUp from './Components/SignUp';

const Stack = createStackNavigator();

function LogoTitle0() {
  return (
    <Image
      style={styles.navigatorImage}
      source={require('../covidSee10Challenge/landingPageBackground.jpg')}
    />
  );
}

function LogoTitle() {
  return (
    <Image
      style={styles.navigatorImage}
      source={require('../covidSee10Challenge/background.jpg')}
    />
  );
}

function LogoTitle2() {
  return (
    <Image
      style={styles.navigatorImage}
      source={require('../covidSee10Challenge/mainPageBackground.jpg')}
    />
  );
}




export default class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
            name="Main Page"
            component={MainPage}
            options={{ headerLeft: null }, { headerRight: props => <LogoTitle2 {...props} /> }}
          />
        
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerTitle: props => <LogoTitle0 {...props} /> }}

          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerLeft: null }, { headerRight: props => <LogoTitle {...props} /> }}
          />
          {/* <Stack.Screen
            name="Main Page"
            component={MainPage}
            options={{ headerLeft: null }, { headerRight: props => <LogoTitle2 {...props} /> }}
          /> */}
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            options={{ headerLeft: null }, { headerRight: props => <LogoTitle2 {...props} /> }}
          />
         

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  navigatorImage: {
    width: 420,
    height: 56,
    marginLeft: -16,
  }
})






