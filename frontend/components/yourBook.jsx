import { StarHalf } from "phosphor-react-native";
import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StarRating from "./starrating";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function YourBook({ getLoggedUserBooks,data }) {
    const [isvisible, setisvisible] = useState(false)
    function handleVisible() {
        setisvisible(!isvisible)
    }

    async function deleteBook(id){
         const token = await AsyncStorage.getItem("logedUser")
         
          const response = await fetch(`http://192.168.43.5:3000/book/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "token": token
            })

        })
        const data =await response.json()
        getLoggedUserBooks()
       
    }
   
    return (
        <View style={{
            margin: 10,

            height: "250",
            width: "140",
            backgroundColor: "lightgrey",
            borderRadius: 10,
            paddingTop: 10


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
                }}>{data.item.title}</Text>


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
                        }}>Ratings : {data.item.rating} </Text>
                    </View>
                    <Text style={{
                        fontWeight: "600"
                        , opacity: 0.7
                    }}>Format : {data.item.format} </Text>

                </View>
            </View>

            <View style={{
                flexDirection: "row",
                width: 140,
                height: 30,
                justifyContent: "center",
                marginTop: 10


            }}>
                <TouchableOpacity style={{
                    backgroundColor: "skyblue",
                    borderBottomLeftRadius: 10,
                    paddingHorizontal: 6
                }} onPress={handleVisible}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: "600"
                    }}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: "red",
                    paddingHorizontal: 6,
                    borderBottomRightRadius: 10
                }} onPress={()=>{
                    deleteBook(data.item._id)
                }}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: "600"
                    }}>Delete</Text>
                </TouchableOpacity>
            </View>


            <Modal style={{

            }} transparent={false} visible={isvisible}>
                <View style={{

                }}>
                    <TouchableOpacity onPress={handleVisible}>
                        <Text style={{
                            top: 10,
                            right: 10,
                            position: "absolute"
                        }}>❌</Text>
                    </TouchableOpacity>
                    <View style={{
                        height: 100,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text style={{
                            fontSize: 32,
                            fontWeight: "bold",

                        }}>
                            UPDATE BOOK
                        </Text>
                    </View>

                    <View style={{
                        gap: 20,
                        margin: 10
                    }}>
                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText}>Title</Text>
                            <TextInput placeholder="Add your title" style={{
                                borderWidth: 5,
                                borderColor: "lightgrey",
                                borderRadius: 15
                            }}>

                            </TextInput>
                        </View>

                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText}>Image</Text>
                            <Text>Image block</Text>
                        </View>

                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText}>Format</Text>
                            <TextInput placeholder="Book Format" style={{
                                borderWidth: 5,
                                borderColor: "lightgrey",
                                borderRadius: 15
                            }}></TextInput>
                        </View>
                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText}>Language</Text>
                            <TextInput placeholder="Book Language" style={{
                                borderWidth: 5,
                                borderColor: "lightgrey",
                                borderRadius: 15
                            }}></TextInput>
                        </View>
                    </View>


                    <View style={{
                        alignItems: "center",
                        marginTop: 30,
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: "lightgrey",
                            padding: 10,
                            borderRadius: 10
                        }}>
                            <Text style={style.fieldText}>Update Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const style = StyleSheet.create({
    fieldText: {
        color: "grey",
        fontSize: 24,
        fontWeight: "700",


    }
})