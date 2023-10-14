import { StyleSheet } from "react-native";

const ResultStyle = StyleSheet.create({
    ResultView : {
        justifyContent: "center",
        alignItems : "center",
        marginTop:150
    },
    ResultText : {
        fontFamily: 'pBold',
        fontSize: 40,
        color: '#7AA8AE',
        
    },
    ResultImage : {
        width: 180,
        height : 180
    },
    ResultImageView:{
        marginTop : 90,
        justifyContent : "center",
        alignItems : "center"
    },
    IndicationtextView: {
        width: 250,
        height: 100,
        marginLeft : "20%",
        justifyContent: "center",
        alignItems : "center",
        textAlign: "center",
        marginTop : 50
    },
    IndicationText : {
        fontFamily : 'pMedium',
        textAlign : "center",
        fontSize : 15,
        color: "#8c8b8b"
    },
    PressableView: {
        backgroundColor: "#7AA8AE",
        margin:70,
        marginTop: 100,
        borderRadius:8,
    }

})
export default ResultStyle