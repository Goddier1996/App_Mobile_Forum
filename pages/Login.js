import { View, Text, TextInput, Modal, TouchableOpacity, Image, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { API } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Updates from 'expo-updates';

// use components
import ForgetPassword from "../components/forgetPassword";



// connect page Login
export default function Login() {

  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');

  const navigation = useNavigation();

  const [modalVisibleForgetPassword, setModalVisibleForgetPassword] = useState(false);

  // Alerts popUp
  const [modalVisibleInputAllValue, setModalVisibleInputAllValue] = useState(false);
  const [modalVisibleNotHaveUser, setModalVisibleNotHaveUser] = useState(false);



  // move to register page
  const RegisterPage = async () => {

    navigation.navigate("Register")
  }



  // check if all input value was in login
  const checkInputValueLogin = async () => {

    if (Login == '' || Password == '') {

      // alert
      setModalVisibleInputAllValue(true)
      return;
    }

    else {
      SignIn()
    }
  }



  // connect to forum login user
  const SignIn = async () => {


    try {

      let user =
      {
        Login: Login,
        Password: Password
      };

      let res = await fetch(API.USERS.LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });


      let data = await res.json();


      // if don't have this user show alert
      if (data == null) {

        // alert
        setModalVisibleNotHaveUser(true)
        return
      }


      else {

        // data from data base , save in AsyncStorage for user id profile user
        let storgeUser =
        {
          LoginUser: data.Login,
          idUser: data._id,
          FotoUser: data.FotoUser,
          NameUser: data.Name,
          Email: data.Email,
          LoctionFrom: data.LoctionFrom,
        }

        AsyncStorage.setItem('user', JSON.stringify(storgeUser))

        await Updates.reloadAsync();
      }

    } catch (error) {
      console.log(error);
    }
  }



  // connect demo user
  const connectDemoUser = async () => {

    try {

      let user =
      {
        Login: "DemoUser96",
        Password: "987654321"
      };

      let res = await fetch(API.USERS.LOGIN, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });


      let data = await res.json();


      // data from data base , save in AsyncStorage for user id profile user
      let storgeUser =
      {
        LoginUser: data.Login,
        idUser: data._id,
        FotoUser: data.FotoUser,
        NameUser: data.Name,
        Email: data.Email,
        LoctionFrom: data.LoctionFrom,
      }

      AsyncStorage.setItem('user', JSON.stringify(storgeUser))

      await Updates.reloadAsync();

    } catch (error) {
      console.log(error);
    }
  }



  // close model Forget Password in ForgetPassword.js
  const hideModelForgetPassword = () => {

    setModalVisibleForgetPassword(false);
  }



  return (

    <>

      <ImageBackground source={{ uri: 'https://i.postimg.cc/sfKm58XJ/download.jpg' }} style={{ width: '100%', height: '100%' }}>

        <ScrollView>

          <View style={styles.container}>

            <View style={styles.centerizedView}>

              <View style={styles.authBox}>


                <View style={{ alignItems: 'center' }}>
                  <Image
                    style={{ height: 200, width: 200 }}
                    source={{ uri: 'https://i.postimg.cc/3xGnb8C6/Lovepik-com-450124259-An-icon-of-account-login-in-hand-drawn-style.png' }} />
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
                    secureTextEntry={true}
                    placeholder="password"
                    onChangeText={setPassword}
                    value={Password}
                    keyboardType='numeric'
                    placeholderTextColor={'black'}
                  />
                </View>


              </View>
            </View>
          </View>


          <View >

            <View style={styles.styleClickButton}>
              <TouchableOpacity style={styles.loginButton} onPress={() => checkInputValueLogin()}>
                <Text style={styles.loginButtonText} >Login</Text>
              </TouchableOpacity>
            </View>


            <TouchableOpacity style={styles.connectDemoUser} onPress={() => connectDemoUser()} >
              <Text style={styles.connectClick} >
                connect Demo User
              </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={RegisterPage}>
              <Text style={styles.registerText}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={() => setModalVisibleForgetPassword(true)}>
              <Text style={styles.forgotPasswordText} >Forgot Password?</Text>
            </TouchableOpacity>


            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleForgetPassword}>

                {/* active a Component */}
                <ForgetPassword hideModelForgetPassword={hideModelForgetPassword} />

              </Modal>
            </View>


          </View>

        </ScrollView>

      </ImageBackground>




      {/* Alerts */}


      {/* Login popup Input all value alert */}
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



      {/* Login popup No Have this user alert */}
      <Modal animationType="slide" transparent={true} visible={modalVisibleNotHaveUser}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Icon name="warning" size={80} color="#900" />

            <Text style={styles.modalTextTitle}>Warning</Text>
            <Text style={styles.modalText}>No Have This User</Text>
            <Text style={styles.modalText}>( maybe you Forget Password )</Text>


            <TouchableOpacity
              style={styles.textStyleCLose}
              onPress={() => setModalVisibleNotHaveUser(!modalVisibleNotHaveUser)}>
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
    marginTop: 30,
  },
  modalText: {
    color: '3#c466a',
    fontSize: 16,
    marginTop: 10,
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
    marginTop: 110,
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
    height: 50,
    backgroundColor: 'rgba(128, 128, 128, 0.140)',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  styleClickButton: {
    alignItems: "center"
  },
  loginButton: {
    backgroundColor: '#f6c250',
    marginTop: 15,
    paddingVertical: 8,
    borderRadius: 4,
    width: 120
  },
  loginButtonText: {
    color: "white",
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 12,
    color: "rgba(0, 0, 0, 0.475)",
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.475)",
  },

  connectDemoUser: {
    alignItems: "center",
    marginTop: 30,
  },
  connectClick: {
    fontWeight: "bold",
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.575)",
  },

});