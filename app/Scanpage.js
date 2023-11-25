import {
	Text,
	SafeAreaView,
	View,
	Button,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
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
import { isLoading } from "expo-font";

const RESULT_MAPPING = ["Positive COVID Test", "Negative COVID Test"];
//const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Scan = () => {
	//Model Stuff

	const [result, setResult] = useState("");
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState(null);

	async function handleImageCapture () {
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

	router.canGoBack("/Homepage");
	let colorsheme = useColorScheme();
	const ContainerTheme =
		colorsheme === "light" ? ScanStyle.Lightmode : ScanStyle.Darkmode;
	const StatuesBarTheme =
		colorsheme === "light"
			? ScanStyle.StatuesBarLight
			: ScanStyle.StatuesBarDark;
	console.log(permission);



	//Double Tap Function on an Html element
    let lastpress = 0; // last time tap
    const DoubleTap = () =>{                    //DoubleTap function that detects double press in the middle of the screen
        const time = new Date().getTime(); //Get Time Press
        const delta = time - lastpress;
        const delay = 400; //Press Delay
        if (delta < delay) {
            console.log("doubleTap");
            stateTrigger();
        }
        lastpress = time;
    }
    //

    function stateTrigger(){
        handleImageCapture();
    }

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
		<SafeAreaView style={ContainerTheme} onStartShouldSetResponder={DoubleTap}>
			<StatusBar
				backgroundColor={colorsheme === "light" ? "fffff" : "#231f26"}
			></StatusBar>

			<SafeAreaView style={ScanStyle.Scanning}>
				<Text style={ScanStyle.ScanText}>Scan the Test</Text>
			</SafeAreaView>
			<SafeAreaView style={ScanStyle.ContainingBox} />
			<SafeAreaView style={ScanStyle.CamArea} >
				{image ? (
					<View style={{ flex: 1 }}>
						<Image source={{ uri: image }} style={{ flex: 1 }} />
						{loading && (
							<ActivityIndicator
								size='large'
								color='#0000ff'
								style={{
									position: "absolute",
									top: "50%",
									left: "50%",
								}}
							/>
						)}
					</View>
				) : (
					
					<TouchableOpacity style={{ flex:1 }}
					activeOpacity={1.0} onPress={() =>console.log("pressed")}>
						<Camera 
							ref={cameraRef}
							style={ScanStyle.CameraStyle}
							type={type}
						></Camera>
						</TouchableOpacity>
				)}
				<View
					style={[styles.Pressable, { top: 560 }]}
					asChild
				>
					<Pressable onPress={() =>handleImageCapture()} >
						<Text style = {styles.Button}>Scan</Text>
					</Pressable>
				</View>
			</SafeAreaView>
		</SafeAreaView>
	);
};
export default Scan;
