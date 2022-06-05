import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import SocialSignInButtons from "../components/SocialSignInButtons";

const SigninScreen = (props) => {
    //**STATES */
    const [username, setUsername] = useState("");
    const [password, setpassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [email, setEmail] = useState("");

    //*****functions */
    const onRegisterPress = () => {
        console.warn("register");
    };

    const onTermsPress = () => {
        console.warn("terms");
    };

    const onPolicyPress = () => {
        console.warn("Policy");
    };

    const onSignInPress = () => {
        props.navigation.navigate('SignInScreen');

    }

    //****VIEWS * /
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an Account</Text>

                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput placeholder="Email" value={email} setValue={setEmail} />

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
    }

});

export default SigninScreen;
