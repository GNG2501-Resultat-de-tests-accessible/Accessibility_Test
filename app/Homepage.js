import { Text, SafeAreaView, View } from "react-native";
import styles from "../Style/Homepage_style.js";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Button, Pressable, Appearance, useColorScheme, StatusBar, StyleSheet } from "react-native";
import { Link, router } from "expo-router";
import {SlideInDown,FadeInUp, FadeInDown, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { Gesture, TapGestureHandler, GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useState } from "react";
import { BlurView } from "expo-blur";

const Home = () =>{

    //Status bar check
    const STATUSBAR_HEIGHT = StatusBar.currentHeight;
    const MyStatusBar = ({backgroundColor, ...props}) => (
        <View style={[{height :STATUSBAR_HEIGHT }, { backgroundColor },{zIndex:0}]}>
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
            console.log("doubleTap");
            stateTrigger();
        }
        lastpress = time;
    }
    //


    //Dark and Light Theme Handler
    let colorsheme = useColorScheme();
    let bgcolor =colorsheme ==='light'?"#ffffff": "#231f26"; //Theme of the bg color
    let textTheme = colorsheme=='light'? "#000000":"#ffffff"; //Theme of every text
    let ContainerTheme =colorsheme=='light'? '#e8e8e8':"#252936";
    let Themes = StyleSheet.create({bg: {backgroundColor:bgcolor}, Text:{color: textTheme}, Container : {backgroundColor: ContainerTheme}})


    //Switch to Instructions Handler
    const [isActive, setIsActive] = useState(false);
    const [stateNum,setStateNum] = useState(0);
    const [noticeIsActive,setNoticeIsActive] = useState(false);
    const animatedStyles = useAnimatedStyle(()=>{
        return {
            width: numInstruction==404? withTiming(400):withTiming(350),
            transform :[
                {
                    translateY : numInstruction==404? withTiming(-560,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(175),
                }
            ]
        }
    });

    //Notice State change
    const NoticeAnimation = useAnimatedStyle(() =>{
        return {
        transform : [
             {
            translateY : noticeIsActive? withTiming(0,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(800)
            }
        ]}
    })


    //Animation of Homepage states
    const [firstInstruction,setFirstInstruction] = useState(null);
    const [numInstruction,setNumInstruction] = useState(0);
    const FirstInstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:numInstruction==1?withTiming(1):withTiming(0),
            transform:[
                {
                translateY : numInstruction==2? withTiming(-800) : numInstruction==1?withTiming(-560,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0),
                }
            ]
        }
    })

    const SecondInstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:numInstruction==2?withTiming(1):withTiming(0),
            transform:[
                {
                translateY : numInstruction==3? withTiming(-900) : numInstruction==2?withTiming(-760,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0),
                }
            ]
        }
    })

    const ThirdInstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:numInstruction==3?withTiming(1):withTiming(0),
            transform:[
                {
                translateY : numInstruction==4? withTiming(-900) : numInstruction==3?withTiming(-940,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0),
                }
            ]
        }
    })


    const fadingupAnimation = useAnimatedStyle(()=>{
        return{
            opacity: isActive? withTiming(0,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(1,{duration:400, easing:Easing.inOut(Easing.quad)}),
            transform:[
                {
                    translateY : isActive? withTiming(-500):withTiming(0)
                }
            ]
        }
    })

    const buttonAnimation = useAnimatedStyle(() =>{
        return{
            backgroundColor: isActive? withTiming('rgba(52, 52, 52, 0.8)',{duration:400, easing:Easing.inOut(Easing.quad)}): withTiming("#7AA8AE"),
            transform: [
                {
                    translateY: isActive? withTiming(-160,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0)
                }
            ]
        }
    })

    //PageStates
    function stateTrigger() {
        if (numInstruction==0) {
            setIsActive(!isActive);
            setNumInstruction(1);
            setFirstInstruction(FirstInstructAnimation);
        }
        if(numInstruction==1){
            console.log("w");
            setNumInstruction(2);
        }
        if(numInstruction==2){
            console.log("w");
            setNumInstruction(3);
        }
        if(numInstruction==3){
            setPressText("Start");
            router.push("./Scanpage")
            setNumInstruction(4);
        }
    }

  


    // this represents the code of the first page(Home page) of the app
    return(
            <GestureHandlerRootView onStartShouldSetResponder={DoubleTap} style = {[styles.Backgound,Themes.bg]}>
            <MyStatusBar  backgroundColor= {colorsheme=== 'light'? "#ffffff": "#231f26"}/>
            <Animated.Text style={styles.Title} entering={FadeInUp}>Test Access</Animated.Text>
            <Animated.Text style = {[styles.Welcome,fadingupAnimation,Themes.Text]}>Welcome !</Animated.Text>
            <Animated.Image source = {require("../src/image/homepage_image.png")} style= {[styles.firstImageStyle, fadingupAnimation]}></Animated.Image>  
            <Animated.Text style = {[styles.Guide,fadingupAnimation,Themes.Text]}>Here is a quick guide:</Animated.Text>   



            <Animated.View style ={[styles.InstructionSet,animatedStyles]}>
                <Animated.View style={[styles.InstructionBlock,FirstInstructAnimation,Themes.Container]}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {[styles.InstructionInsideBlock,Themes.bg]}>
                    <Text style = {styles.InstructionTitle}>Start</Text>
                    <Text style = {[styles.InstructionDescription,Themes.Text]}>Start by clicking on the start button or use text command</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.InstructionBlock,SecondInstructAnimation,Themes.Container]}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {[styles.InstructionInsideBlock,Themes.bg]}>
                    <Text style = {styles.InstructionTitle}>Scan</Text>
                    <Text style = {[styles.InstructionDescription,Themes.Text]}>Take a picture of the covid test by placing it in the middle of the camera</Text>
                    </View>
                </Animated.View>
                <Animated.View style={[styles.InstructionBlock,ThirdInstructAnimation,Themes.Container]}>
                    <Image source = {require("../src/image/homepage_image.png")} style= {styles.Imagee}></Image>
                    <View style = {[styles.InstructionInsideBlock,Themes.bg]}>
                    <Text style = {styles.InstructionTitle}>Analyse</Text>
                    <Text style = {[styles.InstructionDescription,Themes.Text]}>The system will analyse and indicate the result of the test</Text>
                    </View>
                </Animated.View>
            </Animated.View>

            <Animated.View style = {[styles.Pressable,buttonAnimation]} >  
            <Pressable  onPress={()=>stateTrigger()}  asChild>
                    <Text style={styles.Button}>{pressText}</Text>
            </Pressable>
            </Animated.View>

            
            <Animated.View style={[styles.CameraPermissionView,NoticeAnimation]}>
                <Text style={[styles.Welcome, {color : "#7AA8AE"}]}>Notice !</Text>
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