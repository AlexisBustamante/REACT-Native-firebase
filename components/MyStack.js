import { View, Text } from 'react-native'
import React, { useState, useContext, useEffect, createContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UsersList from '../screens/UserList';
import CreateGastoScreen from '../screens/CreateGastoScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen'
import { auth } from '../database/firebase'
import CustomLoading from "../components/CustomLoading";

const Stack = createNativeStackNavigator();

function MyStack() {
    const { user, setUser } = useContext(AuthenticatedUserContext);
    const [loading, setLoading] = useState(true);

    if (loading) {
        <CustomLoading></CustomLoading>
    }
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                // Screens for logged in users
                <Stack.Group>
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: '' }}></Stack.Screen>
                    <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'Lista de usuarios' }}></Stack.Screen>
                    <Stack.Screen name="CreateGastoScreen" component={CreateGastoScreen} options={{ title: 'Crear Usuario' }}></Stack.Screen>
                    <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'Datos del Usuario' }}></Stack.Screen>
                </Stack.Group>
            ) : (
                // Auth screens
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: '' }}></Stack.Screen>
                    <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: '' }}></Stack.Screen>
                    <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{ title: '' }}></Stack.Screen>
                    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: '' }}></Stack.Screen>
                </Stack.Group>
            )}
        </Stack.Navigator >
    )
}
export default MyStack