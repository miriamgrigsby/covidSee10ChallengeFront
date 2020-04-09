import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'

const DailyChallenge = ({ navigation }) => {

    const [dailyChallenge, setDailyChallenge] = React.useState({})
    const [token, setToken] = React.useState("")
    const [userId, setUserId] = React.useState("")
    const [challengeShowing, setChallengeView] = React.useState(true)

    useEffect(() => {
        AsyncStorage.multiGet(['userId', 'token'], (err, stores) => {
            setUserId(stores[0][1])
            setToken(stores[1][1])
        })

        const saveDaily = async () => {
            const dailyChallengeVar = await AsyncStorage.getItem('dailyChallenge')
            setDailyChallenge(JSON.parse(dailyChallengeVar))
        }
        saveDaily()
    }, [])

    const addChallenge = () => {
        axios.post('https://covid-see10.herokuapp.com/api/authuserchallenges/', { user: userId, challenge: dailyChallenge.id }, { headers: { 'Authorization': `Token ${token}` } })
            .then(async (response) => {
                const allChallengesArray = await AsyncStorage.getItem("allUsersChallenges")
                const parsedArray = JSON.parse(allChallengesArray)
                const storage = [...parsedArray, response.data]
                await AsyncStorage.setItem('allUsersChallenges', JSON.stringify(storage))
                await AsyncStorage.setItem('needsAnUpdate', 'true')
            })
            .then(alert(`You've Successfully joined the ${dailyChallenge.title} Challenge! Check Your Challenges to see a list of all the challenges you've joined!`))
            .then(() => setChallengeView(false))
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerDiv}>
                <ImageBackground
                    style={styles.background}
                    source={require("../images/mainPageBackground.jpg")}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={() => navigation.toggleDrawer()}
                    >
                        <Image style={styles.covidIcon}
                            source={require('../images/covidIcon.png')}
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
                    {
                        challengeShowing
                            ?
                            <TouchableOpacity style={styles.addButton}
                                onPress={addChallenge}
                            >
                                <Image style={styles.plusIcon}
                                    source={require('../images/plusIcon.png')}
                                    resizeMode="cover"
                                >
                                </Image>
                            </TouchableOpacity >
                            : null
                    }
                    <TouchableOpacity style={styles.shareButton}
                    >
                        <Image style={styles.shareIcon}
                            source={require('../images/shareIcon.png')}
                            resizeMode="cover"
                        >
                        </Image>
                    </TouchableOpacity >
                </View>
            </View>
            <View style={styles.footer}>
                <ImageBackground
                    style={styles.background}
                    source={require("../images/mainPageBackground.jpg")}>
                </ImageBackground>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
        paddingTop: "2%",
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
    },
    backButton: {
        height: "95%",
        marginTop: "5%"
    },
    leftDiv: {
        flex: 1,
        flexDirection: "column",
        width: "75%",
        height: "100%",
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