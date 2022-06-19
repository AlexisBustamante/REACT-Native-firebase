import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";
import {
    getAuth, createUserWithEmailAndPassword,
    updateProfile, signInWithEmailAndPassword, onAuthStateChanged
} from "firebase/auth";
import { auth } from "../database/firebase";

const SignUpScreen = ({ navigation }) => {
    //**STATES */
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("Nombre desconocido");
    const [password, setpassword] = useState("123456");
    const [passwordRepeat, setPasswordRepeat] = useState("123456");
    const [email, setEmail] = useState("ale6@gmail.com");

    //await signInWithEmailAndPassword(auth, email, password);
    //*****functions */
    const onRegisterPress = () => {

        if ((email != '') && (username != '') && (password != '') && (passwordRepeat != '')) {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {

                })
                .catch((error) => {
                    setLoading(false)
                    Alert.alert("Signup error", "This Email is already in use. Please try again with other Email");
                })
        } else {
            alert('complete all fields')
        }

    };


    const onTermsPress = () => {
        Alert.alert('Terms', 'I have no terms for this app, yet...')
    };

    const onPolicyPress = () => {
        Alert.alert('Policy', 'I have no Policy for this app, yet...')
    };

    const onSignInPress = () => {
        navigation.navigate('SignInScreen');
    }

    //****VIEWS * /

    if (loading) {
        return (
            <View style={[styles.containerL, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            </View>
        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an Account</Text>

                <CustomInput placeholder="Username"
                    value={username}
                    setValue={setUsername} />

                <CustomInput placeholder="Email"
                    value={email}
                    setValue={setEmail} />

                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setpassword}
                    secureTextEntry={true}
                />
                <CustomInput
                    placeholder="Password Repeat"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry={true}
                />
                <CustomButton
                    text={"Register"}
                    onPress={onRegisterPress}
                ></CustomButton>
                <Text style={styles.text}>
                    By registering, you confirm that you accept our
                    <Text style={styles.link} onPress={onTermsPress}> terms of use </Text>
                    and <Text style={styles.link} onPress={onPolicyPress}>Privacy Policy</Text>
                </Text>
                <SocialSignInButtons></SocialSignInButtons>
                <CustomButton
                    text={"Have an account? Sign in"}
                    onPress={onSignInPress}
                    type="TERTIARY"
                ></CustomButton>

            </View>
        </ScrollView >
    );
};

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
    text: { color: 'grey', marginVertical: 10 },
    link: {
        color: '#FDB075'
    },
    containerL: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }

});

export default SignUpScreen;
