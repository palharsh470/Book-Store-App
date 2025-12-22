import { FlatList, ScrollView, Text, View } from "react-native";
import { Category } from "../../components/category";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

import ip from "../../components/ip";
export default function Favourite() {
    const [favBooks, setfavBooks] = useState([])

    async function getfavBooks() {
        try{

            
            const token = await AsyncStorage.getItem("logedUser")
          
        const response = await fetch(`http://${ip}:3000/book/favourite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": token
            })
            
        })

        const favBooks = await response.json()
        setfavBooks(favBooks.data)
    }
    catch(err){
        alert(err)
    }

    }
    useFocusEffect(() => {

      getfavBooks()

    })
    return (
        <FlatList
            ListHeaderComponent={() => {
                return (
                    <Text style={{
                        fontSize: 45, 
                        fontWeight: "bold",  
                        margin: 10,
                        marginTop: 30
                    }}> My Favourite Books ❤️</Text>
                )
            }}
            data={favBooks}
            renderItem={(value,index) => {
               console.log( value.item.book._id)
                return <Category fav={true} getfavBooks={getfavBooks} id={ value.item.book._id} data={value?.item?.book}></Category>
            }}
            numColumns={2}
            style={{
                       backgroundColor: "#ECEBDE"

            }}></FlatList>
    )
}