import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';
import { TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native-gesture-handler';
import axios from 'axios'
import Constants from 'expo-constants';
import YourChallenges from './YourChallenges'

const Friends = ({ navigation }) => {

    const [friends, setFriends] = React.useState([])
    const [search, setSearch] = React.useState("")

    useEffect(() => {
        axios.get('https://covid-see10.herokuapp.com/api/userprofiles/')
            .then(response => {
                setFriends(response.data)
            })
        getItemsFromStorage()
    }, [])

    const getItemsFromStorage = async () => {
        await AsyncStorage.multiGet(['everyUsersChallenges', 'allChallenges'], (err, stores) => {
            // console.log(stores)
        })
    }

    const filterPeople = () => 
    
    friends
        .filter(friend => {
            return friend.first_name.toLowerCase().includes(search.toLowerCase()) 
        })

    const handleChange = async (text) => {
        setSearch(text)
        filterPeople()
    }


    function Item({ data }) {
        return (
            <View style={styles.item}>
                <View style={styles.leftDiv}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.plusIcon}
                            source={require('../images/profileIcon.png')}
                            resizeMode="contain"
                        >
                        </Image>
                    </View>
                    <View style={styles.personalInfo}>
                        <Text style={styles.Text}>City: {data.city}</Text>
                        <Text style={styles.Text}>Country: {data.Country}</Text>
                        <Text style={styles.Text}>Age: {data.age}</Text>
                        <Text style={styles.Text}>Gender: {data.gender}</Text>
                        <Text style={styles.Text}>Points: {data.points}</Text>
                    </View>
                </View>
                <View style={styles.rightDiv}>
                    <View style={styles.rightUpper}>
                        <Text style={styles.Text}>{data.first_name.toUpperCase()}   {data.last_name == null ? data.last_name : data.last_name.toUpperCase()}</Text>
                        <Text style={styles.Text}></Text>
                    </View>
                    <View style={styles.rightMiddle}>
                        <Text style={styles.Text4}>{data.bio}</Text>
                    </View>
                    <View style={styles.rightBio}>
                        <FlatList   data={friends}
                    renderItem={({ item }) => <Items data={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    />
                    </View>
                    <View style={styles.rightBottom}>
                        <Text style={styles.Text3}>{data.email}</Text>
                    </View>
                </View>
            </View>
        );
    }


    function Items({ data }) {
        return (
            <View style={styles.item2 }>
               
            </View>
        );
        
    }




    return (
        <>
            <View style={styles.headerDiv}>
                <TouchableOpacity style={styles.backButton}
                    onPress={() => navigation.toggleDrawer()}
                >
                    <Image style={styles.covidIcon}
                        source={require('../images/covidIcon.png')}
                        resizeMode="cover"
                    >
                    </Image>
                </TouchableOpacity >
                <View style={styles.filter}>
                            <TextInput style={styles.filterInput} onChangeText={handleChange} placeholder="Filter by First Name">

                            </TextInput>
                        </View>
            </View>
            <View style={styles.container}>
                
                <FlatList
                    data={filterPeople()}
                    renderItem={({ item }) => <Item data={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    filterButton: {
        // backgroundColor: "red",
        minWidth: "12%",
        minHeight: 50,
        justifyContent: "center"
    },
    filterInput: {
        width: "100%",
        height: 60,
        borderWidth: 2,
        fontSize: 20,
        textAlign: "center",
        borderColor: "red",
        backgroundColor: "white"
    },
    
    filter: {
        maxWidth: "70%",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: 75,
        flex: 1,
        flexDirection: "row",
    },
    rightBottom: {
        maxWidth: "55%",
        height: "10%",
        justifyContent: "center"
    },
    rightBio: {
        height: "65%",
        maxWidth: "60%",
        borderWidth: 2,
        backgroundColor: "whitesmoke",
        opacity: 0.8,
        // paddingRight:"4%",
        // paddingLeft:"-20%",
    },
    rightMiddle: {
        height: "15%",
        marginBottom: "2%",
        minWidth: "45%",
        alignItems: "center",
        backgroundColor: "white",
        padding: "1%",
        alignSelf: "center",
        justifyContent: "center",
        marginTop: "2%",
    },
    rightUpper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        maxHeight: "7%",
        alignItems: "center",
    },
    item: {
        backgroundColor: 'white',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        width: "90%",
        height: 575,
        flexWrap: "wrap",
    },
     item2: {
        backgroundColor: 'red',
        padding: 2,
        marginVertical: 8,
        width: "100%",
        height: 300,
        flexWrap: "wrap",
    },
    imageContainer: {
        maxWidth: "50%",
        maxHeight: "40%",
        paddingTop: "2%",
        borderWidth: 4,
    },

    leftDiv: {
        flex: 1,
        minHeight: "96%",
        minWidth: "50%",
        backgroundColor: "white",
    },
    plusIcon: {
        height: "90%",
        width: "100%",
    },
    personalInfo: {
        minHeight: "64%",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderWidth: 4,
        backgroundColor: "black"
    },
    rightDiv: {
        flex: 1,
        height: "100%",
        minWidth: "50%",
        backgroundColor: "#800020",
        borderRightWidth: 4,
        borderTopWidth: 4,
        // borderBottomWidth: 4,
        borderLeftColor: "white",
        borderLeftWidth: 4
    },

    Text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    Text2: {
        fontSize: 20,
        fontWeight: "bold",
    },
    Text3: {
        fontSize: 13,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    Text4: {
        fontSize: 20,
        fontWeight: "bold",
    },

    headerDiv: {
        height: 150,
        alignItems: "center",
        backgroundColor: "black",
        marginBottom: "-6%",
        flexDirection: "row",
        minWidth: "100%",
        marginTop: "5%",
        justifyContent:"space-around"
    },
    backButton: {
        // minHeight: 300,
        minWidth: 120,
        justifyContent: "center"
    },
    covidIcon: {
        maxHeight: "60%",
        width: "90%"
    }


});


export default Friends