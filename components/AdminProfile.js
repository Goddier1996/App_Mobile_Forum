import { View, SafeAreaView, StyleSheet, Text, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import IconUser from 'react-native-vector-icons/MaterialCommunityIcons';
import { API } from '../API';
import * as Updates from 'expo-updates';


// use components
import ControlDeleteCategory from "./ControlDeleteCategory(Admin)";
import ControlDeleteMessages from "./ControlDeleteMessages(Admin)";
import ControlDeleteTopics from "./ControlDeleteTopics(Admin)";
import ControlDeleteUsers from "./ControlDeleteUsers(Admin)";
import AddNewCategory from "./AddNewCategory(Admin)";



// UserTypeCode 2 this is Admin Page use this component in ProfilePage
export default function AdminProfile() {


    const [user, SetUser] = useState([]);

    const [ShowCountTopicsUser, SetShowCountTopicsUser] = useState([]);
    const [ShowCountMessagesUser, SetShowCountMessagesUser] = useState([]);
    const [ShowCountCategory, SetShowCountCategory] = useState([]);
    const [ShowCountTopics, SetShowCountTopics] = useState([]);
    const [ShowCountMessages, SetCountMessages] = useState([]);
    const [ShowCountUsers, SetShowCountUsers] = useState([]);

    // pop up model 
    const [modalVisibleDeleteCategory, setModalVisibleDeleteCategory] = useState(false);
    const [modalVisibleDeleteMessages, setModalVisibleDeleteMessages] = useState(false);
    const [modalVisibleDeleteTopics, setModalVisibleDeleteTopics] = useState(false);
    const [modalVisibleDeleteUsers, setModalVisibleDeleteUsers] = useState(false);
    const [modalVisibleAddNewCagtegory, setModalVisibleAddNewCagtegory] = useState(false);



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

        let res = await fetch(`${API.USERS.GET}/${currentUser.idUser}`, { method: 'GET' });

        let data = await res.json();
        SetUser(data);
    }



    // here load count topics user with id
    const LoadCountTopicsUser = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        let res = await fetch(`${API.TOPICS.GET}/countTopicsUser/${currentUser.idUser}`, { method: 'GET' });

        let data = await res.json();

        SetShowCountTopicsUser(data)
    }



    const LoadCountMessagesUser = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        let res = await fetch(`${API.MESSAGES.GET}/countMessagesUser/${currentUser.idUser}`, { method: 'GET' });

        let data = await res.json();

        SetShowCountMessagesUser(data)
    }



    // count Categors 
    const LoadCountCategors = async () => {

        let res = await fetch(`${API.CATEGORY.GET}/countAllCategorys`, { method: 'GET' });

        let data = await res.json();

        SetShowCountCategory(data)
    }


    // count topics 
    const LoadCountTopics = async () => {

        let res = await fetch(`${API.TOPICS.GET}/countAllTopics`, { method: 'GET' });

        let data = await res.json();

        SetShowCountTopics(data)
    }



    // count Users 
    const LoadCountUsers = async () => {

        let res = await fetch(`${API.USERS.GET}/countAllUsers`, { method: 'GET' });

        let data = await res.json();

        SetShowCountUsers(data)
    }



    // count Message 
    const LoadCountMessages = async () => {

        let res = await fetch(`${API.MESSAGES.GET}/countMessagesAll`, { method: 'GET' });

        let data = await res.json();

        SetCountMessages(data)
    }



    // close model add new category in AddNewCategory.js
    const hideModelAddNewCategory = () => {

        setModalVisibleAddNewCagtegory(false);
    }



    // close model delete category in ControlDeleteCategory.js
    const hideModelDeleteCategory = () => {

        setModalVisibleDeleteCategory(false);
    }



    // close model delete topics in ControlDeleteTopics.js
    const hideModelDeleteTopics = () => {

        setModalVisibleDeleteTopics(false);
    }



    // close model delete messages in ControlDeleteMessages.js
    const hideModelDeleteMessages = () => {

        setModalVisibleDeleteMessages(false);
    }



    // close model delete users in ControlDeleteUsers.js
    const hideModelDeleteUsers = () => {

        setModalVisibleDeleteUsers(false);
    }



    useEffect(() => {
        LoadCountTopicsUser()
        LoadCountMessagesUser()
        LoadCountCategors()
        LoadCountTopics()
        LoadCountUsers()
        LoadCountMessages()

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

                            </View>


                        </View>
                    </View>


                    <View style={styles.userInfoSection}>
                        <View style={styles.row}>
                            <IconUser name="login" color="#777777" size={20} />
                            <Text style={{ color: "#777777", marginLeft: 20 }}>{user.Login}</Text>
                        </View>


                        <View style={styles.row}>
                            <IconUser name="email" color="#777777" size={20} />
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
                        <Text style={styles.ControlTitle}>Control Data App :</Text>
                    </View>


                    <View style={styles.menuWrapper}>


                        {/* Category */}
                        <TouchableOpacity >

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText} onPress={() => setModalVisibleDeleteCategory(true)}>Click Control Category's - (Count : {ShowCountCategory})</Text>
                            </View>

                        </TouchableOpacity>

                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleDeleteCategory}
                            >

                                {/* compoent */}
                                <ControlDeleteCategory hideModelDeleteCategory={hideModelDeleteCategory} />

                            </Modal>
                        </View>




                        {/* Topics */}
                        <TouchableOpacity >

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText} onPress={() => setModalVisibleDeleteTopics(true)}>Click Control Topic's - (Count {ShowCountTopics})</Text>
                            </View>
                        </TouchableOpacity>

                        {/* model user topics user userTopics component */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleDeleteTopics}
                            >

                                {/* compoent */}
                                <ControlDeleteTopics hideModelDeleteTopics={hideModelDeleteTopics} />

                            </Modal>
                        </View>




                        {/* messages */}
                        <TouchableOpacity >

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText} onPress={() => setModalVisibleDeleteMessages(true)}>Click Control Message's - (Count {ShowCountMessages})</Text>
                            </View>
                        </TouchableOpacity>

                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleDeleteMessages}>

                                {/* compoent */}
                                <ControlDeleteMessages hideModelDeleteMessages={hideModelDeleteMessages} />

                            </Modal>
                        </View>




                        {/* Users */}
                        <TouchableOpacity >

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText} onPress={() => setModalVisibleDeleteUsers(true)}>Click Control User's - (Count {ShowCountUsers})</Text>
                            </View>
                        </TouchableOpacity>

                        {/* model user topics user userTopics compoents */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleDeleteUsers}>

                                {/* compoent */}
                                <ControlDeleteUsers hideModelDeleteUsers={hideModelDeleteUsers} />

                            </Modal>
                        </View>




                        {/* add new Category */}
                        <TouchableOpacity >

                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText} onPress={() => setModalVisibleAddNewCagtegory(true)}>Click Add New Category</Text>
                            </View>

                        </TouchableOpacity>

                        {/* model user topics user userTopics compoents */}
                        <View >
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisibleAddNewCagtegory}>

                                {/* compoent */}
                                <AddNewCategory hideModelAddCategory={hideModelAddNewCategory} />

                            </Modal>
                        </View>



                    </View>
                </SafeAreaView>


            </ImageBackground>
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
        paddingVertical: 12,
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
    }
});