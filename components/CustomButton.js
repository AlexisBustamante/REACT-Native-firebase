import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'


const CustomButton = ({ onPress, text, type = "PRIMARY", bgColor, fgColor, onlongpress = () => { } }) => {
    return (
        <Pressable
            onPress={onPress}
            onLongPress={onlongpress}
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
    },
    text_CANCEL: {
        color: 'red'
    },
    container_CANCEL: {
        borderColor: 'red',
        borderWidth: 2,
    },
    container_ROUNDED: {
        backgroundColor: '#3B71F3',
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        borderColor: '#3B71f3',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#F02A4B",
        shadowOpacity: 0.3,
        shadowOffser: { height: 10 },
        position: 'absolute',
        bottom: 0,
    },
    text_ROUNDED: {
        color: '#3B71f3',
        fontWeight: 'bold',
        color: 'white',
    }

})


export default CustomButton