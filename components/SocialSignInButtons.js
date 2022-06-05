import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from "./CustomButton"

const SocialSignInButtons = () => {
    const onSignInFacebookPress = () => {
        console.warn('Facebook');
    }
    const onSignInGooglePress = () => {
        console.warn('google');
    }
    return (
        <>
            <CustomButton
                text={'Sign In with Facebook'}
                onPress={onSignInFacebookPress}
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            ></CustomButton>

            <CustomButton
                text={'Sign In with google'}
                onPress={onSignInGooglePress}
                bgColor='#FAE9EA'
                fgColor='#DD4D44'
            ></CustomButton>
        </>
    )
}

export default SocialSignInButtons