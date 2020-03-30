import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, AsyncStorage } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import ChallengeInstance from './ChallengeInstance'

const MainChallengePage = ({ navigation }) => {

    const [challenges, setChallenges] = React.useState([])
    const [userId, setUserId] = React.useState("")

    useEffect(() => {
        getChallenges()
    }, [])

    const refHook = useRef(false)
    const didMountRef = useRef(false)

    const getChallenges = async () => {
        await axios.get('https://covid-see10.herokuapp.com/api/challenges/')
            .then(async (response) => {
                const dailyChallenge = response.data.find(daily => daily.daily == true)
                await AsyncStorage.setItem('dailyChallenge', JSON.stringify(dailyChallenge))
                setChallenges(response.data)
            })
        await AsyncStorage.multiGet(['userId', 'token'], (err, stores) => {

            setUserId(stores[0][1])
            axios.get('https://covid-see10.herokuapp.com/api/authuserchallenges/', { headers: { 'Authorization': `Token ${stores[1][1]}` } })
                .then(async (response) => {
                    const x = await AsyncStorage.setItem('allUsersChallenges', JSON.stringify(response.data))
                })
        })
    }

    useEffect(() => {
        if (didMountRef.current) {
            axios.get('https://covid-see10.herokuapp.com/api/challenges/')
                .then(response => {
                    setChallenges(response.data)
                })
        } else didMountRef.current = true
    }, [])


    const challengeCard = challenges.map(challenge => {
        return <ChallengeInstance navigation={navigation} title={challenge.title} daily={challenge.daily} id={challenge.id} key={challenge.id} points={challenge.points} reps={challenge.reps} sport={challenge.sport} workoutType={challenge.workout_type} />
    })

    return (
        <ImageBackground
            style={styles.background}
            source={require("../mainBackground.png")}
        >
            <ScrollView>
                <View style={styles.container} >
                    <View style={styles.topContainer}>
                        <TouchableOpacity
                            style={styles.profile}
                            onPress={() => navigation.toggleDrawer()}
                        >
                            <Image style={styles.hamburgerImage}
                                source={require('../hamburger.png')}
                                resizeMode="cover"
                            >
                            </Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.dailyChallengeButton}
                            onPress={() => navigation.navigate('Daily Challenge')}>
                            <Text style={styles.dailyChallengeText}>DAILY CHALLENGE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.allChallenges}>
                        {challengeCard}
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        borderColor: "black",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "5%"
    },
    pop: {
        backgroundColor: "red"
    },
    topContainer: {
        flex: 1,
        flexDirection: "row",
        width: "96%",
        maxHeight: "7%",
        justifyContent: "space-between",
        overflow: "hidden",
        marginTop: "1%",
    },
    background: {
        width: '100%',
        height: '110%',
        opacity: 0.8
    },
    dailyChallengeButton: {
        minWidth: "75%",
        flex: 1,
        borderTopStartRadius: 5,
        borderBottomStartRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        marginRight: "1%",
        justifyContent: "center",
        backgroundColor: "red",
        height: "120%",
        marginTop: "2%",
    },
    profile: {
        minWidth: "25%",
        maxHeight: "100%",
        borderWidth: 1,
        flex: 1,
        borderColor: "transparent",
        marginTop: "15%",
    },
    hamburgerImage: {
        maxHeight: "70%",
        width: "80%",
        justifyContent: "center",
        alignItems: 'center'
    },
    allChallenges: {
        flex: 1,
        width: "95%",
        height: "100%",
        borderWidth: 2,
        borderColor: "black",
        backgroundColor: "black",
        flexDirection: "column",
        padding: "1%",
        overflow: "scroll",
        marginBottom: "5%"
    },
    dailyChallengeText: {
        fontSize: 25,
        textAlign: "center",
    }
});

export default MainChallengePage