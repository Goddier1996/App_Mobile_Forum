import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StyleSheet, ImageBackground, Modal } from 'react-native';
import { useState } from "react";
import * as Updates from 'expo-updates';
import { CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { AddNewUSer } from "../Api/AddUpdateDataFromApi";
import { checkIfHaveThisLoginInDataBase, checkIfHaveThisEmailInDataBase } from "../Api/LoadDataFromApi";



// Regiser page add new user to data base
export default function Register() {


    const [Login, setLogin] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [LinkFileFoto, setLinkFileFoto] = useState('');

    // chooise gender when register
    const [male, setMale] = useState(false);
    const [female, setFemale] = useState(false);
    const [gender, setGender] = useState('');

    const [checkIfHaveThisLogin, setCheckIfHaveThisLogin] = useState({});
    const [checkIfHaveThisEmail, setCheckIfHaveThisEmail] = useState({});

    // Alerts popUp
    const [modalVisibleInputAllValue, setModalVisibleInputAllValue] = useState(false);
    const [modalVisibleInputEmailDontGood, setModalVisibleInputEmailDontGood] = useState(false);
    const [modalVisibleInputPasswordNotGood, setModalVisibleInputPasswordNotGood] = useState(false);
    const [modalVisibleHaveThisEmail, setModalVisibleHaveThisEmail] = useState(false);




    // select a gender
    const genderMale = () => {

        setMale(true)
        setFemale(false)
        setGender("Male")
    }


    const genderFemale = () => {

        setMale(false)
        setFemale(true)
        setGender("Female")
    }



    // check if have this email in data base or Login in data base
    const CheckIfHaveThisEmail = async () => {

        // check if have in data base this login
        setCheckIfHaveThisLogin(await checkIfHaveThisLoginInDataBase(Login));

        // check if have in data base this Email
        setCheckIfHaveThisEmail(await checkIfHaveThisEmailInDataBase(Email));


        if (checkIfHaveThisEmail == null) {

            if (checkIfHaveThisLogin == null) {
                await Register("NotHaveEmailOrLogin");
            }
        }

        else {
            await Register("HaveEmailOrLogin");
        }
    }



    // check input all value in register
    const checkInputValueRegister = async () => {

        // check if email input was Good
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (Login == '' || Name == '' || Password == '' || Email == '' || gender == '') {

            // alert
            setModalVisibleInputAllValue(true);
            return;
        }


        else if (mailformat.test(Email) == false) {

            // alert
            setModalVisibleInputEmailDontGood(true);
            return;
        }


        else if (Password.length < 6) {

            // alert
            setModalVisibleInputPasswordNotGood(true);
            return;
        }


        else {
            CheckIfHaveThisEmail();
        }
    }



    // add new user to data base , this function have data from CheckIfHaveThisEmail
    const Register = async (boolRes) => {

        if (boolRes == "NotHaveEmailOrLogin") {


            if (gender == "Male") {

                var user = {
                    Login: Login,
                    Name: Name,
                    Password: Password,
                    Email: Email,
                    FotoUser: "https://i.postimg.cc/NF66b95t/toppng-com-icons-logos-emojis-user-icon-png-transparent-2400x2305.png",
                    UserTypeCode: "1",
                    Gender: gender
                };
            }


            else if (gender == "Female") {

                var user = {
                    Login: Login,
                    Name: Name,
                    Password: Password,
                    Email: Email,
                    FotoUser: "https://i.postimg.cc/MGJWJnGN/toppng-com-female-user-icon-600x601.png",
                    UserTypeCode: "1",
                    Gender: gender
                };
            }


            else {

                var user = {
                    Login: Login,
                    Name: Name,
                    Password: Password,
                    Email: Email,
                    FotoUser: LinkFileFoto,
                    UserTypeCode: "1",
                    Gender: gender
                };
            }

            await AddNewUSer(user);

            // refershPage
            await Updates.reloadAsync();
        }


        else if (boolRes == "HaveEmailOrLogin") {

            // alert
            setModalVisibleHaveThisEmail(true)
            return;
        }
    }



    return (

        <>
            <ImageBackground source={{ uri: 'https://i.postimg.cc/sfKm58XJ/download.jpg' }} style={{ width: '100%', height: '100%' }}>


                <View style={styles.container}>

                    <ScrollView>

                        <View style={styles.centerizedView}>
                            <View style={styles.authBox}>


                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        style={{ height: 150, width: 150 }}
                                        source={{ uri: 'https://i.postimg.cc/Z54mCW5F/Pngtree-transparent-register-now-button-8709661.png' }} />
                                </View>



                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize={false}
                                        onChangeText={setLogin}
                                        value={Login}
                                        placeholder="Login"
                                        keyboardType='default'
                                        placeholderTextColor={'black'}
                                    />
                                </View>


                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize={false}
                                        placeholder="name"
                                        onChangeText={setName}
                                        value={Name}
                                        keyboardType='default'
                                        placeholderTextColor={'black'}
                                    />


                                </View>


                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize={false}
                                        secureTextEntry={true}
                                        placeholder="password"
                                        onChangeText={setPassword}
                                        value={Password}
                                        keyboardType='numeric'
                                        placeholderTextColor={'black'}
                                    />
                                </View>



                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize={false}
                                        placeholder="Email"
                                        onChangeText={setEmail}
                                        value={Email}
                                        keyboardType='email-address'
                                        placeholderTextColor={'black'}
                                    />
                                </View>





                                <View style={styles.inputBox}>
                                    <TextInput
                                        style={styles.input}
                                        autoCapitalize={false}
                                        placeholder="add Foto Link"
                                        onChangeText={setLinkFileFoto}
                                        value={LinkFileFoto}
                                        keyboardType='url'
                                        placeholderTextColor={'black'}
                                    />
                                    <Text style={styles.infoInputLink}>*No need to add a picture</Text>
                                </View>



                                <View style={styles.checkBox}>

                                    <CheckBox
                                        center
                                        title='Male'
                                        checked={male}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        onPress={genderMale}
                                        containerStyle={{ backgroundColor: null, borderWidth: null }}
                                    />


                                    <CheckBox
                                        center
                                        title='Female'
                                        checkedColor='rgb(221, 167, 176)'
                                        checked={female}
                                        checkedIcon="dot-circle-o"
                                        uncheckedIcon="circle-o"
                                        onPress={genderFemale}
                                        containerStyle={{ backgroundColor: null, borderWidth: null }}
                                    />
                                </View>



                            </View>
                        </View>


                        <View style={styles.buttonClick}>
                            <TouchableOpacity style={styles.loginButton} onPress={checkInputValueRegister}>
                                <Text style={styles.loginButtonText}>Let's Start</Text>
                            </TouchableOpacity>
                        </View>


                    </ScrollView>
                </View>

            </ImageBackground>









            {/* Alerts */}


            {/* register popup Input all value alert for user when Register */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleInputAllValue}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitle}>Warning</Text>
                        <Text style={styles.modalText}>Please Input all Value</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLose}
                            onPress={() => setModalVisibleInputAllValue(!modalVisibleInputAllValue)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>


            {/* register popup Email url not good */}
            <Modal animationType="slide" transparent={true} visible={modalVisibleInputEmailDontGood}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitle}>Warning</Text>
                        <Text style={styles.modalText}>Link Email Not Good!</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLose}
                            onPress={() => setModalVisibleInputEmailDontGood(!modalVisibleInputEmailDontGood)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>


            {/* register popup length Password was mees 6*/}
            <Modal animationType="slide" transparent={true} visible={modalVisibleInputPasswordNotGood}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitle}>Warning</Text>
                        <Text style={styles.modalText}>Length Password was</Text>
                        <Text style={styles.modalText}>mees 6</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLose}
                            onPress={() => setModalVisibleInputPasswordNotGood(!modalVisibleInputPasswordNotGood)}>
                            <Text style={{ color: "white", fontWeight: "bold" }} >Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>


            {/* Have this Email or Login try again alert*/}
            <Modal animationType="slide" transparent={true} visible={modalVisibleHaveThisEmail}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Icon name="warning" size={80} color="#900" />

                        <Text style={styles.modalTextTitle}>Warning</Text>
                        <Text style={styles.modalText}>Have This Email or Login</Text>
                        <Text style={styles.modalText}>Try Again</Text>


                        <TouchableOpacity
                            style={styles.textStyleCLose}
                            onPress={() => setModalVisibleHaveThisEmail(!modalVisibleHaveThisEmail)}>
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






    container: {
        flex: 1,
        position: 'relative',
    },

    centerizedView: {
        width: '100%',
        top: '10%',
    },
    authBox: {
        width: '80%',
        borderRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 14,
        paddingBottom: 30,
        shadowColor: '#000',
    },
    loginTitleText: {
        fontSize: 26,
        fontWeight: 'bold',
        marginTop: 10,
    },
    inputBox: {
        marginTop: 10,
    },
    inputLabel: {
        fontSize: 18,
        marginBottom: 6,
    },
    input: {
        width: '100%',
        height: 45,
        backgroundColor: 'rgba(128, 128, 128, 0.140)',
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    buttonClick: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        backgroundColor: '#e48a33',
        marginTop: 50,
        paddingVertical: 8,
        borderRadius: 4,
        width: "50%",
    },
    loginButtonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkBox: {
        paddingTop: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center",
    },
    infoInputLink: {
        fontSize: 11,
        color: "rgba(0, 0, 0, 0.675)",
    }
});