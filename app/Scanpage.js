import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import {
	Button,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Image,
	Pressable,
	Appearance,
	useColorScheme,
} from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import ScanStyle from "../Style/Scanpage_style.js";
import { Link } from "expo-router";

import {
	getModel,
	convertBase64ToTensor,
	startPrediction,
} from "../helpers/tensorflow-helper.js";
import { cropPicture } from "../helpers/image-helper.js";
const RESULT_MAPPING = ["Positive COVID Test", "Negative COVID Test"];

export default function Scan() {
	const cameraRef = useRef();
	const [isProcessing, setIsProcessing] = useState(false);
	const [result, setResult] = useState("");

	const handleImageCapture = async () => {
		setIsProcessing(true);
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
		<View style={styles.container}>
			<Camera ref={cameraRef} style={styles.camera} type={type}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => handleImageCapture()}
					>
						<Text style={styles.text}>Scan</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#7AA8AE",
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: "flex-end",
		alignItems: "center",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
	},
});
