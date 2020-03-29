import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

import { useForm } from "react-hook-form";

const Home = (props) => {

    useEffect(() => {
        try {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiRemove(keys)
            })
        } catch (error) {
            alert("Failed to read from storage")
        }
    }, [])

    const signUp = (data) => {
        axios.post('https://covid-see10.herokuapp.com/api/auth/login', { username: data.username, password: data.password })
        .then(response => _storeData(response.data))
        .then(async () => {await AsyncStorage.getItem('token') ? loginRedirect() : alert("Authentication Failed\nPlease Try Again")  })
        .catch(error => {
                alert("Authentication Failed\nPlease Try Again")
            })
        .then(response => axios.get('https://covid-see10.herokuapp.com/api/authuserprofiles/', {headers: {'Authorization': `Token ${response.token}`}}).then(response => _storeData2(response.data)))
    }

    const loginRedirect = async() => {
        const token =  await  AsyncStorage.getItem('token')

        axios.get('https://covid-see10.herokuapp.com/api/authuserprofiles/', {headers: {'Authorization': `Token ${token}`}})
        .then(async (response) => await _storeData2(response.data))
        .then(props.navigation.navigate('Main Page'))
              
    }

    const _storeData = async (response) => {
        try {
            await AsyncStorage.multiSet([['userId', JSON.stringify(response.user.id)], ['token', response.token], ['username', response.user.username], ['email', response.user.email], ['challenges', JSON.stringify(response.user.challenges)], ['completed', JSON.stringify(response.user.completed)], ['first_name', response.user.first_name], ['last_name', response.user.last_name]])
            return response
        } catch (error) {
        }
    };

    const _storeData2 = async (response) => {
        try {
            await AsyncStorage.multiSet([['age', JSON.stringify(response[0].age)], ['bio', response[0].bio], ['city', response[0].city], ['country', response[0].country], ['gender', JSON.stringify(response[0].gender)], ['profileId', JSON.stringify(response[0].id)], ['photo', JSON.stringify(response[0].photo)], ['points', JSON.stringify(response[0].points)]])
        } catch (error) {
        }
    }

    const { register, handleSubmit, setValue } = useForm()



    useEffect(() => {
        register('username')
        register('password')
    }, [register])




    // onPress={handleSubmit(signUp)}
        return (
            <ImageBackground
                style={styles.background}
                source={require("../homeBackgroundd.jpg")}
                    
            >
                <View style={styles.container}>
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcome}>Welcome to the Covid-See10 Challenge</Text>
                        <TextInput editable style={styles.username} placeholder="Username" onChangeText={text => { setValue('username', text) }}></TextInput>
                        <TextInput editable style={styles.password} placeholder="Password" secureTextEntry={true} onChangeText={text => { setValue('password', text) }}></TextInput>
                    </View>
                    <View style={styles.authButtons}>
                        <TouchableOpacity style={styles.signUpButton} onPress={() => props.navigation.navigate("Sign Up")} >
                            <Text style={styles.signUpText}>Sign-Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(signUp)}>
                            <Text style={styles.loginText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "whitesmoke",
        borderTopWidth: 6,
        borderColor: "black"
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        maxHeight: "65%",      
    },
    authButtons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: "1.5%"
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: "underline",
        fontWeight: "bold",
        marginBottom: "15%"
        // color: "white"
    },
    username: {
        width: "70%",
        height: "9%",
        borderWidth: 1,
        textAlign: "center",
        marginBottom: "4%",
        marginTop: "10%",
        backgroundColor: "black",
        color: "white"
    },
    password: {
        width: "70%",
        height: "14%",
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "black",
        color: "white"
    },
    loginButton: {
        maxHeight: "15%",
        minWidth: "47%",
        borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        marginLeft: "-20%",
        backgroundColor: "black",
    },
    loginText: {
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    signUpButton: {
        maxHeight: "15%",
        minWidth: "48%",
        borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        marginRight: "-20%",
        backgroundColor: "black"
    },
    signUpText: {
        textAlign: "center",
        fontSize: 20,
        color: "white"
    },
    background: {
        width: '100%',
        height: '110%',
        opacity: 0.8
    }
});

export default Home
