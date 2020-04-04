import React, { useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, AsyncStorage } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

import { useForm } from "react-hook-form";

const SignUp = (props) => {

    const signUp = (data) => {
        axios.post('https://covid-see10.herokuapp.com/api/auth/register', { first_name: data.first_name, last_name: data.last_name, username: data.username, password: data.password, email: data.email })
            .then(response => _storeData(response.data))
            .then(async () => { await AsyncStorage.getItem('token') ? signupRedirect() : alert("Authentication Failed\nPlease Try Again") })
            .catch(error => {
                alert("Authentication Failed\nPlease Try Again")
            })
    }

    const signupRedirect = () => {
        alert('Welcome to the COVID-SEE10 Challenge\nPress Ok to get started!')
        props.navigation.navigate('Main Page')
    }

    const _storeData = async (response) => {
        try {
            await AsyncStorage.multiSet([['userId', JSON.stringify(response.user.id)], ['token', response.token], ['username', response.user.username], ['email', response.user.email], ['first_name', response.user.first_name], ['last_name', response.user.last_name], ['photo', ""]])
        } catch (error) {
        }
    };

    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        register('first_name')
        register('last_name')
        register('username')
        register('password')
        register('email')
    }, [register])

    return (
        <ImageBackground
            style={styles.background}
            source={require("../homeBackgroundd.jpg")}

        >
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Welcome to the Covid-See10 Challenge</Text>
                    <TextInput
                        editable style={styles.email}
                        placeholder="First Name"
                        onChangeText={text => { setValue('first_name', text) }}>
                    </TextInput>
                    <TextInput
                        editable style={styles.email}
                        placeholder="Last Name"
                        onChangeText={text => { setValue('last_name', text) }}>
                    </TextInput>
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
                    <TextInput
                        editable style={styles.email}
                        placeholder="Email"
                        onChangeText={text => { setValue('email', text) }}>
                    </TextInput>
                </View>
                <View style={styles.authButtons}>
                    <TouchableOpacity style={styles.signUpButton}
                        onPress={handleSubmit(signUp)}
                    >
                        <Text style={styles.signUpText}>Sign-Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "whitesmoke",
        borderTopWidth: 6,
        borderColor: "black",
        flexDirection: "column"
    },
    welcomeContainer: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
        minHeight: "40%",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    authButtons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
        marginTop: "1.5%",
        height: "20%",
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: "underline",
        fontWeight: "bold",
    },
    username: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        textAlign: "center",
        marginTop: "2%",
        backgroundColor: "black",
        color: "white"
    },
    password: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        marginTop: "2%",
    },
    email: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        marginTop: "2%",
    },

    signUpButton: {
        maxHeight: "40%",
        minWidth: "48%",
        borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        marginTop: "6%"
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

export default SignUp
