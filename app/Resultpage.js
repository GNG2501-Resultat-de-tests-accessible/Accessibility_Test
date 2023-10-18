import { SafeAreaView, Text } from "react-native";
import { Image, Pressable,Appearance, useColorScheme } from "react-native";
import ResultStyle from "../Style/Resultpage_style";
import styles from "../Style/Homepage_style";
import { StatusBar } from "expo-status-bar";

const Result = () =>{
    let colorsheme = useColorScheme();
    let ContainerTheme = colorsheme ==='light'? ResultStyle.Lightmode : ResultStyle.Darkmode;
    return(
        <SafeAreaView style ={ContainerTheme}>
            <StatusBar  backgroundColor= {colorsheme=== 'light'? "fffff": "#231f26"}/>
            <SafeAreaView style = {ResultStyle.ResultView}>
                <Text style = { ResultStyle.ResultText}>Result:</Text>
            </SafeAreaView>
            <SafeAreaView style = {ResultStyle.ResultImageView}>
                <Image style = {ResultStyle.ResultImage} source={require('../src/image/green_check.png')}></Image>
            </SafeAreaView>
            <SafeAreaView style = {ResultStyle.IndicationtextView}>
                <Text style = {ResultStyle.IndicationText}>The test result is displaying a positive result</Text>
            </SafeAreaView>
            <Pressable style = {ResultStyle.PressableView}>
                    <Text style={styles.Button}>Re-Scan</Text>
            </Pressable>
        </SafeAreaView>
    )
}
export default Result