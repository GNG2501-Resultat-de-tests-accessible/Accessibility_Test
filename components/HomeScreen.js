import { StatusBar } from "expo-status-bar";
import {
	StyleSheet,
	Text,
	View,
	useColorScheme,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageViewer from "./ImageViewer";
import { normalize } from "../utils/utils";
import Scan from "./Scanpage";

export default function HomeScreen() {
	//TODO maybe add if statement for SafeAreaView and android (Platform.OS === "android")
	//TODO make it so that the text isnt cut off at bigger sizes
	//TODO use modal for instructions (tap left for next, tap right for previous)

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
			onPress={handleTap}
		>
			<View style={[styles.container, themeContainerStyle]}>
				<SafeAreaView style={styles.iosSafeArea}>
					<Text style={[styles.text, themeTextStyle, styles.welcomeText]}>
						Welcome!
					</Text>
					<View style={styles.imageContainer}>
						<ImageViewer
							homepageImageSource={require("../assets/homepage_image.png")}
						/>
					</View>
					<Text style={[styles.text, themeTextStyle]}>
						Tap Anywhere to Begin!
					</Text>
					<StatusBar style='auto' />
				</SafeAreaView>
			</View>
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
	},
	text: {
		fontSize: normalize(20),
		fontWeight: "bold",
	},
	welcomeText: {
		fontSize: normalize(40),
		fontWeight: "bold",
	},
	touchableOpacityStyle: { flex: 1 },
});
