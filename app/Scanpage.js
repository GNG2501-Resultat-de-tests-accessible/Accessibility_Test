import {Text, SafeAreaView, View, Button} from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Camera, CameraType } from "expo-camera";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from '../src/image/homepage_image.png';
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";


const Scan = ()=>{
    //Camera hooks
    const cameraRef = useRef();
    const [type, setType] = useState(CameraType.back);
	const [permission, requestPermission] = Camera.useCameraPermissions();



    router.canGoBack("/Homepage");
    let colorsheme = useColorScheme();
    const ContainerTheme = colorsheme ==='light'? ScanStyle.Lightmode : ScanStyle.Darkmode;
    const StatuesBarTheme = colorsheme ==='light'? ScanStyle.StatuesBarLight : ScanStyle.StatuesBarDark;
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
        <SafeAreaView style ={ContainerTheme}>
            <StatusBar backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"} ></StatusBar>
            
            <SafeAreaView style ={ScanStyle.Scanning}>
                <Text style = {ScanStyle.ScanText}>Scan the Test</Text>
            </SafeAreaView>
            <SafeAreaView style = {ScanStyle.ContainingBox} />
            <SafeAreaView style={ScanStyle.CamArea}>
            <Camera ref={cameraRef} style = {ScanStyle.CameraStyle} type={type}></Camera>
            </SafeAreaView>
            <Link href="/Resultpage" style = {[styles.Pressable,{top: "90%"}, ]} asChild>
            <Pressable>
                    <Text style={styles.Button}>Scan</Text>
            </Pressable>
            </Link>
        </SafeAreaView>
    )
}
export default Scan;