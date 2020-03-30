import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { WebView } from 'react-native-webview';

const AssessmentPage = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerDiv}>
                <TouchableOpacity
                    style={styles.image}
                    onPress={() => navigation.toggleDrawer()}>
                    <Image
                        style={styles.covidImage}
                        source={require('../covidIcon.png')}
                        resizeMode="cover"
                    >
                    </Image>
                </TouchableOpacity>
                <Text
                    style={styles.headerText}>
                    Take the Fitness Level Assessment
                </Text>
            </View>
            <View style={styles.body}>
                <WebView source={{ uri: 'https://www.worldfitnesslevel.org/#/' }}></WebView>
            </View>
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
        maxHeight: "20%",
        alignItems: "center",
        padding: ".75%",
    },
    body: {
        flex: 1,
        flexDirection: "column",
        width: "100%",
        maxHeight: "100%",
        borderWidth: 2,
    },
    bodyText: {
        fontSize: 20
    },
    image: {
        minWidth: "25%",
        borderWidth: 1,
        flex: 1,
        justifyContent: "flex-end",
        borderColor: "transparent",
    },
    covidImage: {
        maxHeight: "80%",
        width: "100%",
    },
    headerText: {
        width: "60%",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: "5%"
    },
})

export default AssessmentPage