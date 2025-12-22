import { FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SubCategory, Category } from "../../components/category"
import { ArrowsInLineVertical, Club, Cross, CrossIcon, DotsThreeCircle, Flask, HandsPraying, Heart, MagnifyingGlass, Money, TwitchLogo, User, UserFocus, UserFocusIcon } from "phosphor-react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import ip from "../../components/ip";
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage() {
    const [category, setcategory] = useState("friction")
    const [featured, setfeatured] = useState([])
    const [trending, settrending] = useState([])
    const [newdata, setnewdata] = useState([])
    const [evergreen, setevergreen] = useState([])
    const [showSearchData, setshowSearchData] = useState(false)
    const [showSearch, setshowSearch] = useState(false)
    const [bookRecord, setbookRecord] = useState([])
    const [searchbook, setsearchbook] = useState({})
    const getFeedBooks = async () => {

        try {

            const response = await fetch(`http://${ip}:3000/books`)

            const allBooks = await response.json()




            const featuredBooks = allBooks?.data?.filter((value) => {
                if ((value.category == category) && (value.subcategory === "featured"))
                    return true;
            })
            const trendingBooks = allBooks?.data?.filter((value) => {
                if ((value.category == category) && (value.subcategory === "trending"))
                    return true;
            })

            const newBooks = allBooks?.data?.filter((value) => {
                if ((value.category == category) && (value.subcategory === "new"))
                    return true;
            })
            const evergreenBooks = allBooks?.data?.filter((value) => {
                if ((value.category == category) && (value.subcategory === "evergreen"))
                    return true;
            })
            setfeatured(featuredBooks)
            setnewdata(newBooks)
            setevergreen(evergreenBooks)
            settrending(trendingBooks)
            setbookRecord(allBooks.data)



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
                getFeedBooks()
            }
        })
    })


    return (
       
      
      
        <View style={{
            marginTop: 10,
            paddingBottom: 140,

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
                    <TouchableOpacity onPress={() =>{
                        setshowSearchData(false)
                        setshowSearch(!showSearch)}}>{
                            showSearch ? <ArrowsInLineVertical size={32} /> :
                        <MagnifyingGlass size={32} />}
                    </TouchableOpacity>
                    


                </View>
            </View>

            {showSearch == true && <View style={{
                margin: 10,
                borderRadius: 10,
                borderWidth: 2,
                
            }}>
                <TextInput placeholder="Search Your Books" onChangeText={(value) => {

                    const text = value.toLowerCase();
                   
                    const arr = bookRecord?.filter((item) => {
                        if (item.title.toLowerCase().includes(text))
                            return true
                    })
                    setsearchbook(arr)
                setshowSearchData(true)
                }
                
                }></TextInput>
            </View>}
            {
                showSearchData ?
            
                    <FlatList
                        data={searchbook}
                        
                        renderItem={(value, index) => {
                            return <Category fav={false} getFeedBooks={getFeedBooks} key={index} id={value?._id} data={value.item}></Category>
                        }}

                        numColumns={2}
                       
                    >

                    </FlatList>

                    :

                   
                    <View style={{
                        backgroundColor : "#ECEBDE"
                    }}>
                    
                        <ScrollView style={{
                           
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
                                height : 200

                            }} horizontal={true} showsHorizontalScrollIndicator={false}>{
                                    featured?.map((value, index) => {

                                        return <Category fav={false} getFeedBooks={getFeedBooks} key={index} id={value?._id} data={value}></Category>
                                    })
                                }
                            </ScrollView>
                            <Text style={{ marginLeft: 10, fontSize: 23 }}>Trending</Text>
                            <View>

                                <ScrollView style={{
                                    margin: 5,
                                    padding: 5,
                                    gap: 10,
                                    height : 200,
                                 
                                }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        trending?.map((value, index) => {

                                            return <Category fav={false} getFeedBooks={getFeedBooks} key={index} id={value?._id} data={value}></Category>
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
                                    height: 200

                                }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        newdata?.map((value, index) => {

                                            return <Category fav={false} getFeedBooks={getFeedBooks} key={index} id={value?._id} data={value}></Category>
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
                                    height: 200

                                }} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {
                                        evergreen?.map((value, index) => {

                                            return <Category fav={false} getFeedBooks={getFeedBooks} key={index} id={value?._id} data={value}></Category>
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </ScrollView>
              </View>
              
}
        </View>
      
    )
}