import { View, Button, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomLoading from "../components/CustomLoading";
import { auth, db } from "../database/firebase";
import { firestore, collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import CustomList from "../components/CustomList";

const HomeScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [arrayGastos, setArrayGastos] = useState([{}]);

    const onLogoutPress = () => {
        signOut(auth)
    }

    useEffect(() => {
        const array = [];

        async function getDataUser() {
            setLoading(true)
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            setUsername(docSnap.data().name)
            setUserId(auth.currentUser.uid)
            setEmail(auth.currentUser.email)

            //obtengo la coleccion de losgatos del usuario
            const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "gastos"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                let obj = doc.data();
                obj.id = doc.id;
                array.push(obj);
                //console.log(doc.data());
            });
            setLoading(false)

        }
        getDataUser();
        setArrayGastos(array);
        console.log(arrayGastos)

    }, [])

    if (loading) {
        return (
            <CustomLoading></CustomLoading>
        )
    }
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Welcome!!!</Text>
            <Text style={styles.title}>{username}</Text>
            <Text style={styles.title}>{email}</Text>
            <Text style={styles.title}>UID: {userId}</Text>
            <CustomButton
                text={"LOGOUT"}
                onPress={onLogoutPress}
            ></CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
    },
    root: {
        marginVertical: 35,
        alignItems: "center",
        padding: 20,
    },
})

export default HomeScreen