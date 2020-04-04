import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, AsyncStorage } from 'react-native';
import { TouchableOpacity, ScrollView, TextInput } from 'react-native-gesture-handler';
import ChallengeInstance from './ChallengeInstance'

const ChallengeFilter = ({challenges, navigation}) => {

    const challengeCard = challenges.map(challenge => {
        return <ChallengeInstance navigation={navigation} title={challenge.title} daily={challenge.daily} id={challenge.id} key={challenge.id} points={challenge.points} reps={challenge.reps} sport={challenge.sport} workoutType={challenge.workout_type} />
    })
    
    return (
        <>
            {challengeCard}
        </>
    )
}

const styles = StyleSheet.create({

})

export default ChallengeFilter