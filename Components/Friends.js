import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import FriendInstance from './FriendInstance'

const Friends = ({ navigation }) => {
    const [friends, setFriends] = React.useState([])

    useEffect(() => {
        axios.get('https://covid-see10.herokuapp.com/api/userprofiles/')
            .then(response => {
                setFriends(response.data)
            })
    }, [])

   
    const friendCard = friends.map(friend => {
        return <FriendInstance  age={friend.age} bio={friend.bio} city={friend.city} country={friend.country} email={friend.email} firstname={friend.first_name} lastname={friend.last_name} gender={friend.gender} profileId={friend.id} photo={friend.photo} points={friend.points} userId={friend.user}/>
    })

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: "500%", flexGrow:1 }} bounces={false}>
            <View style={styles.headerDiv}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image style={styles.covidIcon}
                        source={require('../covidIcon.png')}
                        
                    >
                    </Image>
                </TouchableOpacity >
                <Text style={styles.headerText}>Meet other users who shares your passion for fitness</Text>
            </View>
                <View style={styles.allFriends}>
                    {friendCard}
                </View>
            </ScrollView>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        borderTopWidth: 4,
        borderColor: "black",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        overflow: "scroll",
    },
    headerDiv: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        maxHeight: "20%",
        padding: "1%",
        marginTop: "15%"
    },
    headerText: {
        width: "70%",
        fontSize: 22,
        textAlign: "center",
        marginLeft: "2%",
        paddingTop: "3%",
        
    },
    covidIcon: {
        maxHeight:"100%",
        width: "110%",
        justifyContent: "center", 
    },
    backButton: {
        minWidth: "25%",
        maxHeight: "100%",
        justifyContent: "center"
    },
    allFriends: {
        flex: 1,
        padding: "1%",
        overflow: "scroll",
        maxHeight: "100%",
        marginBottom: "2%"
    },
    plusIcon: {
        width: "10%",
        height: "10%"   
    },
})

export default Friends