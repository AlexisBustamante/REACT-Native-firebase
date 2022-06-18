import React, { useEffect, useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'
import { ListItem, Avatar } from "@rneui/themed";


const UsersList = (props) => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').orderBy("created", "desc").onSnapshot(querySnapshot => {
            const users = [];
            querySnapshot.docs.forEach(doc => {
                const { name, email, phone, created } = doc.data();

                let date = new Date(created.seconds * 1000).toLocaleDateString();
                users.push({
                    id: doc.id,
                    name, email, phone, date
                })
            });
            setUsers(users)
            setLoading(false)
        });
    }, [])

    const RedirectVWCreateUSer = () => {
        props.navigation.navigate("CreateUsersScreen")
    }

    const RedirectVWDetailUser = (user) => {
        props.navigation.navigate("UserDetailScreen", {
            userId: user.id
        });
    }


    if (loading) {
        return (
            <View style={[styles.containerL, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
            </View>
        )
    }
    return (
        <ScrollView>
            <Button title="Create User" onPress={() => RedirectVWCreateUSer()}></Button>
            {
                users.map(user => {
                    return (
                        <ListItem
                            key={user.id}
                            bottomDivider
                            onPress={() => RedirectVWDetailUser(user)}
                        >
                            <Avatar title=""
                                size="medium"
                                activeOpacity={0.2}
                                containerStyle={{ backgroundColor: "#BDBDBD" }}
                                rounded
                                icon={{
                                    name: 'extension',
                                    type: 'material',
                                    color: '#cdde20',
                                }}
                            />
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: 'bold' }}>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                                <ListItem.Subtitle>{user.phone}</ListItem.Subtitle>
                                <ListItem.Subtitle>{user.date}</ListItem.Subtitle>

                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>

                    )
                })
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerL: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }

})
export default UsersList;                                                                       