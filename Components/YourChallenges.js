import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios'
import Constants from 'expo-constants';
import nextId from 'react-id-generator'


function Item({ data, deleteItem, navigation, completeChallenge }) {
    return (


        <View style={styles.challengeButtonsDiv}>
            <TouchableOpacity style={styles.challengeButtons1}
                onPress={() => completeChallenge(data.id)}
                onLongPress={() => deleteItem(data.id, data.title)}
            >
                <Text style={styles.titleText}>{data.title}</Text>
                <Text style={styles.workoutText}>Workout Type:  {data.workout_type} </Text>
                <View style={styles.challengeInfo}>
                    <Text style={styles.sportText}>Sport: {data.sport}</Text>
                    <Text style={styles.pointsText}>Points: {data.points}</Text>
                    <Text style={styles.pointsText}>Reps: {data.reps}</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
}

class YourChallenges extends Component {

    state = {
        token: "",
        userId: "",
        challengeShowing: true,
        allUserChallenges: [],
        allChallenges: []
    }

    componentDidMount() {
        this.fetchAllChallenges()
        const intervalStopper = setInterval(() => {
            this.updateIt()
        }, 2000)
    }

    updateIt = async () => {
        const updateOrNot = await AsyncStorage.getItem('needsAnUpdate')
        if (updateOrNot != 'false') {
            const update = await AsyncStorage.getItem("allUsersChallenges")
            this.setState({
                allUserChallenges: JSON.parse(update)
            }, this.fetchOneChallenge)
        }
    }

    fetchAllChallenges = async () => {

        await AsyncStorage.multiGet(['userId', 'token', 'allUsersChallenges'], (err, stores) => {
            this.setState({
                userId: stores[0][1],
                token: stores[1][1],
                allUserChallenges: JSON.parse(stores[2][1])
            })

        })

        this.state.allUserChallenges.map((challengeId) => {
            axios.get(`https://covid-see10.herokuapp.com/api/challenges/${parseInt(challengeId.challenge)}`)
                .then(response => {
                    this.setState({
                        allChallenges: [...this.state.allChallenges, response.data]
                    })
                })
        })
    }

    fetchOneChallenge = async () => {
        axios.get(`https://covid-see10.herokuapp.com/api/challenges/${parseInt(this.state.allUserChallenges[this.state.allUserChallenges.length - 1].challenge)}`)
            .then(response => this.setState({
                allChallenges: [...this.state.allChallenges, response.data]
            }))
        await AsyncStorage.setItem('needsAnUpdate', 'false')
    }


    deleteItem = (id, title) => {
        const challengeId = id
        const userChallengeId = this.state.allUserChallenges.find(id => id.challenge == challengeId)
        axios.delete(`https://covid-see10.herokuapp.com/api/authuserchallenges/${userChallengeId.id}/`, { headers: { 'Authorization': `Token ${this.state.token}` } })
            .then(alert(`You've Successfully quit the ${title} Challenge!`))
            .then(() => {
                const newUserArray = this.state.allUserChallenges.filter(id => {
                    return id.challenge != challengeId
                })
                this.setState({
                    allChallenges: [],
                    allUserChallenges: newUserArray
                }, this.willUpdate())
            })

    }

    willUpdate = () => {
        this.state.allUserChallenges.map((challengeId) => {
            axios.get(`https://covid-see10.herokuapp.com/api/challenges/${parseInt(challengeId.challenge)}`)
                .then(response => this.setState({
                    allChallenges: [...this.state.allChallenges, response.data]
                }))
        })
    }

    completeChallenge = async (id) => {
        const challengeId = id
        const userChallengeIdObject = this.state.allUserChallenges.find(id => id.challenge == challengeId)
        await AsyncStorage.setItem('userChallengeId', JSON.stringify(userChallengeIdObject.id))
        this.props.navigation.navigate('HomeLoaded', {
                screen: "MyModal"
            })
    }

    render() {

        return (
            <>
                <View style={styles.headerDiv}>
                    <TouchableOpacity style={styles.backButton}
                        onPress={() => this.props.navigation.toggleDrawer()}
                    >
                        <Image style={styles.covidIcon}
                            source={require('../covidIcon.png')}
                            resizeMode="cover"
                        >
                        </Image>
                    </TouchableOpacity >
                </View>
                <View style={styles.container}>
                    <FlatList
                        data={this.state.allChallenges}
                        renderItem={({ item }) => <Item data={item} deleteItem={this.deleteItem} navigation={this.props.navigation} completeChallenge={this.completeChallenge}/>}
                        keyExtractor={() => nextId()}
                    />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: "black",
        opacity: 0.8,
    },
    item: {
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    title: {
        fontSize: 32,
    },
    headerDiv: {
        height: "20%",
        backgroundColor: "black",
        marginBottom: "-6%"
    },
    backButton: {
        maxHeight: "100%",
        width: "30%",
        marginLeft: "2%",
        justifyContent: "center"
    },
    covidIcon: {
        maxHeight: "60%",
        width: "90%"
    },
    challengeButtonsDiv: {
        minWidth: "100%",
        maxHeight: "30%",
        marginTop: "2%",
        marginLeft: "1%"
    },
    deleteIcon: {
        width: "70%",
        height: "100%",
        marginTop: "2%",
    },
    challengeInfo: {
        backgroundColor: "gray",
        height: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    titleText: {
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "white",
    },
    workoutText: {
        fontSize: 20,
        textAlign: "center",
        borderWidth: 2,
        borderColor: "red"
    },
    sportText: {
        fontSize: 20,
    },
    pointsText: {
        fontSize: 20,
    },
    challengeButtons1: {
        flex: 1,
        borderWidth: 2,
        minWidth: "88%",
        backgroundColor: "white",
    },
    challengeButtons2: {
        minWidth: "8%",
        height: "200%",
        marginLeft: "1%",
        alignItems: "center"
    },
});

export default YourChallenges