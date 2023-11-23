import { Text, SafeAreaView, View, Button, Dimensions } from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Camera, CameraType } from "expo-camera";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from "../src/image/homepage_image.png";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState, useEffect } from "react";
import {
	getModel,
	convertBase64ToTensor,
	startPrediction,
} from "../helpers/tensorflow-helper.js";
import { cropPicture } from "../helpers/image-helper.js";

const RESULT_MAPPING = ["Positive COVID Test", "Negative COVID Test"];
//const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Scan = () => {
	//Model Stuff

	const [result, setResult] = useState("");

	const handleImageCapture = async () => {
		const options = { quality: 0.5, base64: true, skipProcessing: true };
		const imageData = await cameraRef.current.takePictureAsync(options);
		processImagePrediction(imageData);
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

	router.canGoBack("/Homepage");
	let colorsheme = useColorScheme();
	const ContainerTheme =
		colorsheme === "light" ? ScanStyle.Lightmode : ScanStyle.Darkmode;
	const StatuesBarTheme =
		colorsheme === "light"
			? ScanStyle.StatuesBarLight
			: ScanStyle.StatuesBarDark;
	console.log(permission);

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
		<SafeAreaView style={ContainerTheme}>
			<StatusBar
				backgroundColor={colorsheme === "light" ? "fffff" : "#231f26"}
			></StatusBar>

			<SafeAreaView style={ScanStyle.Scanning}>
				<Text style={ScanStyle.ScanText}>Scan the Test</Text>
			</SafeAreaView>
			<SafeAreaView style={ScanStyle.ContainingBox} />
			<SafeAreaView style={ScanStyle.CamArea}>
				<Camera
					ref={cameraRef}
					style={ScanStyle.CameraStyle}
					type={type}
				></Camera>
				<Link
					href='/Resultpage'
					style={[styles.Pressable, { top: "90%" }]}
					asChild
				>
					<View style={[styles.Pressable, { top: screenHeight * 0.9 }]}>
						<Pressable onPress={() => handleImageCapture()}>
							<Text style={styles.Button}>Scan</Text>
						</Pressable>
					</View>
				</Link>
			</SafeAreaView>
		</SafeAreaView>
	);
};
export default Scan;
