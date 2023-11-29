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


	//Handle States
	function stateTrigger() {
		navigation.navigate("Scan");
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

	// const handleTap = () => {
	// 	console.log("Screen Tapped");
	// 	navigation.navigate("Scan");
	// };

	return (
		<TouchableOpacity
			style={styles.touchableOpacityStyle}
			activeOpacity={1.0}
			onPress={DoubleTap}
		>
			<View style={[styles.container, themeContainerStyle]}  >
				<SafeAreaView style={styles.iosSafeArea}>
					<Text style={styles.Title}>Test Access</Text>
					<Text style={[styles.text, themeTextStyle, styles.welcomeText]}>
						Welcome!
					</Text>
					<View style={styles.imageContainer}>
						<ImageViewer
							imageSource={require("../assets/homepage_image.png")}
						/>
					</View>
					<Text style={[styles.text, themeTextStyle]}>
						Double Tap Or Click on Next
					</Text>

				
				{/* Instructions Blocks */}

				<View style={[styles.InstructionView]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/homepage_image.png")} style={styles.ImageInstruction} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock]}>
                    <Text style = {styles.InstructionTitle}>Start</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>Start by clicking on the start button or use text command</Text>
                    </View>
                </View>
                </View>




				{/* Pressable Interaction */}
				<View style = {[styles.Pressable]} >  
            		<Pressable  onPress={()=>stateTrigger()}  asChild>
                    	<Text style={styles.PressableText}>Start</Text>
            		</Pressable>
            	</View>


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
		fontSize: normalize(17),
		fontFamily: "pMedium",
		alignSelf: "center"
	},
	welcomeText: {
		fontSize: normalize(30),
		alignSelf: "center",
		fontFamily : "pBold",
		marginTop: screenHeight*0.03

	},
	touchableOpacityStyle: { flex: 1 },

	Title : {
		fontFamily: "pBold",
		fontSize: normalize(26),
		zIndex:0,
		color: "#7AA8AE",
		margin : 20
	},
	imageContainer : {
		alignSelf: 'center'
	},






	//Instructions Block Styling (I know It's seems spaguetti Code but I tried to simplify it lol)
	InstructionView : {
		alignSelf:"center",
		position:"absolute",
		alignItems: "center",
		top: screenHeight*1.1, //1.1
		borderRadius:15,
		width: screenWidth*0.6,
		height: screenHeight*0.3,
	},
	InstructionBlock: {
		flexDirection: "row",
		alignSelf : "center",
		borderRadius:15,
		borderColor: "#000000",
		borderWidth: 1
		
	},
	InstructionTitle: {
		fontSize: normalize(20),
		fontFamily: "pBold",
		alignSelf: "center",
		color: "#7AA8AE",
	},
	InstructionDescription: {

		alignItems: "center",
		margin:10,
		fontSize: normalize(12),
		fontFamily: "pMedium",
		color: "#ffffff",
	},
	ImageContainer : {
		width:screenWidth*0.3,
		height:screenHeight*0.2,
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


	//Pressable Style
	Pressable: {
		//Scan button
		backgroundColor: "#7AA8AE",
		top: screenHeight * 0.8,
		zIndex: 3,
		position: "absolute", 
		borderRadius: 20,
		justifyContent: "center", //Align the text horizentally
		textAlign: "center",
		alignSelf: "center", //Scan button allign
		width: screenWidth * 0.8, // 80% of the screen width
		height: screenHeight * 0.08, // 10% of the screen height
	},
	PressableText: {
		color: "#FFFFFF",
		textAlign: "center",
		fontFamily: "pBold",
		fontSize: 35, //Scan button text size
	},
});
