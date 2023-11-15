import { StyleSheet } from "react-native";

const ScanStyle = StyleSheet.create({
    Scanning : {
        justifyContent:"center",
        alignItems: "center",
        marginTop : 100
    },
    ScanText : {
        fontFamily : "pBold",
        fontSize: 25,
        color: '#7AA8AE'
    },
    CamArea : {
        backgroundColor: "#d6d6d6",
        margin : "auto",
        width: 350,
        left: '7%',
        height: 450,
        borderRadius : 10,
        margin: 'auto',
        marginTop : 80,
        justifyContent: "center",
        alignItems: "center",
    },
    cam_icon :{
        width :50,
        height : 50
    },
    Darkmode :{
        backgroundColor: "#231f26",
        height : "100 %"
    },
    Lightmode :{
        backgroundColor: "#ffffff",
        height : "100 %"
    },
    StatuesBarLight : {
        backgroundColor: "#ffffff",
    },
    StatuesBarDark : {
        backgroundColor: "#231f26",
    },
    ContainingBox : {
        backgroundColor : "#151317",
        position :"absolute",
        width : "100 %",
        height : "100%",
        marginTop: 180,
        borderRadius : 50,
    }

})
export default ScanStyle;