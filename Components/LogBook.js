import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LogBook = ({navigation}) => {
    return (
        <View style={styles.headerDiv}>
            <Text>This Is Where you'll see all your finished challenges and logs about those</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.toggleDrawer()}>
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

export default LogBook