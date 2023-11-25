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
import { normalize } from "../utils/utils";
import ImageViewer from "./ImageViewer";

export default function Result({ route }) {
	const { result } = route.params;
	const resultImage =
		result === "Positive COVID Test"
			? require("../assets/positive.png")
			: require("../assets/negative.png");
	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

	return (
		<TouchableOpacity style={styles.touchableOpacityStyle} activeOpacity={1.0}>
			<View style={[styles.container, themeContainerStyle]}>
				<SafeAreaView style={styles.iosSafeArea}>
					<Text style={[styles.text, themeTextStyle, styles.welcomeText]}>
						This is a {result}
					</Text>
					<View style={styles.imageContainer}>
						<ImageViewer imageSource={resultImage} />
					</View>
					<Text style={[styles.text, themeTextStyle]}>
						Tap Anywhere to Scan Again!
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
