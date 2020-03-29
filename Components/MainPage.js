import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer';

import ProfilePage  from './ProfilePage'
import Assessment  from './AssessmentPage'
import NewChallenge from './NewChallenge'
import YourChallenges from './YourChallenges'
import VideosTab from './VideosTab'
import Friends from './Friends';
import LogBook from './LogBook';
import Ranking from './Ranking';

import DailyChallenge from './DailyChallenge';
import MainChallengePage from './MainChallengePage'
import Home from './Home'
import { HomeLoaded } from '../App'

const Drawer = createDrawerNavigator();

const MainPage = () => {
    
        return (
          <Drawer.Navigator   
          drawerContent={props => <CustomDrawerContent {...props} />}
          drawerStyle={{
              flex: 1,
              marginLeft: "-1%",
              maxWidth: 250,
              backgroundColor: "black",
              opacity: 0.8,
              
            }}
            drawerContentOptions={{
              activeTintColor: "white",
              activeBackgroundColor: "#9a0026",
              inactiveBackgroundColor: 'whitesmoke',
              opacity: 0.8,
            }}
            >
              <Drawer.Screen 
              name="Challenges"
              component={MainChallengePage}
              options={ { drawerIcon: ({ tintColor }) => (
                  <Image
                  source={require("../whiteCovidIcon.png")}
                  resizeMode="cover"
                  style={{ width: 35, height: 40, tintColor: tintColor }}
                      />) }}
             />    
              <Drawer.Screen name="Daily Challenge" component={DailyChallenge}  options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../fireIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 38, tintColor: tintColor }}
            />) }} />
              <Drawer.Screen name="Assessment" component={Assessment} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../assessmentIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 30, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="New Challenge" component={NewChallenge} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../newChallengeIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 35, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="Your Challenges" component={YourChallenges} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../yourChallengeIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 35, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="Videos" component={VideosTab} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../videoIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 40, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="All Users" component={Friends} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../friendsIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 35, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="DoesntMatter" component={LogBook} options={{ drawerLabel: () => <View style={{ borderBottomWidth: 1, minWidth: 215,  alignItems: "center" }}><Text style={{ fontSize: 20, }}>LogBook</Text></View>}}/>
              <Drawer.Screen name="View" component={LogBook} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../logbookIcon.png")}
              resizeMode="cover"
              style={{ width: 34, height: 32, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="Ranking" component={Ranking} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../rankingIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 40, tintColor: tintColor }}
            />) }}/>
               <Drawer.Screen name="DoesntMatter2" component={ProfilePage} options={{ drawerLabel: () => <View style={{ borderBottomWidth: 1, minWidth: 215,  alignItems: "center" }}><Text style={{ fontSize: 20, }}>Account</Text></View>}}/>
              <Drawer.Screen name="Profile" component={ProfilePage} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../profileIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 35, tintColor: tintColor }}
            />) }}/>
              <Drawer.Screen name="Logout" component={LogOut} options={{drawerIcon: ({ tintColor }) => (
            <Image
              source={require("../logoutIcon.png")}
              resizeMode="cover"
              style={{ width: 35, height: 32, tintColor: tintColor }}
            />) }}/>
          </Drawer.Navigator>
        );
}

const LogOut = ({navigation})=> {

  React.useEffect(() => {
    navigation.navigate('HomeLoaded',
    {
      screen: 'Landing'
    })
  }, [])
  return (
    <View></View>
  )
}


function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView  >
          <View style={{ flex: 80, width: 100, minHeight: 100, alignSelf: "center", marginTop: "-2%"}}>
            <Image style={{ width: "100%", height: "100%", }} source={require('../covidIcon.png')} />
        </View>
        <DrawerItem 
        label={() => <View style={{ borderBottomWidth: 1, minWidth: 215,  alignItems: "center", borderColor: "white" }}><Text style={{ fontSize: 20, color: "white" }}>Covid-See10</Text></View>}
        />        
        <DrawerItemList 
        {...props} 
        />
        
      </DrawerContentScrollView>
    );
  }

// const ChallengePage = () => {
//     return(
        
//     )
// }



const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        // borderTopWidth: 6,
        borderColor: "black",
        flexDirection: "column",
        // marginTop: "-2.75%",
        alignItems: "center", 
    },
    pop: {
        backgroundColor: "red"
    },
    topContainer: {
        flex: 1,
        // borderTopWidth: 6,
        flexDirection: "row",
        width: "96%",
        maxHeight: "15%",
        justifyContent: "space-between",
        padding: ".75%",
        overflow: "hidden",
        marginTop: "1%"
    },
    background: {
        width: '100%',
        height: '110%',
        opacity: 0.8
    },
    dailyChallengeButton: {
        minWidth: "80%",
        flex: 1,
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        backgroundColor: "red",
        // opacity: 0.7,
       
    },
    profile: {
        minWidth: "17%",
        borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        borderColor: "transparent"
    },
    hamburgerImage: {
        maxHeight: "70%",
        width: "100%",
    }, 
    allChallenges: {
        flex: 1,
        flexDirection: "column",
        width: "95%",
        borderWidth: 2,
        borderColor: "black"
    }, 
    dailyChallengeText: {
        fontSize: 25,
        textAlign: "center",
    }
});

export default MainPage
