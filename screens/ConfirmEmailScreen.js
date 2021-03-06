import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

const ConfirmEmailScreen = (props) => {
    ///*Data
    const [code, setcode] = useState("");


    ////Functions
    const onConfirmPress = () => {
        console.warn("onConfirmPress");
    }

    const onSignInPress = () => {
        props.navigation.navigate('SignInScreen');
    }

    const onResendCode = () => {
        console.warn("onResendCode");
    }

    return (
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>
            <CustomInput
                placeholder="enter your confirmation code"
                value={code}
                setValue={setcode}
            />
            <CustomButton
                text={"Confirm"}
                onPress={onConfirmPress}
            ></CustomButton>
            <CustomButton
                text={"Resend code"}
                onPress={onResendCode}
                type="SECONDARY"
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

export default ConfirmEmailScreen