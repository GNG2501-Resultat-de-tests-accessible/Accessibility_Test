import {Text, SafeAreaView} from "react-native";
import layout_styles from "../Style/Layoutstyle.js";
import { Image, Pressable } from "react-native";
import ScanStyle from "../Style/Scanpage_style.js";
import styles from "../Style/Homepage_style.js";
import * as cam_image from '../src/image/homepage_image.png';


const Scan = ()=>{
    return (
        <SafeAreaView>
            <SafeAreaView style ={ScanStyle.Scanning}>
                <Text style = {ScanStyle.ScanText}>Scanning</Text>
            </SafeAreaView>
            <SafeAreaView style={ScanStyle.CamArea}>
            <Image source ={require('../src/image/camera_icon.png')} style={ScanStyle.cam_icon}></Image>
            </SafeAreaView>
            <Pressable style = {styles.Pressable}>
                    <Text style={styles.Button}>Back</Text>
            </Pressable>
        </SafeAreaView>
    )
}
export default Scan;