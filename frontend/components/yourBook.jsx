import { StarHalf } from "phosphor-react-native";
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import StarRating from "./starrating";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import ip from "./ip";
import { router } from "expo-router";
export default function YourBook({ getLoggedUserBooks, data }) {

    const [title, settitle] = useState(data.item.title)
    const [category, setcategory] = useState(data.item.category);
    const [subcategory, setsubcategory] = useState(data.item.subcategory);
    const [format, setformat] = useState(data.item.format);
    const [language, setlanguage] = useState(data.item.language);


    const [isvisible, setisvisible] = useState(false)


    async function submitBook(id) {

        try {

            if (!title.trim() || !category.trim() || !subcategory.trim() || !format.trim() || !language.trim()) {
                alert("Fill all the fields Properly")
                return
            }

            const token = await AsyncStorage.getItem("logedUser")


            const response = await fetch(`http://${ip}:3000/book/${id}/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title": title.trim(),
                    "category": category.trim().toLowerCase(),
                    "subcategory": subcategory.trim().toLowerCase(),
                    "format": format.trim(),
                    "language": language.trim(),
                    "img": data?.item?.img,
                    "token": token
                })

            })



            const data = await response.json()

            if (data) {
                alert(
                    `Book updated Successfully`
                )

                getLoggedUserBooks()
                setisvisible(false)
            }
        }
        catch (err) {
            alert(err.message || "Something went wrong")
        }
    }

    function handleVisible() {
        setisvisible(!isvisible)
    }

    async function deleteBook(id) {
        try {

            const token = await AsyncStorage.getItem("logedUser")

            const response = await fetch(`http://${ip}:3000/book/${id}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "token": token
                })

            })
            const data = await response.json()
            getLoggedUserBooks()
        }
        catch (err) {
            alert(err.message || "Something went wrong")
        }

    }

    return (
        <View style={{
            margin: 10,
            flex: 1,
            backgroundColor: "lightgrey",
            borderRadius: 10,
            paddingTop: 10
            , shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,

            elevation: 10,

        }}>
            <TouchableOpacity style={{
                height: 130,
                width: 80,
                alignSelf: "center"

            }} onPress={() => {
                router.push({
                    pathname: "details",
                    params: { id: data?.item?._id }
                })
            }
            }>
                <Image style={{
                    height: 130,
                    width: 80,

                }} source={{ uri: data.item.img }}></Image>

            </TouchableOpacity>
            <View style={{
                margin: 5
            }}>

                <Text style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    textAlign: "left",

                }} numberOfLines={1}>{data.item.title}</Text>



            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
                flex: 1,


            }}>
                <TouchableOpacity style={{
                    backgroundColor: "skyblue",
                    flex: 1,
                    padding: 5,
                    borderBottomLeftRadius: 10,
                    paddingHorizontal: 6
                }} onPress={handleVisible}>
                    <Text style={{
                        fontSize: 19,
                        fontWeight: "600",
                        textAlign: "center"
                    }}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    backgroundColor: "red",
                    flex: 1,
                    padding: 5,
                    paddingHorizontal: 6,
                    borderBottomRightRadius: 10
                }} onPress={() => {
                    deleteBook(data.item._id)
                }}>
                    <Text style={{
                        fontSize: 19,

                        textAlign: "center",
                        fontWeight: "600"
                    }}>Delete</Text>
                </TouchableOpacity>
            </View>


            <Modal style={{

            }} transparent={false} visible={isvisible}>
                <ScrollView style={{

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
                            <TextInput value={title} onChangeText={(data) => {
                                settitle(data)
                            }} placeholder="Add your title" style={{
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
                            <Text style={style.fieldText}>Category</Text>

                            <Picker
                                selectedValue={category}
                                onValueChange={(value) => {
                                    setcategory(value)
                                }}
                                prompt="Select a Category"

                            >
                                <Picker.Item label="Select a category" value=""></Picker.Item>
                                <Picker.Item label="Friction" value="friction"></Picker.Item>
                                <Picker.Item label="Science" value="science"></Picker.Item>
                                <Picker.Item label="Politics" value="politics"></Picker.Item>
                                <Picker.Item label="Economy" value="economy"></Picker.Item>
                                <Picker.Item label="Biopic" value="biopic"></Picker.Item>
                                <Picker.Item label="Social" value="social"></Picker.Item>
                                <Picker.Item label="Religion" value="religion"></Picker.Item>
                                <Picker.Item label="Others" value="others"></Picker.Item>
                            </Picker>
                        </View>

                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText}>Sub-Category</Text>

                            <Picker
                                selectedValue={subcategory}
                                onValueChange={(value) => {
                                    setsubcategory(value)
                                }}
                                prompt="Select a subcategory"

                            >
                                <Picker.Item label="Select a subcategory" value=""></Picker.Item>
                                <Picker.Item label="Featured" value="featured"></Picker.Item>
                                <Picker.Item label="Trending" value="trending"></Picker.Item>
                                <Picker.Item label="New" value="new"></Picker.Item>
                                <Picker.Item label="Evergreen" value="evergreen"></Picker.Item>
                            </Picker>
                        </View>

                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText}>Format</Text>

                            <Picker
                                selectedValue={format}
                                onValueChange={(value) => {
                                    setformat(value)
                                }}
                                prompt="Select a Format"

                            >
                                <Picker.Item label="Select a Format" value=""></Picker.Item>
                                <Picker.Item label="Ebook" value="ebook"></Picker.Item>
                                <Picker.Item label="Audio" value="audio"></Picker.Item>
                                <Picker.Item label="Others" value="other"></Picker.Item>
                            </Picker>
                        </View>
                        <View style={{
                            gap: 10
                        }}>
                            <Text style={style.fieldText} >Language</Text>
                            <TextInput placeholder="Book Language" onChangeText={(data) => {
                                setlanguage(data)
                            }} value={language} style={{
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
                        }} onPress={() => {
                            submitBook(data.item._id)
                        }}>
                            <Text style={style.fieldText}>Update Book</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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