import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import Constants from 'expo-constants';

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
            .then(async () => { await AsyncStorage.getItem('token') ? loginRedirect() : alert("Authentication Failed\nPlease Try Again") })
            .catch(error => {
                alert("Authentication Failed\nPlease Try Again")
            })
    }

    const loginRedirect = async () => {
        const token = await AsyncStorage.getItem('token')

        axios.get('https://covid-see10.herokuapp.com/api/authuserprofiles/', { headers: { 'Authorization': `Token ${token}` } })
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

    return (
        <ImageBackground
            style={styles.background}
            source={require("../images/homeBackgroundd.jpg")}

        >
            <ScrollView style={styles.container} contentContainerStyle={{
                alignItems: 'center'
            }}>
                <Text style={styles.welcome}>Welcome to the Covid-See10 Challenge</Text>
                <TextInput
                    editable style={styles.username}
                    placeholder="Username"
                    onChangeText={text => { setValue('username', text) }}>
                </TextInput>
                <TextInput
                    editable style={styles.password}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => { setValue('password', text) }}>
                </TextInput>
                <View style={styles.authButtons}>
                    <TouchableOpacity
                        style={styles.signUpButton}
                        onPress={() => props.navigation.navigate("Sign Up")} >
                        <Text style={styles.signUpText}>Sign-Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={handleSubmit(signUp)}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
        minHeight: "100%",
        
        paddingTop: "15%",
    },
    authButtons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        minHeight: 90,
        marginTop: "5%",
        // backgroundColor: "blue"
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: "underline",
        fontWeight: "bold",
        marginBottom: "10%"
    },
    username: {
        width: "70%",
        height: 50,
        borderWidth: 1,
        textAlign: "center",
        // marginBottom: "4%",
        backgroundColor: "black",
        color: "white",
        margin: "2%"
    },
    password: {
        width: "70%",
        height: 50,
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        alignSelf: "center",
        margin: "2%"

    },
    loginButton: {
        maxHeight: 60,
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
        maxHeight: 60,
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
        color: "white",
        justifyContent: 'center'
    },
    background: {
        width: '100%',
        height: '110%',
        opacity: 0.8
    }
});

export default Home
