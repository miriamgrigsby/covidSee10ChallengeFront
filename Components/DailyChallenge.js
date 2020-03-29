import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage, SectionList, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

const DailyChallenge = ({ navigation }) => {

    const [dailyChallenge, setDailyChallenge] = React.useState({})

    useEffect(() => {
        
       const saveDaily = async() => {
            const dailyChallengeVar = await AsyncStorage.getItem('dailyChallenge')
                setDailyChallenge(JSON.parse(dailyChallengeVar))
        }
        saveDaily()
    }, [])



    const challenge = async () => {
        const dailyChallengeVar = await AsyncStorage.getItem('dailyChallenge')
            setDailyChallenge(JSON.parse(dailyChallengeVar))
            console.log(dailyChallenge.title)
        
    }

   
    return (
        <View style={styles.container}>
             <View style={styles.headerDiv}>
                 <ImageBackground style={styles.background} source={require("../mainPageBackground.jpg")}>
                    <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.toggleDrawer()}
                    >
                        <Image style={styles.covidIcon}
                            source={require('../covidIcon.png')}
                            resizeMode="cover"
                        >
                        </Image>
                    </TouchableOpacity >
                </ImageBackground>
            </View>
            <View style={styles.bottomDiv}> 
                <View style={styles.leftDiv}>
                   
                    <Text style={styles.title}>{dailyChallenge.title}</Text>
                    <Text style={styles.text}>Workout Type: {dailyChallenge.workout_type}</Text>
                    <Text style={styles.text2}>Sport: {dailyChallenge.sport}</Text>
                    <Text style={styles.text3}>Reps: {dailyChallenge.reps}</Text>
                    <Text style={styles.text4}>Points: {dailyChallenge.points}</Text>
                </View>
                <View style={styles.rightDiv}>
                    <TouchableOpacity style={styles.addButton}
                        // onPress={() => console.log(dailyChallenge)}
                    onPress={() => navigation.toggleDrawer()}
                    >
                        <Image style={styles.plusIcon}
                            source={require('../plusIcon.png')}
                            resizeMode="cover"
                        >
                        </Image>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.shareButton}
                        // onPress={() => console.log(dailyChallenge)}
                    onPress={() => navigation.toggleDrawer()}
                    >
                        <Image style={styles.shareIcon}
                            source={require('../shareIcon.png')}
                            resizeMode="cover"
                        >
                        </Image>
                    </TouchableOpacity >
                </View>
            </View>
            <View style={styles.footer}>
                <ImageBackground style={styles.background} source={require("../mainPageBackground.jpg")}>

                </ImageBackground>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // borderTopWidth: 4,
        // borderColor: "black",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
    },
    shareButton: {
        height: "40%",
        minWidth: "60%",
        
    },
    addButton: {
        height: "40%",
        minWidth: "50%",
    },
    text: {
        fontSize: 30,
        backgroundColor: "white",
        width: "100%",
        textAlign: "center",
        height: "15%",
        alignSelf: "center",
        paddingTop: "2%"
        
    },
    text2: {
        fontSize: 30,
        textAlign: "center",
        height: "15%",
        alignSelf: "center",
        backgroundColor: "#bbbbbb",
        width: "100%",
        paddingTop: "2%"
    },
    text3: {
        fontSize: 30,
        textAlign: "center",
        height: "15%",
        alignSelf: "center",
        backgroundColor: "#808080",
        width: "100%",
        paddingTop: "2%",
        color: "white"
    },
    text4: {
        fontSize: 30,
        textAlign: "center",
        height: "15%",
        backgroundColor: "#636363",
        width: "100%",   
        paddingTop: "2%"  ,
        color: "white"  
    },
    plusIcon: {
        maxHeight: "60%",
        maxWidth: "52%",
        alignSelf: "center",
        marginTop: "10%"
    },
    shareIcon: {
        maxHeight: "70%",
        maxWidth: "60%",
        alignSelf: "center",
    },
    title: {
        alignSelf: "center",
        fontSize: 40,
        marginBottom: "5%",
        textDecorationLine: "underline",
        color: "white"
    },
    background: {
        minWidth: '100%',
        height: '100%',
        opacity: 0.8,
        margin: 0
    },
    headerDiv: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        maxHeight: "20%",
        // padding: "2%",

    },
    bottomDiv: {
        flex: 1,
        maxHeight: "65%",
        flexDirection: "row",
        borderWidth: 4,
    },
    covidIcon: {
        maxHeight: "85%",
        maxWidth: "30%",
        // alignSelf: "center",
    },
    backButton: {
        height: "95%",
        marginTop: "5%"
        // justifyContent: "center",
    },
    leftDiv: {
        flex: 1,
        flexDirection: "column",
        width: "75%",
        height: "100%",
        // padding: "1%",
        justifyContent: "space-evenly",
        backgroundColor: "black",
        
        },
    rightDiv: {
        flex: 1,
        maxWidth: "20%",
        height: "100%",
        justifyContent: "space-evenly",
        backgroundColor: "black",
    },
    footer: {
        flex: 1,
        width: "100%",
        maxHeight: "15%",
    }
})

export default DailyChallenge