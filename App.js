import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import UsersList from './screens/UserList';
import CreateUsersScreen from './screens/CreateUsersScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import ConfirmEmailScreen from './screens/ConfirmEmailScreen'

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: '' }}></Stack.Screen>
      <Stack.Screen name="UsersList" component={UsersList} options={{ title: 'Lista de usuarios' }}></Stack.Screen>
      <Stack.Screen name="CreateUsersScreen" component={CreateUsersScreen} options={{ title: 'Crear Usuario' }}></Stack.Screen>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{ title: 'Datos del Usuario' }}></Stack.Screen>
    </Stack.Navigator >
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
