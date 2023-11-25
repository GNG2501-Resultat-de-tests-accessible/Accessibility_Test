import {
	Text,
	SafeAreaView,
	View,
	Button,
	TouchableOpacity,
	ActivityIndicator,
	StyleSheet,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Image, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
	getModel,
	convertBase64ToTensor,
	startPrediction,
} from "../helpers/tensorflow-helper.js";
import { cropPicture } from "../helpers/image-helper.js";
import { normalize } from "../utils/utils";

const RESULT_MAPPING = ["Positive COVID Test", "Negative COVID Test"];

export default function Scan() {
	const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

	//Model Stuff

	const [result, setResult] = useState("");
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);

	const handleImageCapture = async () => {
		if (loading) return;
		setLoading(true);
		console.log("Image Taken");
		try {
			const options = { quality: 0.5, base64: true };
			const imageData = await cameraRef.current.takePictureAsync(options);
			setImage(imageData.uri);
			await processImagePrediction(imageData);
		} catch (error) {
			console.error("Error capturing image", error);
		}
		setLoading(false);
		setImage(null);
	};

	const processImagePrediction = async (base64Image) => {
		const croppedDate = await cropPicture(base64Image, 300);
		const model = await getModel();
		const tensor = await convertBase64ToTensor(croppedDate.base64);
		const prediction = await startPrediction(model, tensor);
		console.log("prediction", prediction);
		const highestPrediction = prediction.indexOf(
			Math.max.apply(null, prediction)
		);
		setResult(RESULT_MAPPING[highestPrediction]);
		console.log("result", RESULT_MAPPING[highestPrediction]);
	};

	//Camera hooks
	const cameraRef = useRef();
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();

	if (!permission) {
		// Camera permissions are still loading
		return <View />;
	}
	if (!permission.granted) {
		// Camera permissions are not granted yet
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>
				<Button onPress={requestPermission} title='grant permission' />
			</View>
		);
	}
	return (
		<View style={[styles.container, themeContainerStyle]}>
			<TouchableOpacity
				style={{ flex: 1 }}
				onPress={handleImageCapture}
				disabled={loading}
			>
				<Camera ref={cameraRef} type={type} style={styles.cameraStyle}></Camera>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</View>
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
	imageContainer: {
		borderWidth: 4,
		borderColor: "#ff0000",
	},
	iosSafeArea: {
		flex: 1,
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
	cameraContainer: {
		flex: 1,
		width: "100%",
	},
	cameraStyle: {
		flex: 1,
		width: "100%",
	},
});
