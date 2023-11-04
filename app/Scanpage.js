import {Text, SafeAreaView} from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Pressable, Appearance, useColorScheme } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from '../src/image/homepage_image.png';
import { Link, router } from "expo-router";


const Scan = ()=>{
    router.canGoBack("/Homepage");
    let colorsheme = useColorScheme();
    const ContainerTheme = colorsheme ==='light'? ScanStyle.Lightmode : ScanStyle.Darkmode;
    return (
        <SafeAreaView>
            <SafeAreaView style ={ScanStyle.Scanning}>
                <Text style = {ScanStyle.ScanText}>Scanning</Text>
            </SafeAreaView>
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