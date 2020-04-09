import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

const ChallengeInstance = ({ points, reps, sport, workoutType, title, id }) => {

    const workoutTypeUpper = workoutType.toUpperCase()
    const [userId, setUserId] = React.useState("")
    const [token, setToken] = React.useState("")
    const [challengeShowing, setChallengeView] = React.useState(true)

    useEffect(() => {
        AsyncStorage.multiGet(['userId', 'token'], (err, stores) => {
            setUserId(stores[0][1])
            setToken(stores[1][1])
        })
    }, [])

    const addChallenge = () => {
        axios.post('https://covid-see10.herokuapp.com/api/authuserchallenges/', { user: userId, challenge: id }, { headers: { 'Authorization': `Token ${token}` } })
            .then(async (response) => {
                const allChallengesArray = await AsyncStorage.getItem("allUsersChallenges")
                const parsedArray = JSON.parse(allChallengesArray)
                const storage = [...parsedArray, response.data]
                await AsyncStorage.setItem('allUsersChallenges', JSON.stringify(storage))
                await AsyncStorage.setItem('needsAnUpdate', 'true')

            })
            .then(alert(`You've Successfully joined the ${title} Challenge! Check Your Challenges to see a list of all the challenges you've joined!`))
            .then(() => setChallengeView(false))
    }

    return (
        <View style={styles.challengeButtonsDiv}>
            {
                challengeShowing
                    ? <>
                        <TouchableOpacity style={styles.challengeButtons1}
                        >
                            <Text style={styles.titleText}>{title}</Text>
                            <Text style={styles.workoutText}>Workout Type:   {workoutTypeUpper}</Text>
                            <View style={styles.challengeInfo}>
                                <Text style={styles.sportText}>Sport: {sport}</Text>
                                <Text style={styles.pointsText}>Points: {points}</Text>
                                <Text style={styles.pointsText}>Reps: {reps}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.addShareButtons}>
                        <TouchableOpacity
                            style={styles.challengeButtons2}
                            value={id} onPress={addChallenge}>
                            <Image
                                style={styles.plusIcon}
                                source={require('../images/plusIcon.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.challengeButtons2}
                            value={id} onPress={addChallenge}>
                            <Image
                                style={styles.plusIcon}
                                source={require('../images/shareIcon.png')}
                            >
                            </Image>
                        </TouchableOpacity>
                        </View>
                        
                    </> : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    challengeButtonsDiv: {
        flex: 1,
        minWidth: "100%",
        minHeight:85,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "3%",
        alignItems: "center",
        borderWidth: 2,
        // borderColor: "white"
    },

    addShareButtons: {
        flex: 1,
        // flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        marginTop: "4%",
    },
    plusIcon: {
        width: "68%",
        height: "65%"
    },
    challengeInfo: {
        backgroundColor: "gray",
        maxHeight: "70%",
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
        minHeight: "110%",
        flexDirection: "column",
        backgroundColor: "white",
        marginTop: "4%"
    },
    challengeButtons2: {
        minWidth: "10%",
        minHeight: "45%",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "blue"
        // marginLeft: "1%"
    },

})

export default ChallengeInstance