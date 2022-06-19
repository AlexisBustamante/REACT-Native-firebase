import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../assets/logo.png'
import SocialSignInButtons from '../components/SocialSignInButtons'
import CustomInput from "../components/CustomInput"
import CustomButton from "../components/CustomButton"
import CustomLoading from "../components/CustomLoading"
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword } from "firebase/auth"
import { Timestamp, getFirestore, doc } from "firebase/firestore";

const SigninScreen = ({ navigation }) => {
  //**STATES */
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const { height } = useWindowDimensions();

  //*****functions */
  const onSignInPress = () => {

    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then(() => { })
      .catch((error) => {
        setLoading(false)
        Alert.alert('Ouh!', 'this email or password is wrong')
      })

  }

  const onForgotPress = () => {
    navigation.navigate('ForgotPasswordScreen');
  }

  const onRegisterPress = () => {
    navigation.navigate('SignUpScreen');
  }


  //****VIEWS * /
  if (loading) {
    return (
      <CustomLoading></CustomLoading>
    )
  }
  return (
    < ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={styles.logo, { height: height * 0.3 }}
          resizeMode='contain' />
        <CustomInput
          placeholder="Email"
          value={email}
          setValue={setEmail} />
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
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    height: 200,
    maxWidth: 300,
    marginVertical: 35,
  },

})


export default SigninScreen;