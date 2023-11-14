import { Text, SafeAreaView, View } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance, useColorScheme, StatusBar } from "react-native";
import { Link, router } from "expo-router";
import {SlideInDown,FadeInUp, FadeInDown } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, TapGestureHandler, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

const Home = () =>{

    //Double Tap Function on an Html element
    let lastpress = 0; // last time tap
    const DoubleTap = () =>{                    //DoubleTap function that detects double press in the middle of the screen
        const time = new Date().getTime(); //Get Time Press
        const delta = time - lastpress;
        const delay = 400; //Press Delay
        if (delta < delay) {
            router.push({pathname: "/Scanpage"});
        }
        lastpress = time;
    }
    //


    //Dark and Light Theme Handler
    let colorsheme = useColorScheme();
    let ContainerTheme = colorsheme ==='light'? styles.Lightmode : styles.Darkmode; //theme of the viewpage
    let WelcomTextTheme = colorsheme ==='light'? styles.WelcomeLight : styles.WelcomeDark; //Theme of Welcome Text
    let IndicationTextTheme = colorsheme ==='light'? styles.ClickonLight : styles.ClickonDark; // Indication Text Theme


    //Switch to Instructions Handler



    // this represents the code of the first page(Home page) of the app
    return(
        
            <GestureHandlerRootView style = {ContainerTheme}>
            <StatusBar  backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"}/>
            <Animated.Text style={styles.Title} entering={FadeInUp}>Test Access</Animated.Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style = {styles.ScrollViewStyle}>
            <Text style = {WelcomTextTheme}>Welcome !</Text>
            <Image source = {require("../src/image/homepage_image.png")} style= {styles.firstImageStyle}></Image>  
            <Text style = {IndicationTextTheme}>Here is a quick guide:</Text>                                                    
            <SafeAreaView style ={styles.InstructionSet}>
                <View style={styles.InstructionBlock}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {styles.InstructionInsideBlock}>
                    <Text style = {styles.InstructionTitle}>Start</Text>
                    <Text style = {styles.InstructionDescription}>Start by clicking on the start button or use text command</Text>
                    </View>
                </View>
                <View style={styles.InstructionBlock}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {styles.InstructionInsideBlock}>
                    <Text style = {styles.InstructionTitle}>Scan</Text>
                    <Text style = {styles.InstructionDescription}>Take a picture of the covid test by placing it in the middle of the camera</Text>
                    </View>
                </View>
                <View style={styles.InstructionBlock}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {styles.InstructionInsideBlock}>
                    <Text style = {styles.InstructionTitle}>Analyse</Text>
                    <Text style = {styles.InstructionDescription}>The system will analyse and indicate the result of the test</Text>
                    </View>
                </View>
            </SafeAreaView>
            </ScrollView>
                
            <Link href="/Scanpage" style = {styles.Pressable} asChild>
            <Pressable >
                    <Text style={styles.Button}>start</Text>
            </Pressable>
            </Link>
            </GestureHandlerRootView>
        
    )
}

export default Home;