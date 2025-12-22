import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FilePdfIcon, StarIcon, Starhalf, UploadSimpleIcon, X } from "phosphor-react-native"
import StarRating from "../../components/starrating"
import { createContext, useState } from "react"
import { Picker } from "@react-native-picker/picker"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CameraComponent from "../../components/CameraComponent"
import ip from "../../components/ip"
import { Image } from "react-native";
import * as DocumentPicker from "expo-document-picker"
import { LinearGradient } from "expo-linear-gradient"
import * as ImagePicker from "expo-image-picker"

export default function AddBook() {

    const [showCamera, setShowCamera] = useState(false);
    const [photouri, setphotouri] = useState(null)
    const [loadingPhoto, setloadingPhoto] = useState(false)
    const [loadingPdf, setloadingPdf] = useState(false)
    const [israted, setisrated] = useState([])
    const [pdfuri, setpdfuri] = useState("")
    const [title, settitle] = useState("");
    const [category, setcategory] = useState("");
    const [subcategory, setsubcategory] = useState("");
    const [format, setformat] = useState("");
    const [language, setlanguage] = useState("");

    const [bookUrl, setbookUrl] = useState("")
    const [pdfUrl, setpdfUrl] = useState("")

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



    const handleGalleryImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status != "granted") {
                alert("Permission denied")
                return;
            }

            setloadingPhoto(true)
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 0.7,
            })

            if (result.canceled) {
                setloadingPhoto(false)
                return
            }



            const formdata = new FormData()

            formdata.append("image", {
                uri: result?.assets[0]?.uri,
                name: result?.assets[0]?.name,
                type: result?.assets[0]?.mimeType
            }

            )


            formdata.append("upload_preset", "mobile_unsigned")


            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dnkfrbwde/raw/upload",
                {
                    method: "POST",
                    body: formdata,
                }
            );


            console.log(response)
            const imageUrldata = await response.json();

            const cloudUrl = imageUrldata.secure_url

            setbookUrl(cloudUrl)

            setphotouri(result?.assets[0]?.uri)

            setloadingPhoto(false)

        }

        catch (err) {
            console.log("Photo Selection error:", err);
            setloadingPhoto(false)
        }

    }


    async function handlePdf() {

        try {
            setloadingPdf(true)
            const selectPdf = await DocumentPicker.getDocumentAsync({
                "type": "application/pdf"
            });

            if (selectPdf.canceled) {
                alert("Pdf upload cancelled")
                setloadingPdf(false)
                return;
            }

            const data = selectPdf?.assets[0];


            const formdata = new FormData()

            formdata.append("file", {
                uri: data?.uri,
                name: data?.name,
                type: data?.mimeType
            }

            )


            formdata.append("upload_preset", "mobile_unsigned")

            setpdfuri(data?.uri)
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dnkfrbwde/raw/upload",
                {
                    method: "POST",
                    body: formdata,
                }
            );

            const uploadedPdf = await response.json();

            const url = uploadedPdf?.secure_url;

            setpdfUrl(url);
            setloadingPdf(false)

        }
        catch (err) {
            console.log("Pdf Selection error:", err);
            setloadingPdf(false)
        }


    }
    async function submitBook() {

        console.log("Book submit")

        try {


            if (!title.trim() || !category.trim() || !subcategory.trim() || !format.trim() || !language.trim()) {
                alert("Fill all the fields Properly")
                return
            }

            const token = await AsyncStorage.getItem("logedUser")

            console.log(token)
            let rateCount = 0;
            israted.forEach((value) => {
                rateCount += value
            })




            const response = await fetch(`http://${ip}:3000/book/create`, {
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
                    "rating": rateCount,
                    "img": bookUrl,
                    "pdf": pdfUrl,
                    "token": token
                })

            })

            settitle("")
            setcategory("")
            setformat("")
            setlanguage("")
            setsubcategory("")
            setphotouri("")

            const data = await response.json()

            console.log(data)
            if (data) {
                alert(
                    `Book Added to DataBase
                
                Title : ${data.data.title} 
                Category : ${data.data.category}
                Sub-category : ${data.data.subcategory}
                Format :  ${data.data.format}
                Language :${data.data.language}
                img : ${data.data.img}
                pdf : ${data.data.pdf}
                `
                )
            }
        }
        catch (err) {
            console.log("catch")
            alert(err.message || "Something went wrong")
        }
    }

    return (



        <ScrollView style={{
            backgroundColor: "#ECEBDE"
        }}>

            <View style={{
                height: 80,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    marginTop: 20,
                    color: "#55502cff"
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
                    <Text style={style.fieldText}>Book Title</Text>
                    <TextInput onChangeText={(value) => {
                        handleTitleText(value)
                    }} value={title} placeholder="Book Title" style={{
                        borderWidth: 2,
                        paddingHorizontal: 10,
                        borderColor: "#847c56ff",
                        borderRadius: 10
                    }}>

                    </TextInput>
                </View>

                {showCamera ? (
                    <View style={{
                        height: '600'
                    }}>
                        <CameraComponent setbookUrl={setbookUrl}
                            onCapture={(uri) => {
                                setphotouri(uri);
                                setShowCamera(false);
                            }}
                            onCancel={() => setShowCamera(false)}
                        />
                    </View>
                )
                    :
                    (
                        <View style={{
                            gap: 15,
                            borderRadius: 10,
                            borderWidth: 2,
                            borderStyle: "dashed",
                            padding: 10,

                            borderColor: "#847c56ff"
                        }}>
                            <View style={{
                                gap: 5,
                                margin: 10
                            }}>
                                <UploadSimpleIcon style={{ margin: "auto" }} size={42} color="#847c56ff" />
                                <Text style={{
                                    color: "#847c56ff",
                                    fontWeight: "bold"
                                    , fontSize: 20,
                                    margin: "auto"
                                }}>
                                    Upload Image
                                </Text>
                            </View>
                            <Button color={"#a9a384ff"} title={photouri ? "Change Photo" : "Take Photo"} onPress={() => setShowCamera(true)} />
                            {loadingPhoto ? <ActivityIndicator size={"large"}></ActivityIndicator> : <Button color={"#a9a384ff"} title={photouri ? "Change from Gallery" : "Choose from Gallery"} onPress={() => {
                                handleGalleryImage()
                            }} />}

                            {photouri && (
                                <>
                                    <Image
                                        source={{ uri: photouri }}
                                        style={{ width: 150, height: 150, marginTop: 10 }}
                                    />
                                    <TouchableOpacity onPress={()=>{
                                        setphotouri("")
                                    }} style={{ backgroundColor : "red", bottom : 138,left : 138, position : "absolute"}}><X size={22} />

                                    </TouchableOpacity>
                                </>
                            )}
                        </View>
                    )}

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

                    <View style={{
                        borderWidth: 2,
                        borderColor: "#847c56ff",
                        borderRadius: 10,

                    }}>
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

                </View>
                <View style={{
                    gap: 10
                }}>
                    <Text style={style.fieldText}>Sub-Category</Text>

                    <View style={{
                        borderWidth: 2,
                        borderColor: "#847c56ff",
                        borderRadius: 10,

                    }}>
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
                </View>
                <View style={{
                    gap: 10
                }}>
                    <Text style={style.fieldText}>Format</Text>

                    <View style={{
                        borderWidth: 2,
                        borderColor: "#847c56ff",
                        borderRadius: 10,

                    }}>
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
                </View>
                <View style={{
                    gap: 10
                }}>
                    <Text style={style.fieldText}>Language</Text>
                    <TextInput onChangeText={(value) => {
                        handleLanguageText(value)
                    }} value={language} placeholder="Book Language" style={{
                        borderWidth: 2,
                        paddingHorizontal: 10,
                        borderColor: "#847c56ff",
                        borderRadius: 10
                    }}></TextInput>
                </View>

                {loadingPdf ? <ActivityIndicator size={"large"} /> : <View style={{
                    gap: 15,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderStyle: "dashed",
                    padding: 10,

                    borderColor: "#847c56ff"
                }}>
                    <FilePdfIcon style={{ margin: "auto" }} size={42} />
                    <Button color={"#a9a384ff"} title={pdfuri ? "Change Pdf" : "Upload Pdf"} onPress={handlePdf}></Button>
                    {
                        pdfuri && <View style={
                            {
                                flexDirection: "row",
                                marginHorizontal: 7
                            }
                        }>
                            <FilePdfIcon size={32} />
                            <Text>{pdfuri}</Text>
                        </View>
                    }
                </View>}


            </View>


            <View style={{
                alignItems: "center",
                marginTop: 30,
                marginBottom: 30
            }}>
                <TouchableOpacity style={{
                    backgroundColor: "#55502cff",
                    padding: 10,
                    paddingHorizontal: 25,
                    borderRadius: 10
                }}
                    onPress={submitBook}>
                    <Text style={{ ...style.fieldText, color: "#f4f3efff" }}>Add Book</Text>
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