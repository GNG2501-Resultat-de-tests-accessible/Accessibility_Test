import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	useColorScheme,
	SafeAreaView,
	TouchableOpacity,
	Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { normalize } from "../utils/utils";
import ImageViewer from "./ImageViewer";

//Get the width and height of the screen:
const screenWidth = Dimensions.get("window").width; // Screen Width
const screenHeight = Dimensions.get("window").height; // Screen Height

export default function Result({ route }) {
	const { result } = route.params;

	//Double Tap Handler:
	let lastpress = 0; // last time tap
    const DoubleTap = () =>{                    //DoubleTap function that detects double press in the middle of the screen
        const time = new Date().getTime(); //Get Time Press
        const delta = time - lastpress;
        const delay = 400; //Press Delay
        if (delta < delay) {
            console.log("doubleTap");
            navigation.navigate("Scan")
        }
        lastpress = time;
    }

	let resultImage;
	if (result === "Positive COVID Test") {
		resultImage = require("../assets/positive.png");
	} else if (result === "Negative COVID Test") {
		resultImage = require("../assets/negative.png");
	} else if (result === "Inconclusive COVID Test") {
		resultImage = require("../assets/inconclusive.png");
	}

	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

	const handleTap = () => {
		console.log("Screen Tapped");
		navigation.navigate("Scan");
	};

	return (
		<TouchableOpacity
			style={styles.touchableOpacityStyle}
			activeOpacity={1.0}
			onPress={DoubleTap}
		>
			<SafeAreaView style={[styles.container, themeContainerStyle]}>
				<View style={styles.iosSafeArea}>
					
					<Text style={[styles.text, themeTextStyle, styles.welcomeText]}>
						This is a {result}
					</Text>
					<View style={styles.imageContainer}>
						<ImageViewer imageSource={resultImage} />
					</View>
					<Text style={[styles.text, themeTextStyle]}>
						 Double tap to retake a picture!
					</Text>
					<StatusBar style='auto' />
				
				</View>
			</SafeAreaView>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
		alignItems: "center",
		justifyContent:"center"
	},
	text: {
		fontSize: normalize(20),
		fontFamily: "pMedium",
		textAlign: "center",
		margin: 20
	},
	welcomeText: {
		fontSize: normalize(30),
		fontFamily: "pMedium"
	},
	touchableOpacityStyle: { flex: 1 },
	ResultText : {
        fontFamily: 'pBold',
        fontSize: normalize(35),
        color: '#7AA8AE',
		marginTop: screenHeight*0.07,
        
    },
	Container :{
		alignItems: "center",
		backgroundColor: "#1a171c",
		borderRadius: 25,
		width: screenWidth*0.5,
		height: screenHeight*0.2
	}
});
