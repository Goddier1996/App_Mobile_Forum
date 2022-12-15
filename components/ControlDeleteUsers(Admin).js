import { View, StyleSheet, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from "react";
import { DevSettings } from 'react-native';
import { API } from '../API';
import React from 'react';
import * as Updates from 'expo-updates';


// here control users Admin Delete
export default function ControlDeleteUsers() {

    const [users, SetUsers] = useState([]);


    // show all users from data base
    const LoadAllUsers = async () => {

        let res = await fetch(API.USERS.GET, { method: 'GET' });
        let data = await res.json();

        SetUsers(data);
    }


    // close a popUP
    const ClosePopup = async () => {

        await Updates.reloadAsync();

        // DevSettings.reload()
    }



    //  delete user from data base
    const DeleteUser = async (id) => {

        let res = await fetch(`${API.USERS.GET}/${id}`, { method: 'DELETE' });

        await Updates.reloadAsync();

        // DevSettings.reload()
    }



    useEffect(() => {
        LoadAllUsers()
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
                            <Text style={styles.title}>All Users</Text>
                            <Text style={styles.infotitle}>*you can here Delete users </Text>

                        </View>



                        <FlatList
                            style={styles.notificationList}
                            enableEmptySections={true}
                            data={users}

                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.notificationBox}>


                                        <TouchableOpacity onPress={() => DeleteUser(item._id)}>
                                            <Image style={styles.icon} source={{ uri: 'https://i.postimg.cc/nVg1pYzV/icons8-recycle-bin-64.png' }} />
                                        </TouchableOpacity>


                                        <Image style={styles.imageCategory} source={{ uri: item.FotoUser }} />

                                        <Text style={styles.description}>Login :{item.Login}</Text>
                                        <Text style={styles.description}>Name :{item.Name}</Text>
                                        <Text style={styles.description}>Email: {item.Email}</Text>
                                        <Text style={styles.description}>Gender: {item.Gender}</Text>

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
        top: -20,
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
        fontSize: 12,
        color: "rgba(0, 0, 0, 0.475)",
        marginLeft: 10,
    },
    imageCategory: {
        color: "rgba(0, 0, 0, 0.475)",
        width: 35,
        height: 35,
        marginLeft: 10,
        top: -30
    },
});