import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const FriendInstance = ({age, bio, city, country, email, firstname, lastname, gender, photo, points,}) => {

    return (
        <View style={styles.usersDiv}>
            <View  style={styles.leftDiv}>
                <View style={styles.imageContainer}>
                    <Image style={styles.plusIcon}
                                source={require('../plusIcon.png')}
                                resizeMode="contain"
                            >
                    </Image>
                </View>
                <View style={styles.personalInfo}>
                    {/* <Text style={styles.sportText}>City: </Text>
                    <Text style={styles.pointsText}>Country: </Text> */}
                    <Text style={styles.pointsText}>Age: </Text>
                    <Text style={styles.pointsText}>Gender: </Text>
                    <Text style={styles.pointsText}>Points: </Text>
                </View> 
            </View>
            <View style={styles.rightDiv}>
                <View>
                    <Text>Fuck</Text>
                    <Text>Fuck</Text>
                    <Text>Fuck</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    imageContainer: {
        width: "80%",
        height: "40%",
        alignSelf: "center",
        justifyContent: "center"
    },
    usersDiv: {
        flex: 1,
        minWidth: "45%",
        minHeight: "40%",
        flexDirection: "row",
        marginBottom: "2%",
        backgroundColor: "blue",
        overflow: "scroll",
    },
     leftDiv: {
         flex: 1,
         height: "101%",
         maxWidth: "40%",
         backgroundColor: "green",
         paddingLeft: "2%",
         
     },
     plusIcon: {
         height: "100%",
         width: "100%",
         alignSelf: "center",
     },
     personalInfo: {
         backgroundColor: "red",
         minHeight: "60%",

     }


})

export default FriendInstance