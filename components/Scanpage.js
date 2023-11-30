import {
	Text,
	View,
	Button,
	TouchableOpacity,
	StyleSheet,
	ActivityIndicator,
	Modal,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { Image, useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	getModel,
	convertBase64ToTensor,
	startPrediction,
} from "../helpers/tensorflow-helper.js";
import { cropPicture } from "../helpers/image-helper.js";
import { normalize } from "../utils/utils";

const RESULT_MAPPING = [
	"Positive COVID Test",
	"Negative COVID Test",
	"Inconclusive COVID Test",
];

//Get the width and height of the screen:
const screenWidth = Dimensions.get("window").width; // Screen Width
const screenHeight = Dimensions.get("window").height; // Screen Height

export default function Scan() {
	const navigation = useNavigation();
	const colorScheme = useColorScheme();
	const themeTextStyle =
		colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
	const themeContainerStyle =
		colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
	const themeModalStyle =
		colorScheme === "light" ? styles.lightModalView : styles.darkModalView;
	const themeModalTextStyle =
		colorScheme === "light"
			? styles.lightThemeModalText
			: styles.darkThemeModalText;
	const themeSpinnerStyle = colorScheme === "light" ? "#231f26" : "#fff";

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
		navigation.navigate("Result", {
			result: RESULT_MAPPING[highestPrediction],
		});
		console.log("result", RESULT_MAPPING[highestPrediction]);
	};

	//Camera hooks
	const cameraRef = useRef();
	const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();
	const [enter, setEnter] = useState(true);

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

	//Double Tap Handler:
	let lastpress = 0; // last time tap
	const DoubleTap = () => {
		//DoubleTap function that detects double press in the middle of the screen
		const time = new Date().getTime(); //Get Time Press
		const delta = time - lastpress;
		const delay = 400; //Press Delay
		if (delta < delay) {
			console.log("doubleTap");
			handleImageCapture();
		}
		lastpress = time;
	};

	const handleModalDismiss = () => {
		setEnter(false);
	};

	return (
		<View style={[styles.container, themeContainerStyle]}>
			<Modal animationType='slide' transparent={true} visible={enter}>
				<TouchableWithoutFeedback onPress={handleModalDismiss}>
					<View style={styles.centeredView}>
						<View style={themeModalStyle}>
							<Text style={themeModalTextStyle}>
								Hover Your Phone Over The COVID Test And Double-Tap To Take A
								Picture
							</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<Modal animationType='slide' transparent={true} visible={loading}>
				<View style={styles.centeredView}>
					<View style={themeModalStyle}>
						<ActivityIndicator size='large' color={themeSpinnerStyle} />
						<Text style={themeModalTextStyle}>Processing...</Text>
					</View>
				</View>
			</Modal>
			<TouchableOpacity
				style={{ flex: 1 }}
				onPress={DoubleTap}
				activeOpacity={1.0}
			>
				<Camera
					ref={cameraRef}
					type={type}
					style={styles.cameraStyle}
					focusDepth={1}
				>
					<View style={{ flex: 1, backgroundColor: "transparent" }} />
				</Camera>
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	lightModalView: {
		margin: 20,
		backgroundColor: "#fff",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	lightThemeModalText: {
		marginTop: 15,
		textAlign: "center",
		color: "#231f26",
	},
	darkModalView: {
		margin: 20,
		backgroundColor: "#231f26",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	darkThemeModalText: {
		marginTop: 15,
		textAlign: "center",
		color: "#fff",
	},
});
