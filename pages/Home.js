import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground, FlatList, } from 'react-native';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { LoadCategors } from "../Api/LoadDataFromApi"



// home page
export default function Home() {


    const [category, SetCategory] = useState([])

    const navigation = useNavigation();


    // show all categors from data base
    const LoadAllCategors = async () => {

        SetCategory(await LoadCategors());
    }



    // send params to topic page
    const idCategory = async (idCategroy, title, topicImage) => {

        navigation.navigate("Topic", { id: idCategroy, name: title, topicImage: topicImage })
    }



    useEffect(() => {

        LoadAllCategors();
    }, [])




    return (

        <>
            <ImageBackground blurRadius={1} source={{ uri: "https://i.postimg.cc/sfKm58XJ/download.jpg" }} style={{ width: '100%', height: '100%' }}>

                <Image style={styles.startImage} source={{ uri: 'https://i.postimg.cc/YS6yTphP/home1111.jpg' }} />


                <FlatList style={styles.list}
                    contentContainerStyle={styles.listContainer}
                    data={category}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item }) =>


                        <TouchableOpacity style={[styles.card, { backgroundColor: item.color }]} onPress={() => idCategory(item._id, item.title, item.imageTopic)} >

                            <View style={styles.cardHeader}>
                                <Text style={styles.title}>{item.title}</Text>
                            </View>

                            <Image style={styles.cardImage} source={{ uri: item.image }} />

                        </TouchableOpacity>

                    } />

            </ImageBackground>
        </>
    );

}




const styles = StyleSheet.create({

    list: {
        paddingHorizontal: 5,
        marginTop: 20,
    },
    listContainer: {
        alignItems: 'center'
    },
    /******** card **************/
    card: {
        marginHorizontal: 7,
        marginVertical: 7,
        flexBasis: '45%',
        paddingTop: 12.5,
        paddingBottom: 25,
        borderRadius: 10
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    cardContent: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
    },

    cardImage: {
        height: 70,
        width: 70,
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        flex: 1,
        color: "#FFFFFF",
        fontWeight: 'bold'
    },
    startImage: {
        height: '40%',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    }
});