import { View, Text, SafeAreaView } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance } from "react-native";
import * as image from '../src/image/homepage_image.png';
import { Link } from "expo-router";
import Scan from "./Scanpage.js";

const Home = () =>{
    // this represents the code of the first page(Home page) of the app
    return(
        <SafeAreaView>                                                                                  
            <Text style={styles.Title}>Test Access</Text>
            <SafeAreaView style ={layout_styles.Center}>                
                <Text style={styles.Welcome}>Welcome</Text> 
                <Text>Click on Start to begin scanning</Text>
                <Image source ={require('../src/image/homepage_image.png')} style={styles.Imagee}></Image>
            </SafeAreaView>
            <Pressable style = {styles.Pressable}>
                    <Text style={styles.Button}>start</Text>
            </Pressable>
        </SafeAreaView>
        
    )
}
export default Home;