import React, { useEffect, useState } from "react";
import {
    View, Button, Text, ScrollView, StyleSheet, ActivityIndicator, Pressable, Alert, Modal,
} from 'react-native';
import firebase from '../database/firebase'
import { ListItem, Avatar } from "@rneui/themed";
import CustomButton from "../components/CustomButton"
import CustomInput from "../components/CustomInput";

const CustomList = ({ gastos }) => {
    useEffect(() => {
        console.log(gastos);
    }, [])
    return (
        <View>
            <ScrollView style={styles.containerL}>

                {
                    gastos.map(gasto => {
                        return (
                            <ListItem
                                key={gasto.id}
                                bottomDivider
                                onPress={() => { console.log(gasto) }}
                                onLongPress={() => { alert('desea eliminar: ' + gasto.id) }}
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
                                    <ListItem.Subtitle>{gasto.id}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{gasto.valor}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>

                        )
                    })
                }

            </ScrollView>
        </View>


    )
}
const styles = StyleSheet.create({
    containerB: {
        alignItems: 'center',
    },
    containerL: {
        flex: 1,

    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        width: "95%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }



})
export default CustomList