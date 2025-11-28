import { UserCircle } from "phosphor-react-native";
import { FlatList, StyleSheet, Text, View } from "react-native";

import YourBook from "../../components/yourBook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useFocusEffect } from "expo-router";

export default function Profile() {
    const [userBooks , setuserBooks]= useState([])


    async function getLoggedUserBooks() {
          const token = await AsyncStorage.getItem("logedUser")
        
          const response = await fetch("http://192.168.43.5:3000/books/loggeduser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": token
            })

        })
        const data =await response.json()
        
        setuserBooks(data.data)
        
    }
    useFocusEffect(()=>{

        
        getLoggedUserBooks()
        
        
    })

    return (
        <View style={{
            padding: 20, marginVertical : 20,
            marginBottom :450
        }}>


        <Text style={{
            fontSize : 28, 
            fontWeight : "bold",
            textAlign : "center"
        }}>Profile</Text>
            <View style={{
                flexDirection: "row",
                padding: 10,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "lightgrey",
                justifyContent: "space-between", 
                alignItems : "center",
                backgroundColor : "lightgreen",
                marginVertical : 10
                
            }}>

                <View>
                    <UserCircle size={75} />
                </View>
                <View style={{
                  marginRight : 120
                }}>
                    <Text style={style.profileText}>Harsh</Text>
                    <Text style={style.profileText}>Email</Text>
                    <Text style={{...style.profileText, marginTop : 10}}>No. of Books</Text>
                    <Text style={style.profileText}>Languages</Text>

                </View>
            </View>

            <View>
                <Text style={{
                    fontSize : 25,
                    fontWeight : "500",
                    margin : 10
                }}>Your Boks</Text>

                <FlatList
                data={userBooks}
                renderItem={(item, index)=>{
                  return  <YourBook getLoggedUserBooks={getLoggedUserBooks} data={item}></YourBook>
                }}
                numColumns={2}
                contentContainerStyle={{gap:10}}
                showsVerticalScrollIndicator ={false}
                >
            
                

                </FlatList>
            </View>

        </View>
    )
}

const style = StyleSheet.create({
    profileText : {
        fontWeight : "bold"
    }
})