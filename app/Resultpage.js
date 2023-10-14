import { SafeAreaView, Text } from "react-native";
import { Image, Pressable } from "react-native";
import ResultStyle from "../Style/Resultpage_style";
import styles from "../Style/Homepage_style";

const Result = () =>{
    return(
        <SafeAreaView >
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
                    <Text style={styles.Button}>Back</Text>
            </Pressable>
        </SafeAreaView>
    )
}
export default Result