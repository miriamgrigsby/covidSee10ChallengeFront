import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import axios from 'axios'
import Constants from 'expo-constants';

const Friends = ({ navigation }) => {

    const [friends, setFriends] = React.useState([])

    useEffect(() => {
        axios.get('https://covid-see10.herokuapp.com/api/userprofiles/')
            .then(response => {
                setFriends(response.data)
            })
    }, [])

    function Item({ data }) {
        return (
            <View style={styles.item}>
                <View style={styles.leftDiv}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.plusIcon}
                            source={require('../profileIcon.png')}
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
                    <View style={styles.rightBio}>
                        <Text style={styles.Text2}>{data.bio}</Text>
                    </View>
                    <View style={styles.rightBottom}>
                        <Text style={styles.Text3}>{data.email}</Text>
                    </View>
                </View>
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
                        source={require('../covidIcon.png')}
                        resizeMode="cover"
                    >
                    </Image>
                </TouchableOpacity >
            </View>
            <View style={styles.container}>
                <FlatList
                    data={friends}
                    renderItem={({ item }) => <Item data={item} />}
                    keyExtractor={item => item.id}
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
    rightBottom: {
        maxWidth: "50%",
        height: "15%",
        justifyContent: "center"
    },
    rightBio: {
        height: "65%",
        minWidth: "45%",
        alignSelf: "center",
        borderWidth: 2,
        backgroundColor: "whitesmoke",
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center"
    },
    rightUpper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        maxHeight: "20%",
        alignItems: "center",
    },
    item: {
        backgroundColor: 'white',
        padding: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        width: "95%",
        minHeight: "8%",
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
        minHeight: "95.5%",
        minWidth: "50%",
        backgroundColor: "white",
    },
    plusIcon: {
        height: "90%",
        width: "100%",
    },
    personalInfo: {
        minHeight: "63%",
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
        borderBottomWidth: 4,
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

    headerDiv: {
        height: "20%",
        justifyContent: "center",
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
    }


});


export default Friends