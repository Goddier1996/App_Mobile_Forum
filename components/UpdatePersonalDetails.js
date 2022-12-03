import { View, TextInput, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DevSettings } from 'react-native';
import { API } from '../API';
import * as Updates from 'expo-updates';



// UserTypeCode 1 this is Public user how Register this App can to do All! and update personal details :)
export default function UpdatePersonalDetails(props) {



    const [Login, setLogin] = useState('');
    const [Name, setName] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [LinkFileFoto, setLinkFileFoto] = useState('');



    // close a popUP
    const ClosePopup = async () => {

        await Updates.reloadAsync();

        // DevSettings.reload()
    }





    //update user info 
    const updateDateUser = async () => {


        idUser = props.UserInfo.code;

        //  alert(idUser)

        try {

            let user = {
                Name: Name,
                Login: Login,
                Email: Email,
                Password: Password,
                FotoUser: LinkFileFoto,
            }


            await fetch(`${API.USERS.GET}/${idUser}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });


            // alert("Update done successfully")

            await AsyncStorage.clear();

            await Updates.reloadAsync();

            // DevSettings.reload()


        } catch (error) {

            console.log(error)
        }
    }






    // here we set all props info data user , for we can see in placeholder info user
    useEffect(() => {

        setName(props.UserInfo.name)
        setLogin(props.UserInfo.login)
        setPassword(props.UserInfo.password)
        setEmail(props.UserInfo.email)
        setLinkFileFoto(props.UserInfo.foto)

    }, [])






    return (
        <>


            <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    {/* close popUP */}
                    <Pressable
                        style={[styles.buttonClose]} onPress={ClosePopup}>
                        <Text style={styles.Close}>X</Text>
                    </Pressable>

                    <View style={styles.titleTopicUser}>
                        <Text style={styles.title}>{props.UserInfo.name} update your personal details </Text>
                    </View>

                    <View >

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


                    </View>

                    <View style={styles.buttonClick}>
                        <TouchableOpacity style={styles.ChangeButton}>
                            <Text style={styles.ChangeButtonText} onPress={updateDateUser} >Let's Change Your Info</Text>
                        </TouchableOpacity>
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
        width: 250,
    },
    ChangeButtonText: {
        color: "white",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});
