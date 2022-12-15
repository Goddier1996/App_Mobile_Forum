import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import { API } from '../API';
import * as Updates from 'expo-updates';



// user all Topics id user
export default function UserTopic() {

    const [TopicsUser, SetTopicsUser] = useState([]);


    const LoadTopicsUser = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        let res = await fetch(`${API.TOPICS.GET}/PublishBy/${currentUser.idUser}`, { method: 'GET' });

        let data = await res.json();

        SetTopicsUser(data)
    }


    // close a popUP
    const ClosePopup = async () => {

        // DevSettings.reload()
        await Updates.reloadAsync();
    }



    // user delete from data base Topic
    const DeleteTopic = async (id) => {

        let res = await fetch(`${API.TOPICS.GET}/${id}`, { method: 'DELETE' });

        await Updates.reloadAsync();

        // DevSettings.reload()
    }




    useEffect(() => {
        LoadTopicsUser()
    }, [])




    return (
        <>


            <View style={styles.centeredView}>

                <View style={styles.modalView}>


                    <View >

                        {/* close popUP */}
                        <TouchableOpacity style={[styles.buttonClose]} onPress={ClosePopup}>
                            <Text style={styles.Close}>X</Text>
                        </TouchableOpacity>


                        <View style={styles.titleTopicUser}>
                            <Text style={styles.title}>All My Topics 😉</Text>
                            <Text style={styles.infotitle}>*you can Delete your Topics here</Text>
                        </View>



                        <FlatList
                            style={styles.notificationList}
                            enableEmptySections={true}
                            data={TopicsUser}

                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.notificationBox}>

                                        <TouchableOpacity onPress={() => DeleteTopic(item._id)}>
                                            <Image style={styles.icon} source={{ uri: 'https://i.postimg.cc/nVg1pYzV/icons8-recycle-bin-64.png' }} />
                                        </TouchableOpacity>

                                        <Text style={styles.date}>{item.DatePublished}</Text>

                                        <Text style={styles.description}>{item.nameTopic}</Text>
                                    </View>
                                )
                            }} />


                    </View>
                </View>

            </View>


        </>
    );
};



const styles = StyleSheet.create({

    titleTopicUser: {
        alignItems: "center",
        marginBottom: 50
    },
    title: {
        fontSize: 17
    },
    infotitle: {
        fontSize: 12
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalView: {
        width: "90%",
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
    buttonClose: {
        top: -20
    },
    Close: {
        color: "black",
        fontSize: 25,
        marginLeft: 230,
    },
    notificationList: {
        marginTop: 10,
    },
    notificationBox: {
        marginTop: 5,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        elevation: 2,
        borderWidth: 2,
        borderColor: "rgba(128, 128, 128, 0.237)",
        borderRadius: 10,
        padding: 10
    },
    icon: {
        width: 35,
        height: 35,
        marginLeft: 215,
    },
    date: {
        color: "rgba(0, 0, 0, 0.475)",
        fontSize: 10,
        marginLeft: 10,
        marginBottom: 10,
        top: -30
    },
    description: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.475)",
        marginLeft: 10,
    },
});