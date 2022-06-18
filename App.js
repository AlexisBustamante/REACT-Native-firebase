// In App.js in a new project
import React, { useState, useContext, useEffect, createContext } from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from "firebase/auth";
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import UsersList from './screens/UserList';
import CreateUsersScreen from './screens/CreateUsersScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen'
import CustomLoading from "./components/CustomLoading";
import { auth } from "./database/firebase";

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});
console.log(AuthenticatedUserContext);

const AunthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} defaultScreenOptions={SignInScreen}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: '' }}></Stack.Screen>
    </Stack.Navigator>
  )
}
function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} defaultScreenOptions={HomeScreen}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'Lista de usuarios' }}></Stack.Screen>
      <Stack.Screen name="CreateUsersScreen" component={CreateUsersScreen} options={{ title: 'Crear Usuario' }}></Stack.Screen>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'Datos del Usuario' }}></Stack.Screen>
    </Stack.Navigator>
  )
}

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth,
      async AunthenticatedUser => {
        AunthenticatedUser ? setUser(AunthenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user])


  if (loading) {
    return (
      <CustomLoading></CustomLoading>
    )
  }
  return (
    <NavigationContainer>
      {user ? <UserStack /> : <AuthStack />}
    </NavigationContainer>
  )
}


export default function App() {
  return (
    <AunthenticatedUserProvider>
      <RootNavigator></RootNavigator>
    </AunthenticatedUserProvider>
  );
}

