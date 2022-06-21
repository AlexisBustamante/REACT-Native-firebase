import { View, Button, Text, TextInput, ScrollView, StyleSheet, Modal, Alert, Pressable } from 'react-native';
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLoading from "../components/CustomLoading";
import { auth, db } from "../database/firebase";
import { firestore, collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import CustomList from "../components/CustomList";
import { signOut } from "firebase/auth";
import firebase from '../database/firebase'
import { ListItem, Avatar } from "@rneui/themed";
import { Timestamp } from "firebase/firestore";

const HomeScreen = (props) => {
    const [state, setState] = useState({
        desc: '',
        valor: '',
    })
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [user, setUser] = useState({});
    const [email, setEmail] = useState('');
    const [modalVisibleAdd, setModalVisibleAdd] = useState(false);
    const [valor, setValor] = useState('')
    const [desc, setDescription] = useState('');

    const [arrayGastos, setArrayGastos] = useState([{ id: 'x' }]);//me daba un error, así lo solucione

    const getGastosList = async () => {
        const docRef = doc(db, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        //obtengo la coleccion de losgatos del usuario
        const array = [];
        const querySnapshot = await getDocs(collection(db, "users", auth.currentUser.uid, "gastos"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let obj = doc.data();

            obj.id = doc.id;
            array.push(obj);
            //console.log(obj);
            // console.log(doc.data());
        });
        setArrayGastos(array);
    }

    const CancelModal = () => {
        setDescription('')
        setValor('')
        setModalVisibleAdd(false)
    }

    const CreateGasto = async () => {
        if (desc === '' && valor === '') {
            alert('Fields requiered')
        } else {
            setLoading(true)
            try {

                let objNew = {
                    desc: desc,
                    valor: Number(valor),
                    created: Timestamp.now()
                }
                const docRef = await addDoc(collection(db, 'users', auth.currentUser.uid, 'gastos'), objNew)
                getGastosList()
                setDescription('')
                setValor('')
                setModalVisibleAdd(false)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error(error);
            }
        }
    }

    const deleteGasto = async (idGasto) => {
        try {
            setLoading(true)
            const docRef = doc(db, ('users/' + auth.currentUser.uid + '/gastos/' + idGasto))
            await deleteDoc(docRef);
            getGastosList()
            setLoading(false)
            // props.navigation.navigate('UsersList');
        } catch (error) {
            console.log(error);
        }
    }
    const onLogoutPress = () => {
        signOut(auth)
    }
    const RedirectVMCreateGasto = () => {
        //props.navigation.navigate('CreateGastoScreen');
        ///abrir moDal create
        console.log('abrir modal')
        setModalVisibleAdd(true)
    }

    useEffect(() => {
        console.log('useEffect');
        const array = [];

        async function getDataUser() {
            console.log('use')
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
                //console.log(obj);
                // console.log(doc.data());
            });

            setLoading(false)
        }

        getDataUser();
        setArrayGastos(array);
        return () => {
            //console.log('limpiando');
            setArrayGastos([])
        }
    }, [])

    if (loading) {
        return (
            <CustomLoading></CustomLoading>
        )
    }

    return (
        <View>
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisibleAdd}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisibleAdd(!modalVisibleAdd);
                    }}
                >

                    <View style={styles.centeredView}>
                        <Text style={styles.title}>Create Record</Text>
                        <CustomInput
                            placeholder="Description"
                            value={desc}
                            setValue={setDescription} />
                        <CustomInput
                            placeholder="Valor"
                            value={valor}
                            setValue={setValor} />

                        <CustomButton
                            text={"Aceptar"}
                            onPress={CreateGasto}
                            type="PRIMARY"
                        ></CustomButton>
                        <CustomButton
                            text={"Cancelar"}
                            onPress={CancelModal}
                            type="CANCEL"
                        ></CustomButton>
                    </View>
                </Modal>
            </View >




            <View style={styles.root}>
                <Text style={styles.title}>{username}</Text>
                <Text style={styles.title}>{email}</Text>
                <Text style={styles.subtitle}>UID: {userId}</Text>

                <CustomButton
                    text={"LOGOUT"}
                    onPress={onLogoutPress}
                ></CustomButton>
            </View>

            <CustomButton
                text={"CREATE"}
                onPress={RedirectVMCreateGasto}
            ></CustomButton>

            <ScrollView>
                {
                    arrayGastos.map(gasto => {
                        return (
                            <ListItem
                                key={gasto.id}
                                bottomDivider
                                onPress={() => { console.log(gasto) }}
                                onLongPress={() => {
                                    console.log(gasto.id)
                                    Alert.alert('Delete Record ', gasto.desc, [
                                        { text: 'Yes', onPress: () => deleteGasto(gasto.id) },
                                        { text: 'No', onPress: () => { } }
                                    ])
                                }}

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

        </View >
    )



}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#051C60",
        margin: 10,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#051C60",
        margin: 2,
    },
    root: {
        marginVertical: 10,
        alignItems: "center",
        padding: 30,
    },
    rootScroll: {
        padding: 4,
        backgroundColor: "grey"
    },
    containerModal: {
        flex: 1,
        padding: 35
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        padding: 10,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
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
    },
    contenedorbotones: {
        flexDirection: "row",
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "space-between"
    },
})

export default HomeScreen