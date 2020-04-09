import React, { useEffect } from 'react'
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View, Image} from 'react-native';
import { TouchableOpacity, TextInput, ScrollView, Form } from 'react-native-gesture-handler';
import axios from 'axios'

const NewChallenge = ({ navigation }) => {

    const addNewChallenge = (data) => {
        axios.post('https://covid-see10.herokuapp.com/api/challenges/', { daily: true, title: data.title, workout_type: data.workout_type, reps: data.reps, sport: data.sport, points: data.points })
      
    }


    const { register, handleSubmit, setValue} = useForm()

    useEffect(() => {
        register('title')
        register('workout_type')
        register('reps')
        register('sport')
        register('points')
    }, [register])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerDiv}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.toggleDrawer()}>
                        <Image style={styles.covidIcon}
                            source={require('../images/covidIcon.png')}
                            resizeMode="contain"
                        >
                        </Image>
                    </TouchableOpacity >
                    <Text style={styles.headerText}>Create Your Own Challenge</Text>
                </View>
                <View style={styles.bottomDiv}>
                    <Text style={styles.text}>Title</Text>
                    <TextInput
                        editable style={styles.inputs}
                        defaultValue={""}
                        onChangeText={text => {
                            setValue('title', text)
                        }}></TextInput>
                    <Text style={styles.text}>Workout Type</Text>
                    <TextInput
                        editable style={styles.inputs}
                        defaultValue={""}
                        onChangeText={text => {
                            setValue('workout_type', text)
                        }}></TextInput>
                    <Text style={styles.text}>Reps</Text>
                    <TextInput
                        editable style={styles.inputs}
                        defaultValue={""}
                        onChangeText={text => {
                            setValue('reps', text)
                        }}></TextInput>
                    <Text style={styles.text}>Sport</Text>
                    <TextInput
                        editable style={styles.inputs}
                        defaultValue={""}
                        onChangeText={text => {
                            setValue('sport', text)
                        }}></TextInput>
                    <Text style={styles.text}>Points</Text>
                    <TextInput
                        editable style={styles.inputs}
                        defaultValue={""}
                        onChangeText={text => {
                            setValue('points', text)
                        }}></TextInput>
                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={handleSubmit(addNewChallenge)}
                    >
                        <Text style={styles.inputs2} >Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxWidth: "100%",
        minHeight: "100%",
        borderTopWidth: 4,
        backgroundColor: "black",
        opacity: 0.8,
        marginBottom: "60%"
    },
    headerDiv: {
        flex: 1,
        flexDirection: "row",
        maxWidth: "100%",
        maxHeight: "15%",
        padding: ".75%",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: "5%"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: "2%",
    },
    bottomDiv: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
        width: "100%",
    },
    backButton: {
        height: "100%",
        width: "30%",
        justifyContent: "center",
        alignItems: "center"
    },
    covidIcon: {
        height: "100%",
        minWidth: "10%",
    },
    headerText: {
        marginLeft: "-42%",
        fontSize: 25,
        textDecorationLine: "underline",

    },
    inputs: {
        fontSize: 18,
        borderWidth: 6,
        borderColor: "black",
        minHeight: "8%",
        width: "80%",
        textAlign: "center",
        backgroundColor: "#800020"
    },
    updateButton: {
        marginTop: "3%",
        borderWidth: 2,
        minWidth: "30%",
        minHeight: "12%",
        alignItems: "center",
        justifyContent: "center"
    },
    inputs2: {
        fontSize: 25,
        fontWeight: "bold"
    }
})

export default NewChallenge

