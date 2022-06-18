import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CustomLoading from "../components/CustomLoading";
import { async } from '@firebase/util';

const HomeScreen = (props) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});


    const onLogoutPress = () => {
        signOut(auth)
        props.navigation.navigate("SignInScreen");
    }

    useEffect(() => {
        console.log('home')
    }, [])

    if (loading) {
        return (
            <CustomLoading></CustomLoading>
        )
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Welcome!!!</Text>
            <Text style={styles.title}>{username}</Text>
            <Text style={styles.title}>UID: {userId}</Text>
            <CustomButton
                text={"LOGOUT"}
                onPress={onLogoutPress}
            ></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
    },
    root: {
        marginVertical: 35,
        alignItems: "center",
        padding: 20,
    },
})

export default HomeScreen