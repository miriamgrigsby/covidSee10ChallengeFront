import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ChallengeInstance = ({daily, points, reps, sport, workoutType, title, navigation}) => {
    const workoutTypeUpper = workoutType.toUpperCase()
    return (
        <View style={styles.challengeButtonsDiv}>
            <TouchableOpacity  style={styles.challengeButtons1}  onPress={() => navigation.navigate('Daily Challenge')}>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.workoutText}>Workout Type:   {workoutTypeUpper}</Text>
                <View style={styles.challengeInfo}>
                    <Text style={styles.sportText}>Sport: {sport}</Text>
                    <Text style={styles.pointsText}>Points: {points}</Text>
                    <Text style={styles.pointsText}>Reps: {reps}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.challengeButtons2}>
                <Image style={styles.plusIcon}
                            source={require('../plusIcon.png')}
                            // resizeMode="cover"
                        >
                </Image>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    challengeButtonsDiv: {
        flex: 1,
        minWidth: "100%",
        maxHeight: "20%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "1%",
        alignItems: "center"
    },
    plusIcon: {
        width: "80%",
        height: "75%"   
    },
    challengeInfo: {
        backgroundColor: "gray",
        height: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap"
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "white",
    },
    workoutText: {
        fontSize: 15,
        textAlign: "center",
        borderWidth: 2,
        borderColor: "red"
    },
    sportText: {
        fontSize: 15,
    },
    pointsText: {
        fontSize: 15,
    },
    challengeButtons1: {
        flex: 1,
        borderWidth: 2,
        minWidth: "88%",
        maxHeight: "100%",
        flexDirection: "column",
        backgroundColor: "white"
    },
    challengeButtons2: {
        minWidth: "10%",
        height: "40%",
        alignItems: "center",
        justifyContent: "center",
        // marginTop: "50%",
        marginLeft: "1%"
    },

})

export default ChallengeInstance