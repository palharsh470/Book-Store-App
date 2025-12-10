import { useState } from "react";
import { Image, ImageBackground, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

import ip from "../components/ip";

export default function Login() {

    const [isLogin, setisLogin] = useState(false)
    const [loginUserName, setloginUserName] = useState("");
    const [loginPassword, setloginPassword] = useState("")
    const [email, setemail] = useState("")
    const [signupUserName, setSigupUserName] = useState("")
    const [signupPassword, setSignupPassword] = useState("")
    const [err, seterr] = useState("")


    async function handleLogin() {

        try {

            if(!loginUserName?.trim() || !loginPassword?.trim()){
                alert("Invalid credentials");
                setloginPassword("")
                setloginUserName("")
                return
            }

            const response = await fetch(`http:/${ip}:3000/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "username": loginUserName, "password": loginPassword })

            })
            const loginData = await response.json();
            if (loginData.success == false) {
                seterr(loginData.message)
                alert(loginData.message)
                return
            }

            const token = loginData.token;
            await AsyncStorage.setItem("logedUser", token);

            alert("User logged in")
            router.replace("/(tabs)")

            setloginPassword("")
            setloginUserName("")

        }
        catch (err) {
            seterr(err.message)
            alert(err.message)
        }

    }

    async function handleSignup() {

        try {

            if(!signupPassword?.trim() || !signupUserName?.trim() || !email?.trim()){
                alert("Invalid credentials");
                setSignupPassword("")
                setSigupUserName("")
                setemail("")
                return
            }

            const response = await fetch(`http:/${ip}:3000/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "username": signupUserName, "email": email, "password": signupPassword })

            })
            const signupData = await response.json();

            if (signupData.success == false) {
                seterr(signupData.message)
                alert(signupData.message)
                return
            }

            const token = signupData.token;
            await AsyncStorage.setItem("logedUser", token);

             router.replace("/(tabs)")
            alert("User created successfully")

            setSignupPassword("")
            setemail("")
            setSigupUserName("")
            
        }
        catch (err) {
            seterr(err.message)
            alert(err.message)
        }
    }
    function login() {
        setisLogin(true)
    }
    function signup() {
        setisLogin(false)
    }
    return (
       

        <View style={{
            height: "100%",
            width: "100%",
            resizeMode: "cover"
        }}>
            <ImageBackground style={{
                width: "100%",
                heigt: "100%",
                paddingTop: 80,
                flex: 1,
                alignItems: "center"
            }} source={require('../assets/bg.png')}>


                <View style={{
                    borderWidth: 5,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 570,
                    width: 300,

                }}>
                    <View style={{
                        paddingTop: 20,
                        alignItems: "center"
                    }}>

                        <Image style={{
                            width: 70,
                            height: 70
                        }} source={require('../assets/logo.png')}></Image>

                        <Text style={{
                            color: "blue",
                            fontSize: 30,
                            fontWeight: "bold"
                        }}>Pathshala</Text>
                    </View>
                    {
                        isLogin &&
                        <View style={{
                            margin: 10
                        }}>

                            <Text style={{
                                color: "black",
                                fontSize: 28,
                                textAlign: "center",
                                fontWeight: "600",
                                marginTop: 25
                            }}>Welcome Back</Text>


                            <View style={{
                                marginTop: -10,
                                alignItems: "flex-start",
                                paddingVertical: 10
                            }}>

                                <Text style={{
                                    color: "grey",
                                    fontSize: 25,
                                    fontWeight: "600",
                                    marginTop: 20,
                                    marginBottom: 10

                                }}>Enter username</Text>

                                <TextInput onChangeText={(value) => {
                                    setloginUserName(value)
                                }}
                                    value={loginUserName} placeholder="Your Username">

                                </TextInput>

                                <View style={{
                                    borderWidth: 2,
                                    borderColor: "grey",
                                    height: 0,
                                    backgroundColor: "grey",
                                    width: "90%", opacity: 0.3,

                                }}></View>
                                <Text style={{
                                    color: "grey",
                                    fontSize: 25,
                                    fontWeight: "600",
                                    marginTop: 30,
                                    marginBottom: 10
                                }}>Enter Password</Text>
                                <TextInput onChangeText={(value) => {
                                    setloginPassword(value)
                                }}
                                    value={loginPassword} placeholder="Your Password">


                                </TextInput>
                                <View style={{
                                    borderWidth: 2,
                                    borderColor: "grey",
                                    height: 0,
                                    backgroundColor: "grey",
                                    width: "90%", opacity: 0.3

                                }}></View>

                            </View>

                            <TouchableOpacity >
                                <Text style={{
                                    color: "red",
                                    textAlign: "right",
                                    margin: 5,
                                    fontWeight: "600",
                                    marginRight: 15
                                }}>
                                    ? Forgot Password
                                </Text>
                            </TouchableOpacity>


                            <View style={{
                                alignItems: "center",
                                margin: 15
                            }}>

                                <View style={{
                                    width: "60%",
                                    backgroundColor: "blue",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 5,
                                    borderRadius: 10
                                }}>
                                    <TouchableOpacity onPress={handleLogin}>
                                        <Text style={{
                                            fontWeight: 600,
                                            color: "white",
                                            fontSize: 18
                                        }}>
                                            Login
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    margin: 5
                                }}>

                                    <Text style={{
                                        fontWeight: "600",
                                    }}>
                                        Don't have an account
                                    </Text>

                                    <TouchableOpacity onPress={signup}>
                                        <Text style={{
                                            color: "blue",
                                            marginLeft: 5
                                        }}>
                                            sign up
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        </View>
                    }
                    {!isLogin &&
                        <View style={{
                            margin: 10
                        }}>

                            <Text style={{
                                color: "black",
                                fontSize: 28,
                                textAlign: "center",
                                fontWeight: "600",
                                marginTop: 10
                            }}>Welcome</Text>


                            <View style={{
                                marginTop: -10,
                                alignItems: "flex-start",
                                paddingVertical: 10
                            }}>

                                <Text style={{
                                    color: "grey",
                                    fontSize: 25,
                                    fontWeight: "600",
                                    marginTop: 20,


                                }}>Enter username</Text>

                                <TextInput onChangeText={(value)=>{
                                    setSigupUserName(value)
                                }} value={signupUserName} placeholder="Your Username">

                                </TextInput>

                                <View style={{
                                    borderWidth: 2,
                                    borderColor: "grey",
                                    height: 0,
                                    backgroundColor: "grey",
                                    width: "90%", opacity: 0.3,

                                }}></View>
                                <Text style={{
                                    color: "grey",
                                    fontSize: 25,
                                    fontWeight: "600",
                                    marginTop: 15,

                                }}>Enter Email</Text>
                                <TextInput style={{

                                }} onChangeText={(value)=>{
                                    setemail(value)
                                }} value={email} placeholder="Your Email">

                                </TextInput>
                                <View style={{
                                    borderWidth: 2,
                                    borderColor: "grey",
                                    height: 0,
                                    backgroundColor: "grey",
                                    width: "90%", opacity: 0.3

                                }}></View>
                                <Text style={{
                                    color: "grey",
                                    fontSize: 25,
                                    fontWeight: "600",
                                    marginTop: 15,

                                }}>Enter Password</Text>
                                <TextInput style={{

                                }} onChangeText={(value)=>{
                                    setSignupPassword(value)
                                }} value={signupPassword} placeholder="Your Password">

                                </TextInput>
                                <View style={{
                                    borderWidth: 2,
                                    borderColor: "grey",
                                    height: 0,
                                    backgroundColor: "grey",
                                    width: "90%", opacity: 0.3

                                }}></View>

                            </View>


                            <View style={{
                                alignItems: "center",
                                margin: 10
                            }}>

                                <View style={{
                                    width: "60%",
                                    backgroundColor: "blue",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 5,
                                    borderRadius: 10
                                }}>
                                    <TouchableOpacity onPress={handleSignup} >
                                        <Text style={{
                                            fontWeight: 600,
                                            color: "white",
                                            fontSize: 18
                                        }}>
                                            Sign up
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: "row",
                                    margin: 5
                                }}>

                                    <Text style={{
                                        fontWeight: "600",
                                    }}>
                                        Already have an account
                                    </Text>

                                    <TouchableOpacity onPress={login}>
                                        <Text style={{
                                            color: "blue",
                                            marginLeft: 5
                                        }}>
                                            sign in
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                        </View>}






                </View>

                <TouchableOpacity style={{
                    width: "80%",
                    alignItems: "center",
                    margin: 20,
                    flexDirection: "row",
                    gap: 5,
                    marginLeft: 80
                }}>
                    <Image style={{
                        resizeMode: "cover",
                        width: 40,
                        aspectRatio: 1
                    }} source={require('../assets/google.png')}></Image>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        opacity: 0.75,
                        color : "white"
                    }}>Continue with Google</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}