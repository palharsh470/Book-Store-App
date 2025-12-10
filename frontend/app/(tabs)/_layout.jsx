
import { Tabs } from "expo-router";
import { BookOpenText, FilePlus, Heart, User } from "phosphor-react-native";
import { ActivityIndicatorBase } from "react-native";
export default function Layout(){
    return (
        <Tabs options={{
        }} >
            
            <Tabs.Screen name="index" 
            options={{headerShown:false, title:"Home", tabBarIcon : ()=>{
               return <BookOpenText size={25} />
            }  }}></Tabs.Screen>
            <Tabs.Screen name="addBook"
            options={{headerShown:false ,title:"Add Book", tabBarIcon : ()=>{
               return <FilePlus size={25} />
            } }}></Tabs.Screen>
            <Tabs.Screen name="favourite"
            options={{headerShown:false, title:"Favourites", tabBarIcon : ()=>{
               return <Heart size={25} />
            }}}></Tabs.Screen>
            <Tabs.Screen name="profile"
            options={{headerShown:false, title:"Profile", tabBarIcon : ()=>{
               return <User size={25} />
            }}}></Tabs.Screen>

        </Tabs>
    )
}