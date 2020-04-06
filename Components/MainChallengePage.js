import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import ChallengeFilter from './ChallengeFilter'
import { RECORDING_OPTIONS_PRESET_HIGH_QUALITY } from 'expo-av/build/Audio';

const MainChallengePage = ({ navigation }) => {

    const [challenges, setChallenges] = React.useState([])
    const [userId, setUserId] = React.useState("")
    const [search, setSearch] = React.useState("")



    useEffect(() => {
        getChallenges()
    }, [])

    const refHook = useRef(false)
    const didMountRef = useRef(false)

    const getChallenges = async () => {
        await axios.get('https://covid-see10.herokuapp.com/api/challenges/')
            .then(async (response) => {
                const dailyChallenge = response.data.find(daily => daily.daily == true)
                await AsyncStorage.multiSet([['dailyChallenge', JSON.stringify(dailyChallenge)], ['allChallenges', JSON.stringify(response.data)]])
                setChallenges(response.data)
            })
        await AsyncStorage.multiGet(['userId', 'token'], (err, stores) => {

            setUserId(stores[0][1])
            axios.get('https://covid-see10.herokuapp.com/api/authuserchallenges/', { headers: { 'Authorization': `Token ${stores[1][1]}` } })
                .then(async (response) => {
                    const x = await AsyncStorage.setItem('allUsersChallenges', JSON.stringify(response.data))
                })
        })

        await axios.get('https://covid-see10.herokuapp.com/api/userchallenges/')
            .then(async (response) => {
                const x = await AsyncStorage.setItem('everyUsersChallenges', JSON.stringify(response.data))
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

    const filterChallenges = () => 
    challenges
        .filter(challenge => {
            return challenge.workout_type.toLowerCase().includes(search.toLowerCase()) || challenge.sport.toLowerCase().includes(search.toLowerCase())
        })

    const handleChange = async (text) => {
        setSearch(text)
        filterChallenges()
    }

    return (
        <KeyboardAvoidingView
      style={styles.container}
    //   behavior="padding"
    >
        <ImageBackground
            style={styles.background}
            source={require("../mainBackground.png")}
        >
            <ScrollView contentContainerStyle={{paddingBottom: 20}}>
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
                        <View style={styles.filter}>
                            <TextInput style={styles.filterInput} onChangeText={handleChange} placeholder="Filter by type/sport">

                            </TextInput>
                            <TouchableOpacity style={styles.filterButton} onPress={() => alert("Filter by the Workout Type or Sport to Narrow down the challenges")}>
                                <Image style={styles.filterImage}
                                    source={require('../filterIcon.png')}
                                    resizeMode="cover"
                                >
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.allChallenges}>
                        <ChallengeFilter challenges={filterChallenges()}/> 
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
        </KeyboardAvoidingView>
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
    filterButton: {
        // backgroundColor: "red",
        minWidth: "12%",
        minHeight: 50,
        justifyContent: "center"
    },
    filterInput: {
        width: "85%",
        height: 60,
        borderWidth: 1,
        fontSize: 30,
        textAlign: "center"
    },
    filterImage: {
        width: "60%",
        height: "60%",
        alignSelf: "center"

    },
    topContainer: {
        flex: 1,
        flexDirection: "row",
        width: "96%",
        height: 150,
        overflow: "hidden",
        marginTop: "1%",
        flexWrap: "wrap",
        justifyContent: "center"
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
        maxHeight: 45,
        marginTop: "3%",
    },
    filter: {
        minWidth: "90%",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: 50,
        marginTop: "-3%",
        flex: 1,
        flexDirection: "row",
    },
    profile: {
        minWidth: "20%",
        maxHeight: 80,
        borderWidth: 1,
        flex: 1,
        borderColor: "transparent",
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
        maxHeight: 5000,
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