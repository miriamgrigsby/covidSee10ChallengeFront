import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Ranking = ({ navigation }) => {
    return (
        <View style={styles.headerDiv}>
            <Text>This Is Where you'll see the leader board and your ranking</Text>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.toggleDrawer()}>
                <Image style={styles.covidIcon}
                    source={require('../covidIcon.png')}
                    resizeMode="cover"
                >
                </Image>
            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Ranking