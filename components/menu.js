import { View, Image } from 'react-native';

// pages
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/register"
import Profile from "../pages/ProfilePage"
import infoAbout from "../pages/infoAbout"


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from "react";




const Tab = createBottomTabNavigator();


// menu component
export default function Menu() {



    const [DataUser, setDataUser] = useState('');




    const getDataFromStorge = async () => {

        let value = await AsyncStorage.getItem('user')


        let p = JSON.parse(value)

        setDataUser(p)
    }




    useEffect(() => {
        getDataFromStorge()
    }, [])





    if (DataUser != null) {

        return (
            <>

                <Tab.Navigator

                    screenOptions={{
                        tabBarShowLabel: false,
                        tabBarActiveBackgroundColor: 'green',
                        tabBarInactiveBackgroundColor: "rgba(0, 0, 0, 0.827)",
                        // tabBarItemStyle: {
                        //     // borderRadius: 50,
                        // },
                    }}
                >





                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Image
                                    source={{ uri: 'https://i.postimg.cc/sDb3bjpC/icons8-house-48.png' }}
                                    resizeMode='contain'
                                    style={{ width: 40, height: 40 }}
                                />
                            </View>
                        )
                    }} name="Home" component={Home} />




                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >

                                <Image
                                    source={{ uri: DataUser.FotoUser }}
                                    resizeMode='contain'
                                    style={{ width: 40, height: 40 }}
                                />
                            </View>
                        )
                    }} name="Profile" component={Profile} />



                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Image
                                    source={{ uri: 'https://i.postimg.cc/3JZYmJxQ/Lovepik-com-450041178-Information-vector.png' }}
                                    resizeMode='contain'
                                    style={{ width: 40, height: 40 }}
                                />
                            </View>
                        )
                    }} name="infoAbout" component={infoAbout} />


                </Tab.Navigator>
            </>
        );

    }




    else {

        return (
            <>

                <Tab.Navigator

                    screenOptions={{
                        tabBarShowLabel: false,
                        tabBarActiveBackgroundColor: 'green',
                        tabBarInactiveBackgroundColor: "#1e2226",
                        // tabBarItemStyle: {
                        //     // borderRadius: 50,
                        // },
                    }}
                >


                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Image
                                    source={{ uri: 'https://i.postimg.cc/sDb3bjpC/icons8-house-48.png' }}
                                    resizeMode='contain'
                                    style={{ width: 40, height: 40 }}
                                />
                            </View>
                        )
                    }} name="Home" component={Home} />


                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Image
                                    source={{ uri: 'https://i.postimg.cc/6QddRVxR/icons8-log-in-64.png' }}
                                    resizeMode='contain'
                                    style={{ width: 50, height: 50 }}
                                />
                            </View>
                        )
                    }} name="Login" component={Login} />




                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Image
                                    source={{ uri: 'https://i.postimg.cc/1t7d1WgY/Universal-37.png' }}
                                    resizeMode='contain'
                                    style={{ width: 40, height: 40 }}
                                />
                            </View>
                        )
                    }} name="Register" component={Register} />



                    <Tab.Screen options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View >
                                <Image
                                    source={{ uri: 'https://i.postimg.cc/3JZYmJxQ/Lovepik-com-450041178-Information-vector.png' }}
                                    resizeMode='contain'
                                    style={{ width: 40, height: 40 }}
                                />
                            </View>
                        )
                    }} name="infoAbout" component={infoAbout} />



                </Tab.Navigator>

            </>
        );


    }

}