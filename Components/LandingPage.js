import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

console.disableYellowBox = true;
class LandingPage extends Component {

    render() {

        return (
            <ImageBackground
                style={styles.background}
                source={require("../landingBackground.png")}
                    
            >
                <View style={styles.container}>
                    <TouchableOpacity style={styles.signUpButton} onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.signUpText}>Start Training</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end"
    },
    signUpButton: {
        minHeight: "15%",
        minWidth: "55%",
        borderWidth: 1,
        flex: 1,
        backgroundColor: "black",
        marginBottom: "20%",
        // alignSelf: "center",
        opacity: 0.8
    },
    signUpText: {
        textAlign: "center",
        fontSize: 40,
        color: "white",
        marginTop: "4%", 
        fontWeight: "bold"
    },
    background: {
        width: '102%',
        height: '100%',
        opacity: 0.8,
    }
});

export default LandingPage
