import { Text, SafeAreaView, View, Button } from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Camera, CameraType } from "expo-camera";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from "../src/image/homepage_image.png";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

const Scan = () => {
	//Model Stuff
	const URL = "https://teachablemachine.withgoogle.com/models/BEpPbdSvk/";
	let model, webcam, labelContainer, maxPredictions;

	async function init() {
		const modelURL = URL + "model.json";
		const metadataURL = URL + "metadata.json";

		// load the model and metadata
		// Refer to tmImage.loadFromFiles() in the API to support files from a file picker
		// or files from your local hard drive
		// Note: the pose library adds "tmImage" object to your window (window.tmImage)
		model = await tmImage.load(modelURL, metadataURL);
		maxPredictions = model.getTotalClasses();
		await takePhoto();
	}

	let takePhoto = async () => {
		if (cameraRef.current) {
			const options = { quality: 0.5, base64: true, skipProcessing: true };
			const data = await cameraRef.current.takePictureAsync(options);
			console.log("Photo Taken");
			await predict(data);
			//await predict(data.uri);
		}
	};

	// run the webcam image through the image model
	async function predict(photo) {
		console.log("Predicting");
		// predict can take in an image, video or canvas html element
		const prediction = await model.predict(photo);
		for (let i = 0; i < maxPredictions; i++) {
			const classPrediction =
				prediction[i].className + ": " + prediction[i].probability.toFixed(2);
			console.log(classPrediction);
		}
	}

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
			</SafeAreaView>
			<View style={[styles.Pressable, { top: 800 }]}>
				<Pressable onPress={() => init()}>
					<Text style={styles.Button}>Scan</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};
export default Scan;
