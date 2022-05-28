import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import firebase from '../database/firebase'
import { Timestamp } from "firebase/firestore";
import { Avatar } from "@rneui/themed";


const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    })

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const saveNewUser = async () => {
        if (state.name === '') {
            alert('name requieed')
        } else {
            try {

                await firebase.db.collection('users').add({
                    name: state.name,
                    email: state.email,
                    phone: state.phone,
                    created: Timestamp.now()
                })
                props.navigation.navigate("UsersList");
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={{
                flexDirection:"row",
                justifyContent: 'center',
                marginBottom:35
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
                    placeholder="Name User"
                    onChangeText={(value) => handleChangeText('name', value)}>
                </TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email User"
                    onChangeText={(value) => handleChangeText('email', value)}>
                </TextInput>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User"
                    onChangeText={(value) => handleChangeText('phone', value)}></TextInput>
            </View>
            <View>
                <Button title="Save User" onPress={() => saveNewUser()}></Button>
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

    }
})

export default CreateUserScreen;