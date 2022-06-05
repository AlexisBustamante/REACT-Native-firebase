import React, { useEffect, useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Avatar } from "@rneui/themed";
import firebase from '../database/firebase'

const UserDetailScreen = (props) => {
    const emptyUser = {
        id: '',
        name: '',
        email: '',
        phone: ''
    };
    const [user, setUser] = useState(emptyUser);
    const [loading, setLoading] = useState(true);

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    const getUserById = async (id) => {
        try {
            const dbRef = firebase.db.collection('users').doc(id)
            const doc = await dbRef.get();
            const user = doc.data();
            //del registro que recibo de firebase lo guardo en el state user
            setUser({
                ...user,
                id: doc.id
            })
            setLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const deleteUser = async () => {
        try {
            const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
            await dbRef.delete();
            props.navigation.navigate('UsersList');
        } catch (error) {
            console.log(error);
        }
       
    }

    const updateUser = async () => {

        try {
            setLoading(true)
            const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
            await dbRef.set({
                name: user.name,
                email: user.email,
                phone: user.phone,
                created:user.created
            });
            setUser(emptyUser);
            setLoading(false)
            props.navigation.navigate('UsersList');
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    

    }

    const openConfirmationAlert = () => {
        Alert.alert('Eliminar usuario', 'está seguro que desea eliminar al usuario ' + user.name, [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => { } }
        ])
    }

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, [])

    if (loading) {
        return (
            <View style={[styles.containerL, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <View style={{
                flexDirection: "row",
                justifyContent: 'center',
                marginBottom: 35
            }}>
                <Avatar title=""
                    size="xlarge"
                    icon={{
                        name: 'extension',
                        type: 'material',
                        color: '#cdde20',
                    }}
                    activeOpacity={0.2}
                    containerStyle={{ backgroundColor: "#BDBDBD" }}
                    rounded
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    value={user.name}
                    placeholder="Name User"
                    onChangeText={(value) => handleChangeText('name', value)}>
                </TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User"
                    value={user.email}
                    onChangeText={(value) => handleChangeText('email', value)}>
                </TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User"
                    value={user.phone}
                    onChangeText={(value) => handleChangeText('phone', value)}></TextInput>
            </View>
            <View>
                <Button title="Editar" onPress={() => updateUser() }></Button>
            </View>
            <View>
                <Button color="#e37399" title="Eliminar" onPress={() => openConfirmationAlert()}></Button>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'

    },
    containerL: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },

})

export default UserDetailScreen;