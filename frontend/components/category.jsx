import { Image, Text, TouchableOpacity, View } from "react-native";

import { Flask, Heart, StarHalf } from "phosphor-react-native"
import { useState } from "react";
export function Category({ data }) {

    const [isfav, setisfav] = useState(false)
    const handleFav = () => {
        setisfav(!isfav)
    }
    return (
        <View style={{
            margin: 10,

            height: "250",
            width: "140",
            backgroundColor: "white",
            borderRadius: 10

        }}>
            <TouchableOpacity style={{
                height: 130,
                width: 80,
                alignSelf: "center"

            }}>
                <Image style={{
                    height: 130,
                    width: 80,

                }} source={require("../assets/image.png")}></Image>

            </TouchableOpacity>
            <View style={{
                margin: 5
            }}>

                <Text style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "left"
                }}>{data.title}</Text>
                <Text style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "left"
                    , opacity: 0.5
                }}>By {data.author.username}</Text>

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
                        }}>Ratings : {data.rating} </Text>
                    </View>
                    <Text style={{
                        fontWeight: "600"
                        , opacity: 0.7
                    }}>Format : {data.format} </Text>
                    <Text style={{
                        fontWeight: "600"
                        , opacity: 0.7
                    }}>Language : {data.language}</Text>
                </View>
            </View>

            <TouchableOpacity onPress={handleFav} style={{
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
            backgroundColor: category === text ? "white" : "lightgrey",

            padding: 10,
        }}>
            {logo}
            <Text>{text}</Text>

        </TouchableOpacity>
    )
}