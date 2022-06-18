import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomLoading = () => {
    return (
        <View style={[styles.containerL, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
        </View>
    )
}

const styles = StyleSheet.create({
    containerL: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})

export default CustomLoading