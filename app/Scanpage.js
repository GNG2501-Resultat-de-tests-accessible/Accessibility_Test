import React, { useState, useRef } from "react";
import { Text, SafeAreaView } from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from "../src/image/homepage_image.png";
import { Link } from "expo-router";

import {
	getModel,
	convertBase64ToTensor,
	startPrediction,
} from "../helpers/tensorflow-helper.js";
import { cropPicture } from "../helpers/image-helper.js";
import { Camera, CameraType } from "expo-camera";

const RESULT_MAPPING = ["Positive COVID Test", "Negative COVID Test"];

const Scan = () => {
	const cameraRef = useRef();
	const [isProcessing, setIsProcessing] = useState(false);
	const [result, setResult] = useState("");

	const handleImageCapture = async () => {
		setIsProcessing(true);
		const imageData = await cameraRef.current.takePictureAsync({
			base64: true,
		});
		processImagePrediction(imageData);
	};

	const processImagePrediction = async (base64Image) => {
		const croppedDate = await cropPicture(base64Image, 300);
		const model = await getModel();
		const tensor = await convertBase64ToTensor(croppedDate.base64);

		const prediction = await startPrediction(model, tensor);

		const highestPrediction = prediction.indexOf(
			Math.max.apply(null, prediction)
		);
		setResult(RESULT_MAPPING[highestPrediction]);
	};

	let colorsheme = useColorScheme();
	const ContainerTheme =
		colorsheme === "light" ? ScanStyle.Lightmode : ScanStyle.Darkmode;
	return (
		<SafeAreaView>
			<SafeAreaView style={ScanStyle.Scanning}>
				<Text style={ScanStyle.ScanText}>Scanning</Text>
			</SafeAreaView>
			<SafeAreaView style={ScanStyle.CamArea}>
				<Camera
					ref={cameraRef}
					style={ScanStyle.Cam}
					type={Camera.Constants.Type.back}
					autoFocus={true}
					whiteBalance={Camera.Constants.WhiteBalance.auto}
				/>
			</SafeAreaView>
			<Link href='/Resultpage' style={styles.Pressable} asChild>
				<Pressable
					style={styles.Pressable}
					onPress={() => handleImageCapture()}
				>
					<Text style={styles.Button}>Scan</Text>
				</Pressable>
			</Link>
		</SafeAreaView>
	);
};
export default Scan;
