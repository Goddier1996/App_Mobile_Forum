import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, TextInput, Modal } from 'react-native';
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoadMessageTopicInMessagePage, LoadAllMessagesIdTopic } from "../Api/LoadDataFromApi";
import { AddMessage } from "../Api/AddUpdateDataFromApi";



// comment page
export default function Message() {


    const [topicsMessage, SetTopicsMessage] = useState([])
    const [LoadMessageTopic, SetLoadMessageTopic] = useState([])

    const [DataUser, setDataUser] = useState('');
    const [Message, setMessage] = useState('');

    const [nameTopic, SetNameTopic] = useState()
    const [nameCategory, SetNameCategory] = useState()

    const route = useRoute();

    const navigation = useNavigation();

    // Alerts popUp
    const [modalVisibleInputAllValue, setModalVisibleInputAllValue] = useState(false);



    // get data user from AsyncStorage
    const getDataFromStorge = async () => {

        let value = await AsyncStorage.getItem('user')

        let info = JSON.parse(value)

        setDataUser(info)
    }



    // show  meesage from Topic,take params id from topic
    const LoadAllMessages = async () => {

        let idTopic = route.params.id;

        SetLoadMessageTopic(await LoadMessageTopicInMessagePage(idTopic));
        SetTopicsMessage(await LoadAllMessagesIdTopic(idTopic));
    }



    // move to login page
    const goToLoginPage = async () => {

        navigation.navigate("Login")
    }



    // check if have input value message
    const inputValueMessage = async () => {

        if (Message == '') {

            // alert
            setModalVisibleInputAllValue(true)
        }
        else {
            AddNewMessage()
        }
    }



    // add new meesage to data base
    const AddNewMessage = async () => {

        let d = new Date();
        let idTopic = route.params.id

        let message = {
            idTopicMessage: idTopic,
            MessageUser: Message,
            DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
            Publish_by: DataUser.idUser,
            NameUser: DataUser.NameUser,
            FotoUser: DataUser.FotoUser
        };

        await AddMessage(message);

        navigation.goBack();
    }



    useEffect(() => {

        LoadAllMessages();
        getDataFromStorge();

        // take params data from topic
        let nameTopic = route.params.name
        SetNameTopic(nameTopic)

        let nameCategory = route.params.CategoryName
        SetNameCategory(nameCategory)
    }, [])





    if (DataUser != null) {

        return (

            <>

                <ImageBackground source={{ uri: "https://i.postimg.cc/sfKm58XJ/download.jpg" }} style={{ width: '100%', height: '100%' }}>

                    <ScrollView>

                        <View style={styles.titleInfo}>

                            <Text style={styles.TextInfo}>
                                <Image style={{ width: 22, height: 22 }} source={{ uri: "https://i.postimg.cc/wBXwVd2K/categories.png" }} />
                                {''}  {nameCategory} {'>'}{' '}
                                <Image style={{ width: 22, height: 22 }} source={{ uri: "https://i.postimg.cc/YCgRrwJ4/trending-topic.png" }} />
                                {''} {nameTopic}
                            </Text>
                        </View>


                        {/* show message with topic */}
                        {LoadMessageTopic.map((item, i) =>

                            <View key={i} style={styles.container}>

                                <TouchableOpacity style={styles.borderImage} onPress={() => { }}>
                                    <Image style={styles.image} source={{ uri: item.imageUser }} />
                                    <Text style={styles.name}>{item.NameUser}</Text>
                                </TouchableOpacity>

                                <View style={styles.content}>

                                    <Text style={styles.message}>{item.MessageForTopic}</Text>

                                    <View style={styles.contentHeader}>
                                        <Text style={styles.time}>
                                            Date Publish : {item.DatePublished}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}



                        {/* show comments */}
                        {topicsMessage.map((item, i) =>

                            <View key={i} style={styles.container}>
                                <TouchableOpacity style={styles.borderImage} onPress={() => { }}>
                                    <Image style={styles.image} source={{ uri: item.FotoUser }} />
                                    <Text style={styles.name}>{item.NameUser}</Text>

                                </TouchableOpacity>

                                <View style={styles.content}>

                                    <Text style={styles.message}>{item.MessageUser}</Text>
                                    <View style={styles.contentHeader}>
                                        <Text style={styles.time}>
                                            Date Publish : {item.DatePublished}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}




                        {/* add new comment */}

                        <View style={styles.inputBox}>
                            <TextInput
                                style={styles.textArea}
                                autoCapitalize={false}
                                textContentType='text'
                                placeholder="Input your Message"
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={setMessage}
                                value={Message}
                                placeholderTextColor={'black'}
                            />

                            <TouchableOpacity
                                style={[styles.button, styles.buttonAdd]}
                                onPress={() => inputValueMessage()}
                            >
                                <Text style={styles.textStyle}>Let's Add Comment 😎</Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>

                </ImageBackground>






                {/* Alerts */}


                {/* message popup Input all value alert */}
                <Modal animationType="slide" transparent={true} visible={modalVisibleInputAllValue}>

                    <View style={styles.centeredViewWarring}>
                        <View style={styles.modalViewWarring}>

                            <Icon name="warning" size={80} color="#900" />

                            <Text style={styles.modalTextTitleWarring}>Warning</Text>
                            <Text style={styles.modalTextWarring}>Please Input all Value</Text>


                            <TouchableOpacity
                                style={styles.textStyleCLoseWarring}
                                onPress={() => setModalVisibleInputAllValue(!modalVisibleInputAllValue)}>
                                <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Modal>


            </>
        );
    }



    else {

        return (
            <>

                <ImageBackground source={{ uri: "https://i.postimg.cc/sfKm58XJ/download.jpg" }} style={{ width: '100%', height: '100%' }}>


                    <ScrollView>

                        <View style={styles.titleInfo}>

                            <Text style={styles.TextInfo}>
                                <Image style={{ width: 22, height: 22 }} source={{ uri: "https://i.postimg.cc/wBXwVd2K/categories.png" }} />
                                {''}  {nameCategory} {'>'}{' '}
                                <Image style={{ width: 22, height: 22 }} source={{ uri: "https://i.postimg.cc/YCgRrwJ4/trending-topic.png" }} />
                                {''} {nameTopic}
                            </Text>
                        </View>


                        {/* show message with topic */}
                        {LoadMessageTopic.map((item, i) =>

                            <View key={i} style={styles.container}>
                                <TouchableOpacity style={styles.borderImage} onPress={() => { }}>

                                    <Image style={styles.image} source={{ uri: item.imageUser }} />
                                    <Text style={styles.name}>{item.NameUser}</Text>

                                </TouchableOpacity>
                                <View style={styles.content}>

                                    <Text style={styles.message}>{item.MessageForTopic}</Text>

                                    <View style={styles.contentHeader}>
                                        <Text style={styles.time}>
                                            Date Publish : {item.DatePublished}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        )}



                        {/* show comments */}
                        {topicsMessage.map((item, i) =>

                            <View key={i} style={styles.container}>
                                <TouchableOpacity style={styles.borderImage} onPress={() => { }}>
                                    <Image style={styles.image} source={{ uri: item.FotoUser }} />
                                    <Text style={styles.name}>{item.NameUser}</Text>

                                </TouchableOpacity>
                                <View style={styles.content}>

                                    <Text style={styles.message}>{item.MessageUser}</Text>

                                    <View style={styles.contentHeader}>
                                        <Text style={styles.time}>
                                            Date Publish : {item.DatePublished}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}




                        <View style={styles.dontConnectTitle}>
                            <Text>if you wants to send message in this topic: </Text>

                            <TouchableOpacity onPress={goToLoginPage}>
                                <Text style={styles.SignIn}>Please Sign In</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>

                </ImageBackground>
            </>
        );
    }

}




const styles = StyleSheet.create({
    // style alert popup
    centeredViewWarring: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },

    modalViewWarring: {
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
    modalTextTitleWarring: {
        color: '3#c466a',
        fontSize: 18,
        marginTop: 30
    },
    modalTextWarring: {
        color: '3#c466a',
        fontSize: 16,
        marginTop: 10
    },

    textStyleCLoseWarring: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red",
        paddingHorizontal: 30,
        paddingVertical: 10,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 50
    },





    titleInfo: {
        marginTop: 20,
        alignItems: 'center',
        borderRadius: 10,
        height: 45,
        justifyContent: "center",
        backgroundColor: 'rgba(128, 128, 128, 0.180)',
    },
    TextInfo: {
        fontSize: 17
    },
    dontConnectTitle: {
        marginTop: 50,
        marginBottom: 50,
        alignItems: 'center',
        borderRadius: 5,
        height: 80,
        justifyContent: "center",
        backgroundColor: 'rgba(128, 128, 128, 0.180)',
    },
    SignIn: {
        fontWeight: "bold",
        fontSize: 15
    },
    container: {
        margin: 20,
        paddingLeft: 19,
        paddingRight: 36,
        paddingVertical: 22,
        flexDirection: 'row',
        marginTop: 35,
        marginBottom: -18,
        borderRadius: 5,
        backgroundColor: 'rgba(128, 128, 128, 0.140)',
        borderTopRightRadius: 70,
        borderBottomLeftRadius: 70,
    },
    content: {
        marginLeft: 16,
        flex: 1,
    },
    contentHeader: {
        marginBottom: 15
    },
    separator: {
        height: 1,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: 2
    },
    time: {
        fontSize: 11,
        color: "rgba(0, 0, 0, 0.475)",
        marginLeft: "auto",
        top: 30
    },
    name: {
        fontSize: 13,
        color: "rgba(0, 0, 0, 0.575)"
    },
    message: {
        fontSize: 13,
        padding: 5,
        color: "rgba(0, 0, 0, 0.475)"
    },
    borderImage: {
        borderRightWidth: 1.8,
        padding: 10,
        borderColor: "gray",
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center"
    },
    buttonAdd: {
        backgroundColor: "#00b23d",
        top: '15%',
        marginBottom: 30,
        shadowColor: "#000",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    inputBox: {
        marginTop: 30,
        padding: 30
    },
    textArea: {
        height: 150,
        backgroundColor: 'rgba(128, 128, 128, 0.180)',
        borderRadius: 10,
        paddingHorizontal: 10,
    }
}); 