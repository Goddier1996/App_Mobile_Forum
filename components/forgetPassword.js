import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from "react";
import { API } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import Icon from 'react-native-vector-icons/FontAwesome';


// this component user forget password and create new , use this component in Login page
export default function ForgetPassword(props) {


    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const [Nameuser, setNameuser] = useState();


    // Alerts popUp
    const [modalVisibleInputAllValue, setModalVisibleInputAllValue] = useState(false);
    const [modalVisibleInputPassword, setModalVisibleInputPassword] = useState(false);
    const [modalVisibleNoHaveThisUser, setModalVisibleNoHaveThisUser] = useState(false);
    const [modalVisibleYourPasswordWas, setModalVisibleYourPasswordWas] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);



    // connecy user to forget password , and save the id in AsyncStorage to create new password
    const SignInForgetPassword = async () => {

        if (Email == '') {

            // alert
            setModalVisibleInputAllValue(true)

            return;
        }

        else {

            try {

                let user =
                {
                    Email: Email,
                };

                let res = await fetch(API.USERS.FORGET, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });


                let data = await res.json();


                // if dont have this email in data base show alert
                if (data == null) {

                    // alert
                    setModalVisibleNoHaveThisUser(true);

                    return
                }


                else {

                    // data from data base , save in AsyncStorage for chnage to new password user
                    let storgeUser =
                    {
                        idUser: data._id,
                        NameUser: data.Name,
                        Password: data.Password
                    }

                    AsyncStorage.setItem('userForgetPassword', JSON.stringify(storgeUser))

                    let savedUser = await AsyncStorage.getItem("userForgetPassword");
                    let currentUser = JSON.parse(savedUser);

                    setNameuser(currentUser.NameUser)

                    setModalVisible(true)
                }

            } catch (error) {
                console.log(error);
            }
        }
    }


    // create a new password user
    const CreateNewPassword = async () => {

        let savedUser = await AsyncStorage.getItem("userForgetPassword");
        let currentUser = JSON.parse(savedUser);


        if (currentUser.Password == Password) {

            // alert("This is your password now !")

            // alert
            setModalVisibleYourPasswordWas(true)

            return;
        }


        else if (Password == '') {

            // alert("This is your password now !")

            // alert
            setModalVisibleInputPassword(true)

            return;
        }


        else {

            try {
                let user = {
                    Password: Password,
                }

                await fetch(`${API.USERS.GET}/${currentUser.idUser}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

                await AsyncStorage.clear();

                await Updates.reloadAsync();

                // DevSettings.reload()

            } catch (error) {
                console.log(error)
            }
        }

    }


    // close a popUP
    const ClosePopup = async () => {

        await Updates.reloadAsync();
    }



    return (

        <>

            {/* pop up input email to find user how chnage a password */}

            <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    {/* close popUP */}
                    <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => props.hideModelForgetPassword()}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                    </TouchableOpacity>

                    <Text style={styles.Text}>Please input Your Email :{'\n'}</Text>

                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            autoCapitalize={false}
                            placeholder="Email"
                            onChangeText={setEmail}
                            value={Email}
                            keyboardType='email-address'
                        />
                    </View>


                    <TouchableOpacity
                        style={[styles.button, styles.buttonChange]} onPress={SignInForgetPassword}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Change Password</Text>
                    </TouchableOpacity>




                </View>
            </View>





            {/* pop up chnage password */}

            <View>
                <Modal
                    animationType="slide"
                    transparent={true}

                    visible={modalVisible}>

                    <View style={styles.centeredView}>

                        <View style={styles.modalView}>

                            {/* close popUP */}
                            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={ClosePopup}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
                            </TouchableOpacity>

                            <Text style={styles.Text}>Hello {Nameuser} :){'\n'}</Text>
                            <Text style={styles.Text}>Input new Password Please{'\n'}</Text>


                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize={false}
                                    secureTextEntry={true}
                                    placeholder="password"
                                    onChangeText={setPassword}
                                    value={Password}
                                    keyboardType='numeric'
                                />
                            </View>



                            <TouchableOpacity
                                style={[styles.button, styles.buttonChange]} onPress={CreateNewPassword}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Save New Password</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>

            </View>





            {/* Alerts */}

            {/*  forget passwort popup , Input all value alert  */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleInputAllValue}>

                <View style={styles.centeredViewWarring}>
                    <View style={styles.modalViewWarring}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitleWarring}>Warning</Text>
                        <Text style={styles.modalTextWarring}>Input Please your Email</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLoseWarring}
                            onPress={() => setModalVisibleInputAllValue(!modalVisibleInputAllValue)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>



            {/*  forget passwort popup , No have this user in data base value alert  */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleNoHaveThisUser}>

                <View style={styles.centeredViewWarring}>
                    <View style={styles.modalViewWarring}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitleWarring}>Warning</Text>
                        <Text style={styles.modalTextWarring}>No Have This User in</Text>
                        <Text style={styles.modalTextWarring}>Data base</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLoseWarring}
                            onPress={() => setModalVisibleNoHaveThisUser(!modalVisibleNoHaveThisUser)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>



            {/*  forget passwort popup ,this is your password now  in data base value alert  */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleYourPasswordWas}>

                <View style={styles.centeredViewWarring}>
                    <View style={styles.modalViewWarring}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitleWarring}>Warning</Text>
                        <Text style={styles.modalTextWarring}>This is your Password now </Text>


                        <TouchableOpacity
                            style={styles.textStyleCLoseWarring}
                            onPress={() => setModalVisibleYourPasswordWas(!modalVisibleYourPasswordWas)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>



            {/*  forget passwort popup ,input Password value alert  */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleInputPassword}>

                <View style={styles.centeredViewWarring}>
                    <View style={styles.modalViewWarring}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitleWarring}>Warning</Text>
                        <Text style={styles.modalTextWarring}>Input New Password </Text>


                        <TouchableOpacity
                            style={styles.textStyleCLoseWarring}
                            onPress={() => setModalVisibleInputPassword(!modalVisibleInputPassword)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>


        </>
    );
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


    // popup chnage password
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
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    buttonChange: {
        backgroundColor: "#24C746",
        marginTop: 22,
    },
    buttonClose: {
        backgroundColor: "red",
        bottom: 40,
        marginLeft: 180
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: '3#c466a',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 30
    },

    Text: {
        color: '3#c466a',
        fontSize: 16,
        marginBottom: 10,
        marginTop: -20
    },

    inputBox: {
        width: '100%',
        height: 40,
        borderRadius: 4,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 50,
        justifyContent: "center",
    },
});