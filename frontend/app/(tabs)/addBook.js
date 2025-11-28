import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { StarIcon, Starhalf } from "phosphor-react-native"
import StarRating from "../../components/starrating"
import { useState } from "react"
import { Picker } from "@react-native-picker/picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
export default function AddBook() {
    const [israted, setisrated] = useState([])

    const [title, settitle] = useState("");
    const [category, setcategory] = useState("");
    const [subcategory, setsubcategory] = useState("");
    const [format, setformat] = useState("");
    const [language, setlanguage] = useState("");

    function handleTitleText(value) {
        settitle(value)
    }
    function handleCategoryText(value) {
        setcategory(value)
    }
    function handleSubcateText(value) {
        setsubcategory(value)
    }
    function handleFormatText(value) {
        setformat(value)
    }
    function handleLanguageText(value) {
        setlanguage(value)
    }

    
    async function submitBook() {
        if (!title.trim() || !category.trim() || !subcategory.trim() || !format.trim() || !language.trim()) {
            alert("Fill all the fields Properly")
            return
        }

        const token = await AsyncStorage.getItem("logedUser")
        let rateCount =0;
         israted.forEach((value)=>{
            rateCount +=value
        })


        const response = await fetch("http://192.168.43.5:3000/book/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title": title.trim(),
                "category": category.trim().toLowerCase(),
                "subcategory": subcategory.trim().toLowerCase(),
                "format": format.trim(),
                "language": language.trim(),
                "rating" : rateCount,
                "token": token
            })

        })

        settitle("")
        setcategory("")
        setformat("")
        setlanguage("")
        setsubcategory("")

        const data = await response.json()
      
        if(data){
            alert(
                `Book Added to DataBase

                Title : ${data.data.title} 
                Category : ${data.data.category}
                Sub-category : ${data.data.subcategory}
                Format :  ${data.data.format}
                Language :${data.data.language}`
            )
        }
    }

    return (
        <ScrollView style={{

        }}>

            <View style={{
                height: 80,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginTop: 20
                }}>
                    ADD BOOK
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
                    <TextInput onChangeText={(value) => {
                        handleTitleText(value)
                    }} value={title} placeholder="Add your title" style={{
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
                    <Text style={style.fieldText}>Ratings</Text>
                    <View style={{
                        flexDirection: "row",
                        gap: 15
                    }}>

                        <StarRating setisrated={setisrated} israted={israted} count="1" />
                        <StarRating setisrated={setisrated} israted={israted} count="2" />
                        <StarRating setisrated={setisrated} israted={israted} count="3" />
                        <StarRating setisrated={setisrated} israted={israted} count="4" />
                        <StarRating setisrated={setisrated} israted={israted} count="5" />


                    </View>
                </View>
                <View style={{
                    gap: 10
                }}>
                    <Text style={style.fieldText}>Category</Text>
                    
                    <Picker
                    selectedValue={category}
                    onValueChange={(value) => {
                        handleCategoryText(value)
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
                        handleSubcateText(value)
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
                        handleFormatText(value)
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
                    <Text style={style.fieldText}>Language</Text>
                    <TextInput onChangeText={(value) => {
                        handleLanguageText(value)
                    }} value={language} placeholder="Book Language" style={{
                        borderWidth: 5,
                        borderColor: "lightgrey",
                        borderRadius: 15
                    }}></TextInput>
                </View>
            </View>


            <View style={{
                alignItems: "center",
                marginTop: 30,
                marginBottom: 30
            }}>
                <TouchableOpacity style={{
                    backgroundColor: "lightgrey",
                    padding: 10,
                    borderRadius: 10
                }}
                    onPress={submitBook}>
                    <Text style={style.fieldText}>Add Book</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const style = StyleSheet.create({
    fieldText: {
        color: "grey",
        fontSize: 24,
        fontWeight: "700",


    }
})