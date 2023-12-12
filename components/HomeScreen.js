import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	useColorScheme,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
	Image,
	Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageViewer from "./ImageViewer";
import { normalize } from "../utils/utils";
import Animated, { useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";
import { useState } from "react";
import Scan from "./Scanpage";

//Get the width and height of the screen:
const screenWidth = Dimensions.get("window").width; // Screen Width
const screenHeight = Dimensions.get("window").height; // Screen Height



export default function HomeScreen() {

	
	

	//Double Tap Handler:
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

	//Text on The Pressable:
	const [pressableText, setpressableText] = useState("Start");


	//Handle States
	function stateTrigger() {
		if (numInstruction == 0) {
			setIsActive(true); //Start showing the instructions
			setNumInstruction(1); //showing the first Instruction
			setpressableText("Next") //change the pressable text
			
		}
		if (numInstruction==1) {
			setNumInstruction(2); //showing the second instruction
		}
		if (numInstruction==2) {
			setNumInstruction(3); //showing the second instruction
		}
		if (numInstruction==3) {
			setNumInstruction(0);
			setIsActive(false);
			navigation.navigate("Scan"); //Go to scanPage
		}
		
	}
	
	  
	//TODO maybe add if statement for SafeAreaView and android (Platform.OS === "android")
	//TODO make it so that the text isnt cut off at bigger sizes
	//TODO use modal for instructions (tap left for next, tap right for previous)

	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
	const bgContainerContrast = colorScheme === "light" ? "#f2f2f2" : "#151317";
	const bgInsideBlock = colorScheme=="light"? "#f2f2f2": "#1a1d26";

	// const handleTap = () => {
	// 	console.log("Screen Tapped");
	// 	navigation.navigate("Scan");
	// };



	//Animations Functions
	const [numInstruction,setNumInstruction] = useState(0);  // Track which Instruction is showing
	const [isActive, setIsActive] = useState(false); //Track when the app should start showing the instructions 

	//Instructions Animations
	const FirstInstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:numInstruction==1?withTiming(1):withTiming(0),
            transform:[
                {
                translateY : numInstruction==2? withTiming(-800) : numInstruction==1?withTiming(-screenHeight*0.7,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0),
                }
            ]
        }
    })


	const SecondInstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:numInstruction==2?withTiming(1):withTiming(0),
            transform:[
                {
                translateY : numInstruction==3? withTiming(-900) : numInstruction==2?withTiming(-screenHeight*0.7,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0),
                }
            ]
        }
    })

	const ThirdInstructAnimation = useAnimatedStyle(() =>{
        return{
            opacity:numInstruction==3?withTiming(1):withTiming(0),
            transform:[
                {
                translateY : numInstruction==4? withTiming(-900) : numInstruction==3?withTiming(-screenHeight*0.7,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0),
                }
            ]
        }
    })


	// Animation for the main elements in HomePage
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


	// Stat Button in Instruction Animation
	const pressableAnimation = useAnimatedStyle(() =>{
        return{
            transform: [
                {
                    translateY: isActive? withTiming(-screenHeight*0.18,{duration:400, easing:Easing.inOut(Easing.quad)}):withTiming(0)
                }
            ]
        }
    })

	return (
		<TouchableOpacity
			style={styles.touchableOpacityStyle}
			activeOpacity={1.0}
			onPress={DoubleTap}
		>
			<View style={[styles.container, themeContainerStyle]}  >
				<SafeAreaView style={styles.iosSafeArea}>
					<View style = {[styles.titleContainer, {backgroundColor: bgContainerContrast}]}>
				<Text style={styles.Title}>ACCESS-19</Text>
				<Pressable onPress={()=>navigation.navigate("Instruction")}>
				<Image source={require("../assets/question.png")}  style={styles.helpButton}/>
				</Pressable>
				</View>

					<Animated.View style={[styles.mainContainer,fadingupAnimation]}>
					<Text style={[styles.text, themeTextStyle, styles.welcomeText]}>
						Welcome!

					</Text>
					<View style={styles.imageContainer}>
						<ImageViewer
							imageSource={require("../assets/Access-19.png")}
						/>
					</View>
					<Text style={[styles.text, themeTextStyle]}>
						Double-Tap Or Click on Next
					</Text>
					</Animated.View>

				
				{/* Instructions Blocks  (1 for Now, Waiting to implement Aminations functions)*/}
				<Animated.View style={[styles.InstructionView,FirstInstructAnimation]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/start.png")} style={styles.ImageInstruction} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock,{backgroundColor: bgInsideBlock}]}>
                    <Text style = {styles.InstructionTitle}>Start</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>Start by clicking on the start button or Double Tap anywhere on the screen</Text>
                    </View>
                </View>
                </Animated.View>

				<Animated.View style={[styles.InstructionView,SecondInstructAnimation]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/scan.png")} style={[styles.ImageInstruction, {}]} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock,{backgroundColor: bgInsideBlock}]}>
                    <Text style = {styles.InstructionTitle}>Scan</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>Take a picture of the covid test by pressing the scan button or Double Tap</Text>
                    </View>
                </View>
                </Animated.View>

				<Animated.View style={[styles.InstructionView, ThirdInstructAnimation]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/analyse.png") }style={styles.ImageInstruction} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock,{backgroundColor: bgInsideBlock}]}>
                    <Text style = {styles.InstructionTitle}>Analyse</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>The system will analyse and indicate the result of the test in the next page</Text>
                    </View>
                </View>
                </Animated.View>





				{/* Pressable Interaction */}
				<Animated.View style = {[styles.Pressable,pressableAnimation]} >  
            		<Pressable  onPress={()=>stateTrigger()}  asChild>
                    	<Text style={styles.PressableText}>{pressableText}</Text>
            		</Pressable>
            	</Animated.View>


					<StatusBar style='auto' />
				</SafeAreaView>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		
	},
	lightContainer: {
		backgroundColor: "#fff",
	},
	darkContainer: {
		backgroundColor: "#231f26",
	},
	lightThemeText: {
		color: "#231f26",
	},
	darkThemeText: {
		color: "#fff",
	},
	iosSafeArea: {
		flex: 1,

	},
	text: {
		fontSize: normalize(20),
		fontFamily: "pMedium",
		alignSelf: "center"
	},
	welcomeText: {
		fontSize: normalize(34),
		alignSelf: "center",
		fontFamily : "pBold",
		marginTop: screenHeight*0.095 //Welcome text container vertical alignment

	},
	touchableOpacityStyle: { flex: 1 },

	Title : {
		fontFamily: "pBold",
		fontSize: normalize(33),
		zIndex:0,
		color: "#7AA8AE",
		margin: 15,
		marginTop: screenHeight*0.05,
		
	},
	titleContainer : {
		flex: 0,
		backgroundColor: "#151317",
		borderRadius:10,
		flexDirection: "row",
		justifyContent: "space-between" // Free space between "Access-19" and Help page
	},
	helpButton :{ // Top right of Home page
		margin: 15,
		marginTop: screenHeight*0.05,
		width: screenWidth*0.14,
		resizeMode: "contain",
	},
	imageContainer : {
		alignSelf: 'center'
	},

	//Instructions Block Styling (I know It's seems spaguetti Code but I tried to simplify it lol)
	InstructionView : {
		opacity: 0,
		alignSelf:"center",
		position:"absolute",
		alignItems: "center",
		top: screenHeight*1.1, //1.1
		borderRadius:15,
		width: screenWidth*0.65,
		height: screenHeight*0.4,
	},
	InstructionBlock: {
		flexDirection: "row",
		alignSelf : "center",
		borderRadius:15,
		borderColor: "#000000",
		borderWidth: 1,
		
	},
	InstructionTitle: {
		fontSize: normalize(25),
		fontFamily: "pBold",
		alignSelf: "center",
		color: "#7AA8AE",
		margin: 5,
	},
	InstructionDescription: {

		alignItems: "center",
		margin:0,
		fontSize: normalize(15),
		fontFamily: "pMedium",
		color: "#ffffff",
		marginLeft: 10,
		marginRight: 10,

	},
	ImageContainer : {
		width:screenWidth*0.3,
		height:screenHeight*0.2,
		marginRight: 5,
		marginLeft: 5,
		alignContent:"center",
		justifyContent:"center",
	},
	ImageInstruction: {
		alignSelf: "center",
		resizeMode: "contain",
		width: screenWidth*0.3,
		height: screenHeight*0.3
		
	},
	InstructionInsideBlock: {
		backgroundColor: "#1a1d26",
		alignItems: "center",
		fontSize:25,
		borderRadius: 15,
	},

	mainContainer : {
		justifyContent: "center",
		
	},

	//Pressable Style
	Pressable: {
		//Scan button
		backgroundColor: "#7AA8AE",
		top: screenHeight * 0.87,
		zIndex: 3,
		position: "absolute", 
		borderRadius: 20,
		justifyContent: "center", //Align the text horizentally
		textAlign: "center",
		alignSelf: "center", //Scan button allign
		width: screenWidth*0.92, // 92% of the screen width
		height: screenHeight * 0.11, // 11% of the screen height
	},
	PressableText: {
		color: "#FFFFFF",
		textAlign: "center",
		fontFamily: "pBold",
		fontSize: 40, //Scan button text size
	},
});
