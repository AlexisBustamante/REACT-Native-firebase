import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'


const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container,
            styles[`container_${type}`],
            bgColor ? { backgroundColor: bgColor } : {}]}>

            <View style={styles.container}>
                <Text
                    style={[styles.text,
                    styles[`text_${type}`],
                    fgColor ? { color: fgColor } : {}]}
                >{text}</Text>

            </View>
        </Pressable >
    )
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        padding: 5,
        width: '100%',
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },
    container_TERTIARY: {

    },
    container_SECONDARY: {
        borderColor: '#3B71f3',
        borderWidth: 2,
    },
    text_PRIMARY: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_TERTIARY: {
        color: 'grey'
    },
    text_SECONDARY: {
        color: '#3B71f3'
    }

})


export default CustomButton