import {Text, SafeAreaView} from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from '../src/image/homepage_image.png';
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";


const Scan = ()=>{
    router.canGoBack("/Homepage");
    let colorsheme = useColorScheme();
    const ContainerTheme = colorsheme ==='light'? ScanStyle.Lightmode : ScanStyle.Darkmode;
    const StatuesBarTheme = colorsheme ==='light'? ScanStyle.StatuesBarLight : ScanStyle.StatuesBarDark;

    return (
        <SafeAreaView style ={ContainerTheme}>
            <StatusBar backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"} ></StatusBar>
            
            <SafeAreaView style ={ScanStyle.Scanning}>
                <Text style = {ScanStyle.ScanText}>Scan the Test</Text>
            </SafeAreaView>
            <SafeAreaView style = {ScanStyle.ContainingBox} />
            <SafeAreaView style={ScanStyle.CamArea}>
            <Image source ={require('../src/image/camera_icon.png')} style={ScanStyle.cam_icon}></Image>
            </SafeAreaView>
            <Link href="/Resultpage" style = {styles.Pressable} asChild>
            <Pressable style = {styles.Pressable}>
                    <Text style={styles.Button}>Scan</Text>
            </Pressable>
            </Link>
        </SafeAreaView>
    )
}
export default Scan;