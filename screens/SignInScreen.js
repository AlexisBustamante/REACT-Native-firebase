import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import SocialSignInButtons from '../components/SocialSignInButtons'
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"

const SigninScreen = (props) => {

  //**STATES */
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');

  //*****functions */
  const onSignInPress = () => {
    console.warn('SIGN IN');
  }

  const onForgotPress = () => {
    console.warn('Forgot');
  }

  const onRegisterPress = () => {
    props.navigation.navigate('SignUpScreen');
  }

  const { height } = useWindowDimensions();

  //****VIEWS * /
  return (
    < ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={styles.logo, { height: height * 0.3 }}
          resizeMode='contain' />
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername} />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setpassword}
          secureTextEntry={true} />

        <CustomButton
          text={'Sign In'}
          onPress={onSignInPress}
        ></CustomButton>

        <CustomButton
          text={'Forgot password?'}
          onPress={onForgotPress}
          type="TERTIARY"
        ></CustomButton>

        <SocialSignInButtons></SocialSignInButtons>

        <CustomButton
          text={"Don't have an Account? Register Now!"}
          onPress={onRegisterPress}
          type="TERTIARY"
        ></CustomButton>
      </View >
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    marginVertical: 35,
  },
  logo: {
    width: "70%",
    height: 200,
    maxWidth: 300,
  },

})


export default SigninScreen;