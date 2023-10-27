import { Text, SafeAreaView } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance, useColorScheme, StatusBar } from "react-native";
import { Link } from "expo-router";
import {SlideInDown,FadeInUp } from "react-native-reanimated";
import Animated from "react-native-reanimated";

const Home = () =>{
    let colorsheme = useColorScheme();
    let ContainerTheme = colorsheme ==='light'? styles.Lightmode : styles.Darkmode; //theme of the viewpage
    let WelcomTextTheme = colorsheme ==='light'? styles.WelcomeLight : styles.WelcomeDark; //Theme of Welcome Text
    let IndicationTextTheme = colorsheme ==='light'? styles.ClickonLight : styles.ClickonDark; // Indication Text Theme
    // this represents the code of the first page(Home page) of the app
    return(
        <SafeAreaView style = {ContainerTheme}>
            <StatusBar  backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"}/>
            <Animated.Text style={styles.Title} entering={FadeInUp}>Test Access</Animated.Text>                                                                               
            <SafeAreaView style ={layout_styles.Center}>                
                <Text style={WelcomTextTheme}>Welcome</Text> 
                <Text style={IndicationTextTheme}>Click on Start to begin scanning</Text>
                <Image source ={require('../src/image/homepage_image.png')} style={styles.Imagee}></Image>
            </SafeAreaView>
            <Link href="/Scanpage" style = {styles.Pressable} asChild>
            <Pressable >
                    <Text style={styles.Button}>start</Text>
            </Pressable>
            </Link>
        </SafeAreaView>
        
    )
}
export default Home;