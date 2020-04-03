
import React, { Component } from 'react'
import { Text, View, AsyncStorage, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { Video } from 'expo-av'
import axios from 'axios'


class CompleteChallengeModal extends Component {

    state = {
        video: null,
        userId: 0,
        token: ""
    };

    componentDidMount() {
        AsyncStorage.multiGet(['userId', 'token', 'userChallengeId'], (err, stores) => {
            this.setState({
                userId: JSON.parse(stores[0][1]),
                token: stores[1][1],
                userChallengeId: JSON.parse(stores[2][1])
            })
        })
    }

    completeChallenge = () => {
        console.log(typeof(this.state.userId), this.state.userId, typeof(this.state.userChallengeId), this.state.userChallengeId, typeof(this.state.video), this.state.video )
        // axios.post('https://covid-see10.herokuapp.com/api/authcompletedchallenges/', { user: this.state.userId, user_challenge: this.state.userChallengeId, photo: this.state.video}, { headers: { 'Authorization': `Token ${this.state.token}` } })
        //     .then(response => console.log(response))
            // .then(alert(`You've Successfully Completed this Challenge!`))
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [18, 24],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ video: result.uri });
        }
    };

    _takeImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [18, 24],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ video: result.uri });
        }

    }

    render() {
        let { video } = this.state;

        return (
            <ScrollView
                contentContainerStyle={{
                    marginTop: Constants.statusBarHeight,

                }}
                style={{
                    flex: 1,
                    backgroundColor: "white",
                }}>

                <Text style={{
                    fontSize: 30,
                    textAlign: "center",
                    marginBottom: "5%"
                }}>
                    Upload a Video to complete this challenge!
            </Text>
                <View style={{ width: "100%", height: 900, alignItems: "center" }}>
                    <TouchableOpacity
                        style={{
                            minHeight: 60,
                            minWidth: "80%",
                            backgroundColor: "blue",
                            alignItems: "center",
                            borderWidth: 4,
                            borderColor: "black",
                            justifyContent: "center",
                            marginBottom: "2%",
                            paddingBottom: "10%"

                        }}
                        onPress={this._pickImage}>
                        <Text style={{ fontSize: 30, color: "white" }}>Choose File</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            minHeight: 60,
                            minWidth: "80%",
                            backgroundColor: "blue",
                            alignItems: "center",
                            borderWidth: 4,
                            borderColor: "black",
                            marginTop: "2%",
                            padding: "5%"
                        }}
                        onPress={this._takeImage}>
                        <Text style={{ fontSize: 30, color: "white", }}>Open Camera</Text>
                    </TouchableOpacity>
                    {video &&
                        <Video source={{ uri: video }} style={{ width: "80%", minHeight: 450, marginTop: "5%", marginBottom: "5%" }} rate={1.0} volume={1.0} isMuted={false} resizeMode="cover" isLooping useNativeControls={true} />}
                    <View style={{ flex: 1, flexDirection: "row", minWidth: "80%", justifyContent: "space-evenly", marginTop: "5%" }}>

                        <TouchableOpacity style={{
                            minHeight: 100,
                            minWidth: "35%",
                            backgroundColor: "black",
                            alignItems: "center",
                            borderWidth: 4,
                            borderColor: "blue",
                            marginTop: "5%",
                            justifyContent: "center"
                        }}
                            onPress={() => this.props.navigation.goBack()}>
                            <Text style={{ fontSize: 25, color: "white" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            minHeight: 100,
                            minWidth: "35%",
                            backgroundColor: "black",
                            alignItems: "center",
                            borderWidth: 4,
                            borderColor: "blue",
                            marginTop: "5%",
                            justifyContent: "center"
                        }}
                            onPress={this.completeChallenge}>
                            <Text style={{ fontSize: 25, color: "white" }}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                </View>



            </ScrollView>


        )
    }
}

export default CompleteChallengeModal