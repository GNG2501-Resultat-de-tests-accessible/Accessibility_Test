import { StyleSheet } from "react-native";

const ScanStyle = StyleSheet.create({
    Scanning : {
        justifyContent:"center",
        alignItems: "center",
<<<<<<< Updated upstream
        marginTop : 50
    },
    ScanText : {
        fontFamily : "pBold",
        fontSize: 25,
        color: '#7AA8AE'
    },
    CamArea : {
        flex : 1,
        margin : "auto",
        width: 350,
        left: '7%',
        height: 10,
        borderRadius : 10,
        margin: 'auto',
        marginTop : 80,
=======
        marginTop : 30
    },
    ScanText : {
        fontFamily : "pBold",
        fontSize: 40, //"Scan The Test" text on Scan Page
        color: '#7AA8AE'
    },
    CamArea : {
        margin : "auto",
        width: 390,
        alignSelf : "center",
        borderRadius : 10,
        margin: 'auto',
        marginTop : 25,
>>>>>>> Stashed changes
        justifyContent: "center",
        alignSelf: "center",
        height : "80%", //Bottom margin for camera area
    },
    cam_icon :{
        width :50,
        height : 50
    },
    Darkmode :{
        backgroundColor: "#231f26",
<<<<<<< Updated upstream
        height : "100 %"
=======
        height : "120%",
        position : "absolute",
        width : "100%"
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        width : "100 %",
        height : "100%",
        marginTop: 180,
        borderRadius : 50,
=======
        width : "100%",
        height : "100%",
        marginTop: 150,
        borderRadius : 30, //Rounded Corners For Background
>>>>>>> Stashed changes
    },
    CameraStyle : {
        flex :1,
        width : "100%",
<<<<<<< Updated upstream
        maxHeight:450
=======
        maxHeight : "100%" 
>>>>>>> Stashed changes


    }

})
export default ScanStyle;