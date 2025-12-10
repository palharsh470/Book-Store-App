
import { Image, Button, StyleSheet, Text, View, TouchableNativeFeedbackComponent, TouchableOpacity, ScrollView } from "react-native";
import StarRating from "../components/starrating";
import { StarHalfIcon, StarIcon } from "phosphor-react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ip from "../components/ip";
import { useState } from "react";


export default function Details() {
const [data, setdata] = useState({})

    const { id } = useLocalSearchParams();

    async function getBook() {
        try {

            const response = await fetch(`http://${ip}:3000/book/${id}`);

            const jsonResponse = await response.json();


            setdata(jsonResponse)
            
        }
        catch (err) {
            alert(err)
        }
    }
    useFocusEffect(() => {

        getBook()
    })
    return (
        <ScrollView style={{
            padding: 10
        }}>
            <View style={{
                margin: 10,
                alignItems: "center"
            }}>
                <Image style={{
                    height: 400,
                    aspectRatio: 0.91,

                }} source={{uri : data?.data?.img}}></Image>
            </View>

            <View style={styles.container}>
                <Text style={{
                    fontSize: 42,
                    fontWeight: "bold",

                }}>{data?.data?.title}</Text>
            </View>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>

                <View style={styles.container}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                    }}>Author</Text>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>{data?.data?.author?.username}</Text>
                </View>
                <View style={{
                    ...styles.container, flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 5
                }}>
                    <StarHalfIcon size={30} color="yellow" weight="fill" />
                    <Text style={{ ...styles.detailsText }}>{data?.data?.rating}</Text>
                </View>
            </View>


            <View style={styles.container}>
                <Text style={styles.detailsText}>Format : {data?.data?.format?.toUpperCase()} </Text>
                <Text style={styles.detailsText}>Language : {data?.data?.language?.toUpperCase()} </Text>
            </View>
            <View style={styles.container}>
                <Text style={{ ...styles.detailsText, fontSize: 25, }}>Description </Text>
                <Text style={{ ...styles.detailsText, fontWeight: "400" }}>lorem32</Text>
            </View>

            <TouchableOpacity onPress={() => {
                router.push({
                    pathname: "pdf",
                    params: { url: data?.data?.pdf }
                })
            }} style={{
                alignItems: "center",
                marginVertical: 15,
                margin: "auto",
                borderRadius: 10,
                width: "95%",
                padding: 15,
                backgroundColor: "skyblue"
            }}>
                <View style={{
                }}>
                    <Text style={{
                        fontSize: 25,
                        fontWeight: "bold", color: "white"
                    }}>Show Pdf</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    detailsText: {
        fontSize: 20, fontWeight: "bold",
        color: "grey",
        marginTop: 1
    }
    ,
    container: {
        margin: 5,

    }
})