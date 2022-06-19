import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import CustomLoading from "../components/CustomLoading";
import { async } from '@firebase/util';
import { auth } from "../database/firebase";

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');

    const onLogoutPress = () => {
        signOut(auth)
    }
    useEffect(() => {
        setEmail(auth.currentUser.email)
        setUserId(auth.currentUser.uid)
        //console.log('home')
    }, [])

    if (loading) {
        return (
            <CustomLoading></CustomLoading>
        )
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Welcome!!!</Text>
            <Text style={styles.title}>{email}</Text>
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