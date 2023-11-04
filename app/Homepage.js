import { Text, SafeAreaView } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance, useColorScheme, StatusBar } from "react-native";
import { Link, router } from "expo-router";
import {SlideInDown,FadeInUp, FadeInDown } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, TapGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";

const Home = () =>{
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
    
    let colorsheme = useColorScheme();
    let ContainerTheme = colorsheme ==='light'? styles.Lightmode : styles.Darkmode; //theme of the viewpage
    let WelcomTextTheme = colorsheme ==='light'? styles.WelcomeLight : styles.WelcomeDark; //Theme of Welcome Text
    let IndicationTextTheme = colorsheme ==='light'? styles.ClickonLight : styles.ClickonDark; // Indication Text Theme
    // this represents the code of the first page(Home page) of the app
    return(
        
            <GestureHandlerRootView style = {ContainerTheme}>
            <StatusBar  backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"}/>
            <Animated.Text style={styles.Title} entering={FadeInUp}>Test Access</Animated.Text>                                                                               
            <SafeAreaView onStartShouldSetResponder={(evt) =>DoubleTap()} style ={layout_styles.Center}>                
                <Animated.Text entering={FadeInUp} style={WelcomTextTheme}>Welcome</Animated.Text> 
                <Animated.Text entering={FadeInUp} style={IndicationTextTheme}>Click on Start to begin scanning</Animated.Text>
                <Animated.Image entering={FadeInDown} source ={require('../src/image/homepage_image.png')} style={styles.Imagee}></Animated.Image>
            </SafeAreaView>
            <Link href="/Scanpage" style = {styles.Pressable} asChild>
            <Pressable >
                    <Text style={styles.Button}>start</Text>
            </Pressable>
            </Link>
            </GestureHandlerRootView>
        
    )
}

export default Home;