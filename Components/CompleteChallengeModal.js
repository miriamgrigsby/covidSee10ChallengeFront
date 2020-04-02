
import React from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CompleteChallengeModal = ({ navigation }) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: "white",
            opacity: 0.8
        }}>
            <Text style={{
                fontSize: 30,
                textAlign: "center"
            }}>
                Upload a photo/video to complete this challenge!
            </Text>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'space-evenly',
                    maxHeight: "60%",
                    minWidth: "100%",
                    alignItems: "center"
                }}>
                <TouchableOpacity
                    style={{
                        minHeight: "20%",
                        minWidth: "80%",
                        backgroundColor: "blue",
                        justifyContent: "center",
                        alignItems: "center",
                        borderWidth: 4,
                        borderColor: "black"
                    }}
                    onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 25, color: "white" }}>Choose File</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    minHeight: "20%",
                    minWidth: "80%",
                    backgroundColor: "black",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 4,
                    borderColor: "blue"
                }}
                    onPress={() => navigation.goBack()}>
                    <Text style={{ fontSize: 25, color: "white" }}>Dismiss</Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}

export default CompleteChallengeModal