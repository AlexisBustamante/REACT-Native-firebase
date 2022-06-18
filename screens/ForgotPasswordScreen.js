import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const ForgotPasswordScreen = (props) => {
    ///*Data
    const [email, setEmail] = useState("");

    ////Functions
    const onSendPress = () => {
        console.warn("onSendPress");
    }

    const onSignInPress = () => {
        props.navigation.navigate('SignInScreen');
    }

    const onResendCode = () => {
        console.warn("onResendCode");
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Reset your Password</Text>
            <CustomInput
                placeholder="enter your email"
                value={email}
                setValue={setEmail}
            />
            <CustomButton
                text={"Send"}
                onPress={onSendPress}
            ></CustomButton>
            <CustomButton
                text={"Back to Sign in"}
                onPress={onSignInPress}
                type="TERTIARY"
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
    text: { color: 'grey', marginVertical: 10 },
    link: {
        color: '#FDB075'
    }

});

export default ForgotPasswordScreen