import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AssessmentPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerDiv}>
                <TouchableOpacity style={styles.image} onPress={() => navigation.toggleDrawer()}>
                    <Image style={styles.covidImage}
                        source={require('../covidIcon.png')}
                        resizeMode="cover"
                        >
                    </Image>
                </TouchableOpacity>
                <Text style={styles.headerText}>Header</Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.bodyText}>Bunch o Shit</Text>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text>YOLO</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "black",
        flexDirection: "column",
        alignItems: "center",
    },
    headerDiv: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        maxHeight: "15%",
        alignItems: "center",
        padding: ".75%",
    },
    body: {
        flex: 1,
        flexDirection: "column",
        width: "95%",
        maxHeight: "70%",
        borderWidth: 2,
    },
    bodyText: {
        fontSize: 20
    },
    image: {
        minWidth: "20%",
        borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        borderColor: "transparent",
    },
    covidImage: {
        maxHeight: "80%",
        width: "100%",
    },
    headerText: {
        width: "60%",
        alignItems: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 30

    },
    button: {
        minWidth: "45%",
        backgroundColor: "yellow",
        minHeight: "10%",
        marginTop: "5%",
        alignItems: "center",
    }
})

export default AssessmentPage