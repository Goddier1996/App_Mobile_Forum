import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ImageBackground, Pressable, Modal, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LoadAllTopicsCategory } from "../Api/LoadDataFromApi";
import { AddTopic } from "../Api/AddUpdateDataFromApi";



// Topic Page show all Topics and add new Topic
export default function Topic() {


    const [topics, SetTopics] = useState([])

    const [titleCategory, SetTitleCategory] = useState()
    const [imageCategory, SetImageCategory] = useState()

    const [userData, SetUserData] = useState('')

    const [NewTopic, setNewTopic] = useState('');
    const [MessageTopic, setMessageTopic] = useState('');

    const route = useRoute();

    const navigation = useNavigation();

    // Alerts popUp
    const [modalVisibleInputAllValue, setModalVisibleInputAllValue] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);



    // load all topics Category what user chioose
    const LoadAllTopicsIdCategory = async () => {

        let idCategory = route.params.id

        SetTopics(await LoadAllTopicsCategory(idCategory));
    }



    // move to meesage Page and send data
    const GoToMeesageTopic = async (idTopic, nameTopic) => {

        let nameCategory = route.params.name

        navigation.navigate("Message", { id: idTopic, name: nameTopic, CategoryName: nameCategory })
    }



    // get data from AsyncStorage check if user connect or not
    const getData = async () => {

        let value = await AsyncStorage.getItem('user')

        const userData = JSON.parse(value)

        SetUserData(userData)
    }



    // check if all value was input when add new topic
    const checkImputAddNewTopic = async () => {

        if (NewTopic == '' || MessageTopic == '') {

            // alert
            setModalVisibleInputAllValue(true)
            return
        }

        else {

            AddNewTopic()
        }
    }



    // add new topic tp data base
    const AddNewTopic = async () => {

        let d = new Date();
        let idCategory = route.params.id

        let Topic = {
            nameTopic: NewTopic,
            MessageForTopic: MessageTopic,
            DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
            Publish_by: userData.idUser,
            imageUser: userData.FotoUser,
            codeCategory: idCategory,
            NameUser: userData.NameUser,
            titleCategory: titleCategory
        };

        await AddTopic(Topic);

        navigation.navigate("Home")
    }



    // move to page Login
    const signInGoToLoginPage = async () => {

        navigation.navigate("Login")
    }




    useEffect(() => {

        getData()
        LoadAllTopicsIdCategory()

        // take params from Home page Category data
        let nameCategory = route.params.name
        SetTitleCategory(nameCategory)

        let imageCategory = route.params.topicImage
        SetImageCategory(imageCategory)
    }, [])




    if (userData != null) {

        return (
            <>
                <ImageBackground source={{ uri: "https://i.postimg.cc/sfKm58XJ/download.jpg" }} style={{ width: '100%', height: '100%' }}>


                    <ImageBackground source={{ uri: imageCategory }} style={{ width: '100%', height: '40%', marginTop: 20 }}></ImageBackground>



                    {/* add Topic */}
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                        >

                            <View>
                                <ImageBackground source={{ uri: 'https://i.postimg.cc/sfKm58XJ/download.jpg' }} style={{ width: '100%', height: '100%' }}>

                                    <>
                                        <ScrollView>


                                            <View style={styles.closeBtn}>

                                                <Pressable
                                                    style={[styles.buttonClose]}
                                                    onPress={() => setModalVisible(!modalVisible)}
                                                >
                                                    <Text style={styles.textStyle}>X</Text>
                                                </Pressable>

                                            </View>


                                            <View style={styles.centerizedView}>
                                                <View style={styles.authBox}>

                                                    <Text style={styles.modalText}>Add new Topic :)</Text>

                                                    <SafeAreaView>

                                                        <View style={styles.inputBox}>
                                                            <TextInput

                                                                style={styles.input}
                                                                autoCapitalize={false}
                                                                onChangeText={setNewTopic}
                                                                value={NewTopic}
                                                                placeholder="Input Title Topic"
                                                                placeholderTextColor={'black'}
                                                            />
                                                        </View>


                                                        <View style={styles.inputBox}>
                                                            <TextInput
                                                                style={styles.textArea}
                                                                autoCapitalize={false}
                                                                keyboardType='default'
                                                                placeholder="Input your Message"
                                                                multiline={true}
                                                                numberOfLines={10}
                                                                onChangeText={setMessageTopic}
                                                                value={MessageTopic}
                                                                placeholderTextColor={'black'}
                                                            />

                                                        </View>
                                                    </SafeAreaView>

                                                </View>
                                            </View>


                                            <View style={styles.buttonClick}>

                                                <TouchableOpacity style={[styles.buttonAddTopic, styles.buttonAdd]}
                                                    onPress={() => checkImputAddNewTopic()}>

                                                    <Text style={styles.textStyle}>Let's Add Topic</Text>
                                                </TouchableOpacity>

                                            </View>

                                        </ScrollView>
                                    </>
                                </ImageBackground>
                            </View>

                        </Modal>


                        <TouchableOpacity style={[styles.buttonSignIn, styles.buttonSignInStyle]} onPress={() => setModalVisible(true)}>
                            <Text style={[styles.textStyle]}>Add New Topic</Text>
                        </TouchableOpacity>

                    </View>



                    {/* show all cards was in Topic */}
                    <View style={styles.container}>
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={topics}
                            renderItem={({ item }) => {
                                return (

                                    <TouchableOpacity style={styles.card} onPress={() => GoToMeesageTopic(item._id, item.nameTopic)}>
                                        <Image style={styles.image} source={{ uri: item.imageUser }} />

                                        <View style={styles.cardContent}>
                                            <Text style={styles.name}>{item.nameTopic}</Text>
                                            <Text style={styles.PublishBy}>Created by : {item.NameUser} </Text>
                                            <Text style={styles.timePublic}>Date Publish : {item.DatePublished}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>


                    <View style={styles.spaceFree}></View>

                </ImageBackground>





                {/* Alerts */}


                {/* add new Topic popup , Input all value alert  */}
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
                    <ImageBackground source={{ uri: imageCategory }} style={{ width: '100%', height: '40%', marginTop: 20 }}></ImageBackground>



                    <View style={styles.centeredView}>

                        <TouchableOpacity onPress={() => signInGoToLoginPage()} style={[styles.buttonSignIn, styles.buttonSignInStyle]}>
                            <Text style={styles.textStyle}>Sign In ( add new Topic )</Text>
                        </TouchableOpacity>

                    </View>



                    {/* show all cards was in Topic */}
                    <View style={styles.container}>
                        <FlatList
                            style={styles.contentList}
                            columnWrapperStyle={styles.listContainer}
                            data={topics}
                            renderItem={({ item }) => {
                                return (

                                    <TouchableOpacity style={styles.card} onPress={() => GoToMeesageTopic(item._id, item.nameTopic)}>

                                        <Image style={styles.image} source={{ uri: item.imageUser }} />


                                        <View style={styles.cardContent}>
                                            <Text style={styles.name}>{item.nameTopic}</Text>
                                            <Text style={styles.PublishBy}>Created by : {item.NameUser} </Text>
                                            <Text style={styles.timePublic}>Date Publish : {item.DatePublished}</Text>

                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>


                    <View style={styles.spaceFree}></View>


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


    container: {
        flex: 1,
        marginTop: 25,
    },
    contentList: {
        flex: 1,
    },
    cardContent: {
        marginTop: 15,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#ebf0f9",
        marginTop: 11,
    },
    card: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: 'rgba(128, 128, 128, 0.140)',
        padding: 15,
        flexDirection: 'row',
        borderRadius: 20,
    },
    name: {
        justifyContent: "center",
        fontSize: 16,
        flex: 1,
        alignSelf: 'center',
        color: "black",
        alignItems: 'center',
        marginRight: 40,
        color: "rgba(0, 0, 0, 0.575)",

    },
    timePublic: {
        marginLeft: 150,
        fontSize: 10,
        color: "rgba(0, 0, 0, 0.475)",
    },
    PublishBy: {
        marginLeft: -40,
        fontSize: 10,
        color: "rgba(0, 0, 0, 0.475)",
        top: 20
    },
    centeredView: {
        alignItems: "center",
        marginTop: -170,

    },
    buttonSignIn: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        top: 10
    },
    buttonSignInStyle: {
        backgroundColor: "#69B753",
    },
    buttonAdd: {
        backgroundColor: "#00b23d",
        marginTop: 150,
        shadowColor: "#000",
        width: "50%"
    },
    buttonAddTopic: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        top: 10
    },
    buttonOpen: {
        backgroundColor: "#69B753",
        top: 10
    },
    buttonClose: {
        backgroundColor: "#c11414",
        top: '150%',
        borderRadius: 20,
        padding: 8,
        elevation: 2,
        width: "50%"
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 40,
        textAlign: "center",
        color: "rgba(0, 0, 0, 0.475)",
        fontSize: 25
    },
    closeBtn: {
        marginLeft: "70%",
        marginTop: 10,
        alignItems: 'center'
    },
    authBox: {
        width: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 10,
        shadowColor: '#000',
    },
    centerizedView: {
        width: '100%',
        top: '20%',
    },
    input: {
        width: '100%',
        height: 60,
        backgroundColor: 'rgba(128, 128, 128, 0.200)',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    inputBox: {
        marginTop: 15,
    },
    textArea: {
        height: 200,
        backgroundColor: 'rgba(128, 128, 128, 0.200)',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    buttonClick: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    spaceFree: {
        marginTop: 55,
    }
}); 