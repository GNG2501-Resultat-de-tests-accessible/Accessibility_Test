import { Text, SafeAreaView, View, Button } from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Camera, CameraType } from "expo-camera";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from "../src/image/homepage_image.png";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as tf from "@tensorflow/tfjs";
//import * as tmImage from "@teachablemachine/image";
import React, { useRef, useState, useEffect } from "react";
import { bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
import * as jpeg from "jpeg-js";
import * as FileSystem from "expo-file-system";
import modelJson from "../model/model.json";
import modelWeights from "../model/weights.bin";

const Scan = () => {
	//Model Stuff
	//const URL = "https://teachablemachine.withgoogle.com/models/BEpPbdSvk/";

	const [model, setModel] = useState(null);

	useEffect(() => {
		(async () => {
			await tf.ready();
			console.log("tf ready");

			//const modelJson ="https://teachablemachine.withgoogle.com/models/BEpPbdSvk/model.json"; // Replace with your model URL
			//const modelWeights = "https://teachablemachine.withgoogle.com/models/BEpPbdSvk/model.weights.bin"; // Replace with your weights URL
			//const model = await loadGraphModel(modelJson, modelWeights);
			//console.log("model json loaded");
			//const model = await loadGraphModel(modelJson);
			const model = await tf.loadGraphModel(
				bundleResourceIO(modelJson, modelWeights)
			);
			console.log("model loaded");
			setModel(model);
		})();
	}, []);

	const takePicture = async () => {
		if (cameraRef.current) {
			const options = { quality: 1, base64: true };
			const data = await cameraRef.current.takePictureAsync(options);
			const imageUri = data.uri;
			const rawImageData = await FileSystem.readAsStringAsync(imageUri, {
				encoding: FileSystem.EncodingType.Base64,
			});
			const imageTensor = imageToTensor(rawImageData);
			const prediction = await model.predict(imageTensor);
			console.log(prediction);
		}
	};

	const imageToTensor = (rawImageData) => {
		const { width, height, data } = jpeg.decode(rawImageData, true);
		const buffer = new Uint8Array(width * height * 3);
		let offset = 0;
		for (let i = 0; i < buffer.length; i += 3) {
			buffer[i] = data[offset];
			buffer[i + 1] = data[offset + 1];
			buffer[i + 2] = data[offset + 2];
			offset += 4;
		}
		return tf.tensor3d(buffer, [height, width, 3]);
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
			</SafeAreaView>
			<SafeAreaView>
				<View style={[styles.Pressable, { top: 800 }]}>
					<Pressable onPress={takePicture}>
						<Text style={styles.Button}>Scan</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</SafeAreaView>
	);
};
export default Scan;
