import { Text, SafeAreaView, View } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance, useColorScheme, StatusBar, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import {SlideInDown,FadeInUp, FadeInDown, useAnimatedStyle, withTiming, withDelay } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, TapGestureHandler, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";

const Home = () =>{

    //Status bar check
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[{height :STATUSBAR_HEIGHT }, { backgroundColor }]}>
          <SafeAreaView>
            <StatusBar translucent backgroundColor={backgroundColor} {...props} />
          </SafeAreaView>
        </View>
      );
    

      //change text and function state
      const [pressText, setPressText] = useState("Next");

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
    const [isActive, setIsActive] = useState(false);
    const [noticeIsActive,setNoticeIsActive] = useState(false);
    let InstructionSetMode = isActive? styles.InstructionSetActive: styles.InstructionSet;
    const animatedStyles = useAnimatedStyle(()=>{
        return {
            transform :[
                {
                    translateY : isActive? withTiming(-580):withTiming(175)
                }
            ]
        }
    });
    const changeActive = () =>{
        setPressText("Start");
        setIsActive(!isActive);
    }

    //Change to Scan Page
    const changePage = () =>{
        router.push("/Scanpage");
    }

    //Notice State change
    const NoticeAnimation = useAnimatedStyle(() =>{
        return {
        transform : [
             {
            translateY : noticeIsActive? withTiming(0):withTiming(5000)
            }
        ]}
    })

    //PageStates
    const stateTrigger = () => {
        if (!isActive) {
            setPressText("Start");
            setIsActive(!isActive);
        }
        else{
            //setNoticeIsActive(true);
            router.push("/Scanpage");
        }
    }

  


    // this represents the code of the first page(Home page) of the app
    return(
        
            <GestureHandlerRootView style = {ContainerTheme}>
            <MyStatusBar  backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"}/>
            <Animated.Text style={styles.Title} entering={FadeInUp}>Test Access</Animated.Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style = {styles.ScrollViewStyle}>
            <Text style = {WelcomTextTheme}>Welcome !</Text>
            <Animated.Image source = {require("../src/image/homepage_image.png")} style= {styles.firstImageStyle}></Animated.Image>  
            <Text style = {IndicationTextTheme}>Here is a quick guide:</Text>                                                    
            <Animated.View style ={[styles.InstructionSet,animatedStyles]}>
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
            </Animated.View>
            </ScrollView>
            <View style = {styles.Pressable} >  
            <Pressable  onPress = {() =>{stateTrigger() }}  asChild>
                    <Text style={styles.Button}>{pressText}</Text>
            </Pressable>
            </View> 
            <Animated.View style={[styles.CameraPermissionView,NoticeAnimation]}>
                <Text style={[WelcomTextTheme, {color : "#7AA8AE"}]}>Notice !</Text>
                <Animated.View style = {[styles.NoticeText]}>
                    <Text style ={[styles.InstructionDescription,{margin : 40},{textAlign: "center"}]}>This appliction needs Camera permission</Text>
                    <Pressable style = {[styles.NoticeButton,{position : "relative"}]}>
                        <Text style = {[styles.Button,{fontSize:20}]}>Permit</Text>
                    </Pressable>
                </Animated.View>
            </Animated.View>
            
            </GestureHandlerRootView>
            
        
    )
}

export default Home;