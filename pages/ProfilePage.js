import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from "../components/userProfile";
import Admin from "../components/AdminProfile";
import { LoadUserFromDataBase } from "../Api/LoadDataFromApi";



// Profile Here connect user or Demo User , Admin the appropriate page
export default function Profile() {


    const [user, SetUser] = useState([]);


    // load user from data base
    const LoadUser = async () => {

        let savedUser = await AsyncStorage.getItem("user");
        let currentUser = JSON.parse(savedUser);

        SetUser(await LoadUserFromDataBase(currentUser.idUser));
    }



    useEffect(() => {

        LoadUser()
    }, [])



    // UserTypeCode 1 this is Public user how Register this App can to do All! and update personal details.
    // UserTypeCode 3 this is a demo User(demo user cant update personal details)
    if (user.UserTypeCode === "1" || user.UserTypeCode === "3") {

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

};