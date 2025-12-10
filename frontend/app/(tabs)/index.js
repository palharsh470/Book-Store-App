import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SubCategory, Category } from "../../components/category"
import { Club, DotsThreeCircle, Flask, HandsPraying, Heart, MagnifyingGlass, Money, TwitchLogo, User, UserFocus, UserFocusIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import ip from "../../components/ip";
export default function HomePage() {
    const [category, setcategory] = useState("friction")
    const [featured, setfeatured] = useState([])
    const [trending, settrending] = useState([])
    const [newdata, setnewdata] = useState([])
    const [evergreen, setevergreen] = useState([])

    
    const getFeedBooks = async () => {
       
        try{

            const featuredBooks = await fetch(`http://${ip}:3000/books?category=${category}`, {
                method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subcategory: "featured"
            })

        })
        const trendingBooks = await fetch(`http://${ip}:3000/books?category=${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subcategory: "trending"
            })

        })
        const newBooks = await fetch(`http://${ip}:3000/books?category=${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subcategory: "new"
            })
            
        })
        const evergreenBooks = await fetch(`http://${ip}:3000/books?category=${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                subcategory: "evergreen"
            })

        })
        const data1 = await featuredBooks.json()
        const data2 = await trendingBooks.json()
        const data3 = await newBooks.json()
        const data4 = await evergreenBooks.json()
        setfeatured(data1)
        setnewdata(data3)
        setevergreen(data4)
        settrending(data2)
    }
    catch(err){
        alert(err.message || "Something went wrong")
    }
       
    }
    useFocusEffect(() => {
        AsyncStorage.getItem("logedUser").then(function (value) {
            
            if (!value) {
                router.replace("/login")
            }
            else {
                getFeedBooks()
            }
        })
    })


    return (
        <View style={{
            marginTop: 10,
            paddingBottom: 80,
          
        }}>

            <View style={{
                backgroundColor: "white",
                padding: 20,
                paddingBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10
                }}>

                    <View>
                        <Image style={{ height: 40, aspectRatio: 1 }} source={require("../../assets/logo.png")}></Image>
                    </View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>Pathshala</Text>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 20
                }}>
                    <TouchableOpacity>
                        <MagnifyingGlass size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <User size={32} />
                    </TouchableOpacity>


                </View>
            </View>
            <ScrollView style={{
                  backgroundColor : "#eef0d5",
                height: "100%",
            }}>
                <View>

                    <ScrollView style={{
                        margin: 5,


                        height: 100

                    }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <SubCategory category={category} setcategory={setcategory} logo={<Heart size={32} />} text="friction"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<Flask size={32} />} text="science"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<Club size={32} />} text="politics"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<Money size={32} />} text="economy"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<UserFocus size={32} />} text="biopic"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<TwitchLogo size={32} />} text="social"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<HandsPraying size={32} />} text="religion"></SubCategory>
                        <SubCategory category={category} setcategory={setcategory} logo={<DotsThreeCircle size={32} />} text="other"></SubCategory>

                    </ScrollView>

                </View>
                <Text style={{ marginLeft: 10, fontSize: 23 }}>Featured</Text>


                <ScrollView style={{
                    margin: 5,
                    padding: 5,
                    gap: 10,
                    height: 320

                }} horizontal={true} showsHorizontalScrollIndicator={false}>{
                        featured?.data?.map((value, index) => {

                            return <Category  fav={false} getFeedBooks={getFeedBooks} key={index} id={value?._id} data={value}></Category>
                        })
                    }
                </ScrollView>
                <Text style={{ marginLeft: 10, fontSize: 23 }}>Trending</Text>
                <View>

                    <ScrollView style={{
                        margin: 5,
                        padding: 5,
                        gap: 10,
                        height: 320

                    }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            trending?.data?.map((value, index) => {
                              
                                return <Category fav={false} getFeedBooks={getFeedBooks}  key={index} id={value?._id}  data={value}></Category>
                            })
                        }
                    </ScrollView >
                </View>

                <Text style={{ marginLeft: 10, fontSize: 23 }}>New</Text>
                <View>
                    <ScrollView style={{
                        margin: 5,
                        padding: 5,
                        gap: 10,
                        height: 320

                    }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            newdata?.data?.map((value, index) => {

                                return <Category fav={false} getFeedBooks={getFeedBooks}  key={index} id={value?._id}  data={value}></Category>
                            })
                        }
                    </ScrollView>


                </View>
                <Text style={{ marginLeft: 10, fontSize: 23 }}>Evergreen</Text>
                <View>
                    <ScrollView style={{
                        margin: 5,
                        padding: 5,
                        gap: 10,
                        height: 320

                    }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            evergreen?.data?.map((value, index) => {

                                return <Category fav={false} getFeedBooks={getFeedBooks}  key={index} id={value?._id}  data={value}></Category>
                            })
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}