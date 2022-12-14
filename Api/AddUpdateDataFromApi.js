import { API } from './API';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';


// add new data

export async function AddMessage(message) {

    try {
        await fetch(API.MESSAGES.POST, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        });

    } catch (error) {
        console.log(error);
    }
}


export async function AddTopic(topic) {

    try {
        await fetch(API.TOPICS.POST, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(topic)
        });

    } catch (error) {
        console.log(error);
    }
}


export async function AddNewUSer(user) {

    try {
        await fetch(API.USERS.POST, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error);
    }
}


export async function AddCategoryToDataBase(category) {

    try {
        await fetch(API.CATEGORY.POST, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        });

    } catch (error) {
        console.log(error);
    }
}



// Update info 

export async function updateDateUserFromDataBase(user, idUser) {

    try {
        await fetch(`${API.USERS.GET}/${idUser}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {

        console.log(error)
    }
}


export async function NewPasswordUser(user, idUser) {

    try {
        await fetch(`${API.USERS.GET}/${idUser}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}



// Connect login

export async function ConnectLoginPublicUser(user) {

    try {

        let res = await fetch(API.USERS.LOGIN, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        let data = await res.json();

        // if dont have this user
        if (data == null) {

            return '';
        }

        else {

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


export async function ConnectDemoPublicUser() {

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

        AsyncStorage.setItem('user', JSON.stringify(storgeUser));

        await Updates.reloadAsync();

    } catch (error) {
        console.log(error);
    }
}



// forget password

export async function ConnectForgetPassword(user) {

    try {

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

            return '';
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
        }

    } catch (error) {
        console.log(error);
    }
}