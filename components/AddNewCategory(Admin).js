import { View, StyleSheet, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { useState } from "react";
import * as Updates from 'expo-updates';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DevSettings } from 'react-native';
import { API } from '../API';
import React from 'react';



// Admin add new Category
export default function AddNewCategory() {


    // popup Alert
    const [modalVisibleInputAllValue, setModalVisibleInputAllValue] = useState(false);
    const [modalVisibleUrl, setModalVisibleUrl] = useState(false);


    const [title, setTitle] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState('');
    const [imageTopic, setImageTopic] = useState('');





    //check url input image
    const isValidUrl = urlString => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }




    // cheack value input and url link
    const checkInputValue = async () => {


        let x = isValidUrl(image)
        let x1 = isValidUrl(imageTopic)


        if (title == '' || color == '' || image == '' || imageTopic == '') {

            // alert("input please all value")
            setModalVisibleInputAllValue(true)
        }

        else if (x == false || x1 == false) {

            // alert("Url link not Good !")

            setModalVisibleUrl(true)
        }


        else {
            AddCategory()
        }

    }




    const AddCategory = async () => {


        try {

            let category = {
                title: title,
                color: color,
                image: image,
                imageTopic: imageTopic,
            };


            let res = await fetch(API.CATEGORY.POST, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            });

            // refershPage
            // DevSettings.reload()
            await Updates.reloadAsync();

        } catch (error) {
            console.log(error);
        }

    }




    // close a popUP
    const ClosePopup = async () => {

        // DevSettings.reload()
        await Updates.reloadAsync();
    }





    return (
        <>

            <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    <View >

                        {/* close popUP */}
                        <TouchableOpacity style={[styles.buttonClose]} onPress={ClosePopup}>
                            <Text style={styles.Close}>X</Text>
                        </TouchableOpacity>


                        <View style={styles.titleCategoryUser}>
                            <Text style={styles.title}>Add New Category :</Text>
                        </View>



                        <View >

                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize={false}
                                    onChangeText={setTitle}
                                    value={title}
                                    placeholder="Title"
                                    keyboardType='default'
                                    placeholderTextColor={'black'}
                                />
                            </View>


                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize={false}
                                    placeholder="Color"
                                    onChangeText={setColor}
                                    value={color}
                                    keyboardType='default'
                                    placeholderTextColor={'black'}
                                />


                            </View>




                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize={false}
                                    placeholder="Foto Link Category"
                                    onChangeText={setImage}
                                    value={image}
                                    keyboardType='url'
                                    placeholderTextColor={'black'}
                                />
                            </View>



                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize={false}
                                    placeholder="Foto Link Topic"
                                    onChangeText={setImageTopic}
                                    value={imageTopic}
                                    keyboardType='url'
                                    placeholderTextColor={'black'}
                                />
                            </View>


                        </View>


                        <View style={styles.buttonClick}>
                            <TouchableOpacity style={styles.ChangeButton}>
                                <Text style={styles.ChangeButtonText} onPress={checkInputValue} >Add</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>

            </View>







            {/* Alerts */}


            {/*  input value category ,  alert  */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleInputAllValue}>

                <View style={styles.centeredViewWarring}>
                    <View style={styles.modalViewWarring}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitleWarring}>Warning</Text>
                        <Text style={styles.modalTextWarring}>Input Please all Value</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLoseWarring}
                            onPress={() => setModalVisibleInputAllValue(!modalVisibleInputAllValue)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>




            {/*  input value url link ,  alert  */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleUrl}>

                <View style={styles.centeredViewWarring}>
                    <View style={styles.modalViewWarring}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitleWarring}>Warning</Text>
                        <Text style={styles.modalTextWarring}>Url link not Good</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLoseWarring}
                            onPress={() => setModalVisibleUrl(!modalVisibleUrl)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>


        </>
    );
};







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



    titleCategoryUser: {
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
    imageCategory: {
        color: "rgba(0, 0, 0, 0.475)",
        width: 35,
        height: 35,
        marginLeft: 10,
        top: -30
    },
    description: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.475)",
        marginLeft: 10,
    },


    input: {
        width: 300,
        height: 45,
        backgroundColor: 'rgba(128, 128, 128, 0.140)',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    inputBox: {
        marginTop: 10,
    },

    buttonClick: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    ChangeButton: {
        backgroundColor: '#e48a33',
        marginTop: 50,
        paddingVertical: 8,
        borderRadius: 4,
        width: 150,
    },
    ChangeButtonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});