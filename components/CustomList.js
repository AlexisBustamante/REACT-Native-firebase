import React, { useEffect, useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase'
import { ListItem, Avatar } from "@rneui/themed";


const CustomList = ({ array }) => {
    return (
        <ScrollView>
            {
                array.map(gasto => {
                    return (
                        <ListItem
                            key={gasto.desc}
                            bottomDivider
                            onPress={() => (console.log(gasto))}
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
                                <ListItem.Title style={{ fontWeight: 'bold' }}>{gasto.desc}</ListItem.Title>
                                <ListItem.Subtitle>{gasto.valor}</ListItem.Subtitle>
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
export default CustomList