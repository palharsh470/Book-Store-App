import { UserCircle } from "phosphor-react-native";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import YourBook from "../../components/yourBook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import ip from "../../components/ip";
import { Category, SubCategory } from "../../components/category";


export default function Profile() {
    const [userBooks, setuserBooks] = useState([])
    const [loggedUser, setloggedUser] = useState()
    const handleLogout = () => {
        const data = AsyncStorage.clear();

        router.replace("/login")
    }

    async function getLoggedUserBooks() {
        try {

            const token = await AsyncStorage.getItem("logedUser")

            const user = await fetch(`http://${ip}:3000/user/logged`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": token
                })
            })

            const userData = await user.json();

            console.log(userData)
            setloggedUser(userData)

            const response = await fetch(`http://${ip}:3000/books/loggeduser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": token
                })

            })
            const data = await response.json()

            setuserBooks(data.data)
        }
        catch (err) {
            alert(err.message || "Something went wrong")
        }

    }
    useFocusEffect(() => {


        AsyncStorage.getItem("logedUser").then(function (value) {

            if (!value) {
                router.replace("/login")
            }
            else {
                getLoggedUserBooks()
            }
        })



    })

    return (
        <View style={{
            padding: 20, marginVertical: 20,
            paddingBottom: 500,

            backgroundColor: "#ECEBDE"
        }}>


            <Text style={{
                fontSize: 28,
                fontWeight: "bold",
                textAlign: "center"
            }}>Profile</Text>
            <View style={{

                padding: 10,


                alignItems: "center",

                marginVertical: 10,
                gap: 15
            }}>

                <View>
                    <UserCircle color="grey" size={75} />
                </View>
                <View style={{
                    alignItems: "center"

                }}>
                    <Text style={style.profileText}>{loggedUser?.data?.username}</Text>
                    <Text style={{ ...style.profileText, opacity: 0.5 }}>{loggedUser?.data?.email}</Text>
                   
                    
                </View>
            </View>

 <View>
         

           
              

                <FlatList
                    data={userBooks}

                    renderItem={(item, index) => {
                        return <YourBook getLoggedUserBooks={getLoggedUserBooks} data={item}></YourBook>
                    }}
                    numColumns={2}
                    ListHeaderComponent={ <View>
                          <View style={style.cardContainer}>
                        
                <View style={style.featuresCard}>
                    <Text style={style.cardText} >Books Published</Text>
                    <Text style={style.cardTextnum}>{userBooks?.length}</Text>
                </View>
                <View style={style.featuresCard}>
                    <Text style={style.cardText}>Books Read</Text>
                    <Text style={style.cardTextnum}>12</Text>
                </View>
                <View style={style.featuresCard}>
                    <Text style={style.cardText}>Liked Books</Text>
                    <Text style={style.cardTextnum}>9</Text>
                </View>
            </View>
              <Text style={{
                  fontSize: 25,
                  fontWeight: "500",
                  margin: 10
                }}>Your Books</Text>
                </View>}
                    contentContainerStyle={{ gap: 10 }}
                    showsVerticalScrollIndicator={false}

                >



                </FlatList>

            </View>

            <TouchableOpacity onPress={handleLogout} style={{
                backgroundColor: "red",
                padding: 5,
                margin: 10,
                marginBottom : -10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 6,

                elevation: 10,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
            }}><Text style={{
                fontWeight: "500",
                fontSize: 25
            }}>Logout</Text></TouchableOpacity>



        </View>
    )
}

const style = StyleSheet.create({
    profileText: {
        fontWeight: "bold"
    },
    featuresCard: {
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#55502cff",
        height: 120,
        width: 100,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,

        elevation: 10,
        justifyContent: "space-around",
        alignItems: "center",

    },
    cardContainer: {
        flexDirection: "row",
        flex: 1,
        marginTop: 20,
        justifyContent: "space-around"
    },
    cardText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "lightgrey",
        fontSize: 17
    },
    cardTextnum: {
        textAlign: "center",
        fontWeight: "bold",
        color: "lightgrey",
        fontSize: 25
    }
})