import { Image, Button, Text, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking"
import { Flask, Heart, StarHalf } from "phosphor-react-native"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ip from "./ip";


import Pdfview from "./Webview";
import { router } from "expo-router";
export function Category({ fav, getFeedBooks, getfavBooks, id, data }) {



    const [isfav, setisfav] = useState(fav === true ? true : false)

    const addtofav = async () => {

        try {
            const token = await AsyncStorage.getItem("logedUser")

            const favourite = await fetch(`http://${ip}:3000/book/favourite/${id}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": token
                })

            })


            const record = await favourite.json()


        }
        catch (err) {
            alert(err)
        }

        setisfav(!isfav)
    }

    const deletefromfav = async () => {

        try {
            const token = await AsyncStorage.getItem("logedUser")

            const unFavourite = await fetch(`http://${ip}:3000/book/favourite/${id}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": token
                })

            })

            const record = await unFavourite.json()
            console.log(record)
            if (fav) {
                getfavBooks()
                getFeedBooks()
            }
        }
        catch (err) {
            alert(err)
        }
        setisfav(!isfav)

    }

    return (
        <View style={{
            margin: 10,
            flex: 1,
            padding: 10,

            backgroundColor: "white",
            borderRadius: 10

        }}>
            <TouchableOpacity style={{

                alignSelf: "center"

            }} onPress={() => {
                router.push({
                    pathname: "details",
                    params: {id : data?._id }
                })
            }
            }>
                <Image style={{
                    height: 130,
                    width: 80,

                }} source={{ uri: data?.img }}></Image>

            </TouchableOpacity>
            {data && <View style={{
                margin: 5

            }}>

                <Text style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "left"
                }}>{data?.title}</Text>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "left"
                    , opacity: 0.5
                }}>By {data?.author?.username}</Text>

                <View style={{
                    top: 8
                }}>
                    <View style={{
                        flexDirection: "row",
                        gap: 3,
                        alignItems: "center"
                    }}>
                        <StarHalf size={22} color="#ffe014" weight="fill" />
                        <Text style={{

                            fontWeight: "500"

                            , opacity: 0.3
                        }}>Ratings : {data?.rating} </Text>
                    </View>
                    <Text style={{
                        fontWeight: "600"
                        , opacity: 0.7
                    }}>Format : {data?.format} </Text>
                    <Text style={{
                        fontWeight: "600"
                        , opacity: 0.7
                    }}>Language : {data?.language}</Text>

                </View>


            </View>}

            <TouchableOpacity onPress={() => {
                isfav ? deletefromfav() : addtofav()
            }} style={{
                position: "absolute",
                right: 2,
                top: 2
            }}>
                <Heart size={25} color="red" weight={isfav === true ? "fill" : "thin"} />
            </TouchableOpacity>
        </View>
    )
}

export function SubCategory({ category, setcategory, logo, text }) {

    function handlePress() {
        setcategory(text.toLowerCase())
    }

    return (
        <TouchableOpacity onPress={handlePress} style={{
            margin: 10,
            alignItems: "center",

            borderRadius: 20,
            backgroundColor: category === text ? "white" : "#eef0d5",

            padding: 10,
        }}>
            {logo}
            <Text>{text}</Text>

        </TouchableOpacity>
    )
}