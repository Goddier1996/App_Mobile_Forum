import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconAlert from 'react-native-vector-icons/FontAwesome';
// use components
import UserTopic from "./userTopics";
import UserMessages from "./userMessages";
import UpdatePersonalDetails from "./UpdatePersonalDetails";
import { LoadUserFromDataBase, CountTopicsUser, CountMessagesUser } from "../Api/LoadDataFromApi";



// UserTypeCode 1 this is Public user how Register this App can to do All! and update personal details :)
export default function UserProfile() {


    const [user, SetUser] = useState([]);

    const [ShowCountTopicsUser, SetShowCountTopicsUser] = useState([]);
    const [ShowCountMessagesUser, SetShowCountMessagesUser] = useState([]);

    // pop up model topics and messages user
    const [modalVisibleTopic, setModalVisibleTopic] = useState(false);
    const [modalVisibleMessages, setModalVisibleMessages] = useState(false);

    // alert demo user cant update data !
    const [modalVisibleDemoUserCantUpdate, setModalVisibleDemoUserCantUpdate] = useState(false);


    // Update User Info
    const [modalVisibleUpdateUserInfo, setModalVisibleUpdateUserInfo] = useState(false);


    // log out from profile user page , and remove data from AsyncStorage
    const clearStorage = async () => {

        await AsyncStorage.clear();
        // DevSettings.reload()
        await Updates.reloadAsync();
    };


    // load user from data base
    const LoadUser = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        SetUser(await LoadUserFromDataBase(currentUser.idUser));
    }



    // here load count topics , messages with id user
    const LoadCountUserIdDataTopicsMessages = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        SetShowCountTopicsUser(await CountTopicsUser(currentUser.idUser));
        SetShowCountMessagesUser(await CountMessagesUser(currentUser.idUser))
    }



    // close model delete topics user in UserTopic.js
    const hideModelDeleteTopicsUser = () => {

        setModalVisibleTopic(false);
    }



    // close model delete messages user in UserMessages.js
    const hideModelUpdateUserInfo = () => {

        setModalVisibleUpdateUserInfo(false);
    }



    // close model delete messages user in UserMessages.js
    const hideModelDeleteMessagesUser = () => {

        setModalVisibleMessages(false);
    }



    // create this , send to component UpdatePersonalDetails data info
    const objUserData = {

        code: user._id,
        name: user.Name,
        login: user.Login,
        email: user.Email,
        password: user.Password,
        foto: user.FotoUser,
    }



    // check type user , if type was 3 this is demo user can he cant updated data
    const checkTypeUser = async () => {

        if (user.UserTypeCode != "3") {

            setModalVisibleUpdateUserInfo(true);
        }

        else {
            // show alert
            setModalVisibleDemoUserCantUpdate(true);
            return;
        }
    }




    useEffect(() => {

        LoadCountUserIdDataTopicsMessages();
        LoadUser()
    }, [])




    return (
        <>

            <ImageBackground source={{ uri: "https://i.postimg.cc/sfKm58XJ/download.jpg" }} style={{ width: '100%', height: '100%' }}>


                <TouchableOpacity style={styles.buttonLogOut} onPress={clearStorage}>
                    <Text style={styles.caption}>Log out</Text>
                </TouchableOpacity>


                <SafeAreaView style={styles.container}>

                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>

                            <Image
                                style={{ height: 80, width: 80 }}
                                source={{ uri: user.FotoUser }} />
                            <View style={{ marginLeft: 20 }}>


                                <Text style={[styles.title, {
                                    marginTop: 15,
                                    marginBottom: 5,
                                }]}>Hello {user.Name}</Text>
                                {/* <Text style={styles.caption}>{user.Login}</Text> */}

                            </View>


                        </View>
                    </View>


                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <Icon name="login" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.Login}</Text>
                        </View>


                        <View style={styles.row}>
                            <Icon name="email" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.Email}</Text>
                        </View>
                    </View>


                    <View style={styles.infoBoxWrapper}>
                        <View style={[styles.infoBox, {
                            borderRightColor: '#dddddd',
                            borderRightWidth: 1
                        }]}>
                            <Text>{ShowCountTopicsUser}</Text>
                            <Text>Count Your Topics</Text>
                        </View>
                        <View style={styles.infoBox}>
                            <Text>{ShowCountMessagesUser}</Text>
                            <Text>Count Your Messages</Text>
                        </View>
                    </View>



                    <View style={styles.Control}>
                        <Text style={styles.ControlTitle}>Control My Data :</Text>
                    </View>



                    <View style={styles.menuWrapper}>


                        {/* Update Personal Details */}
                        <TouchableOpacity onPress={() => checkTypeUser()}>

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Click Update Personal Details</Text>
                            </View>

                        </TouchableOpacity>

                        {/* model user topics user userTopics component */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleUpdateUserInfo}
                            >

                                {/* compoent */}
                                <UpdatePersonalDetails UserInfo={objUserData} hideModelUpdateUserInfo={hideModelUpdateUserInfo} />

                            </Modal>
                        </View>


                        

                        {/* Topics */}
                        <TouchableOpacity onPress={() => setModalVisibleTopic(true)}>

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Click My Topics</Text>
                            </View>
                        </TouchableOpacity>

                        {/* model user topics user userTopics component */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleTopic}
                            >

                                <UserTopic hideModelDeleteTopicsUser={hideModelDeleteTopicsUser} />

                            </Modal>
                        </View>




                        {/* messages */}
                        <TouchableOpacity onPress={() => setModalVisibleMessages(true)}>

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Click My Messages</Text>
                            </View>

                        </TouchableOpacity>


                        {/* model user topics user userTopics compoents */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleMessages}>

                                <UserMessages hideModelDeleteMessagesUser={hideModelDeleteMessagesUser} />

                            </Modal>
                        </View>

                    </View>
                </SafeAreaView>


            </ImageBackground>


            

            {/* Alerts */}

            {/* Demo User Can't Update Personal Details*/}
            <Modal animationType="slide" transparent={true} visible={modalVisibleDemoUserCantUpdate}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <IconAlert name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitle}>Warning</Text>
                        <Text style={styles.modalText}>Demo User Can't Update</Text>
                        <Text style={styles.modalText}>Personal Details</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLose}
                            onPress={() => setModalVisibleDemoUserCantUpdate(!modalVisibleDemoUserCantUpdate)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
        </>
    );
};




const styles = StyleSheet.create({

    container: {
        flex: 1,
        top: 40
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 20,
        top: 15
    },
    caption: {
        fontSize: 16,
        color: "white"
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 25,
    },
    buttonLogOut: {
        marginLeft: 260,
        top: 60,
        width: "25%",
        backgroundColor: "red",
        alignItems: "center",
        height: "4%",
        justifyContent: "center",
        borderRadius: 50
    },

    Control: {
        alignItems: "center",
        marginTop: 40,
    },
    ControlTitle: {
        fontSize: 16,
        fontWeight: "500"
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

    image: {
        width: 60,
        height: 60,
    },

    box: {
        width: "100%",
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        shadowColor: 'black',
        shadowOpacity: .2,
        shadowOffset: {
            height: 1,
            width: -2
        },
        elevation: 2
    },
    username: {
        color: "#20B2AA",
        fontSize: 22,
        alignSelf: 'center',
        marginLeft: 10
    },
    iconContent: {
        width: 60,
        height: 60,
        backgroundColor: '#40E0D0',
        marginLeft: 'auto',
        alignItems: 'center'
    },
    icon: {
        width: 40,
        height: 40,
    },

    // style alert popup
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    modalView: {
        width: 320,
        height: 330,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "center",

    },
    modalTextTitle: {
        color: '3#c466a',
        fontSize: 18,
        marginTop: 30
    },
    modalText: {
        color: '3#c466a',
        fontSize: 16,
        marginTop: 10
    },

    textStyleCLose: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 50
    },
});