import { View, Image, Text } from "react-native";
import { StyleSheet, useColorScheme, Dimensions, ScrollView } from "react-native";
import { normalize } from "../utils/utils";



//Get the width and height of the screen:
const screenWidth = Dimensions.get("window").width; // Screen Width
const screenHeight = Dimensions.get("window").height; // Screen Height


export default function Instruction(){

    const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
    return(
        <ScrollView style={[styles.container,themeContainerStyle]}>
            <Text style={styles.Title}>Instruction:</Text>



            {/* Instructions Blocks  (1 for Now, Waiting to implement Aminations functions)*/}
				<View style={[styles.InstructionView]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/homepage_image.png")} style={styles.ImageInstruction} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock]}>
                    <Text style = {styles.InstructionTitle}>To Get Started</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>Start by clicking the Start button (at the buttom center of the screen) or Double-Tap your screen.</Text>
                    </View>
                </View>
                </View>

				<View style={[styles.InstructionView]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/ScanningCovid.png")} style={[styles.ImageInstruction, {width: screenWidth*0.5, height: screenHeight*0.5}]} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock]}>
                    <Text style = {styles.InstructionTitle}>Scan</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>Take a picture of the covid test by placing it in the middle of the camera</Text>
                    </View>
                </View>
                </View>

				<View style={[styles.InstructionView]}>
                <View style={[styles.InstructionBlock,themeContainerStyle]}>
                    <View style={[styles.ImageContainer]}>
                    <Image source = {require("../assets/Bot_Analysing.png") }style={styles.ImageInstruction} /> 
                    </View>
                    <View style = {[styles.InstructionInsideBlock]}>
                    <Text style = {styles.InstructionTitle}>Analyse</Text>
                    <Text style = {[styles.InstructionDescription,themeTextStyle]}>The system will analyse and indicate the result of the test</Text>
                    </View>
                </View>
                </View>
            
        </ScrollView>
    )
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

    Title :{
        fontFamily: "pBold",
		fontSize: normalize(27),
		zIndex:0,
		color: "#7AA8AE",
		margin: 25,
		marginTop: screenHeight*0.05,
        alignSelf: "center"

    },
    //Instructions Block Styling (I know It's seems spaguetti Code but I tried to simplify it lol)
	InstructionView : {
		opacity: 1,
		alignSelf:"center",
		position:"relative",
		alignItems: "center",
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
		fontSize: normalize(13),
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
})