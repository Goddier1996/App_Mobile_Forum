import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../API';
import UserProfile from "../components/userProfile";
import DemoUser from "../components/DemoUser";
import Admin from "../components/AdminProfile";



// Profile Here connect user or Demo User , Admin the appropriate page
export default function Profile() {



    const [user, SetUser] = useState([]);



    // load user from data base
    const LoadUser = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        let res = await fetch(`${API.USERS.GET}/${currentUser.idUser}`, { method: 'GET' });

        let data = await res.json();
        SetUser(data);
    }




    useEffect(() => {
        LoadUser()
    }, [])






    // UserTypeCode 1 this is Public user how Register this App can to do All! and update personal details :)
    if (user.UserTypeCode === "1") {

        return (
            <UserProfile />
        );
    }



    // UserTypeCode 2 this is a Admin this App
    if (user.UserTypeCode === "2") {

        return (
            <Admin />
        );
    }


    // UserTypeCode 3 this is a demo User
    if (user.UserTypeCode === "3") {

        return (
            // demo user cant update personal details
            <DemoUser />
        );
    }

};
