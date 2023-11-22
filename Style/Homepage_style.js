import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Title: {
        fontFamily: 'pBold',
        fontSize: 30,
        margin: 20,
        marginTop: 40,
        color: '#7AA8AE',
    },
    Welcome: {
        fontFamily: 'pBold',
        marginTop: 20,
        fontSize: 27,
    },
    Imagee: {
        width:130,
        height :130,
        alignSelf: "center"
    },

    Button: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: 'pBold',
<<<<<<< Updated upstream
        fontSize: 25,
=======
        fontSize: 35, //Scan button text size
>>>>>>> Stashed changes
        justifyContent : "center",
        alignItems : "center",
    },
    Pressable: { //Scan button
        backgroundColor: "#7AA8AE",
        height: 50,
        top: 750,
        zIndex : 0,
<<<<<<< Updated upstream
        width: 300,
        left: "15%",
=======
        width: 380,
>>>>>>> Stashed changes
        position : "absolute",
        borderRadius:20,
        justifyContent : "center",
        textAlign : "center",
<<<<<<< Updated upstream
=======
        alignSelf : "center", //Scan button allign
>>>>>>> Stashed changes
    },
    Darkmode :{
        backgroundColor: "#231f26",
        height : "100 %", //for some reason the safeareaview dosn't cover all the screen
    },
    Lightmode :{
        backgroundColor: "#ffffff",
        height : "100 %",
    },
    WelcomeLight : {
        fontFamily: 'pBold',
        marginTop: 20,
        fontSize: 27,
    },
    WelcomeDark : {
        fontFamily: 'pBold',
        alignSelf: "center",
        marginTop: 20,
        fontSize: 27,
        color : "#ffffff"
    },
    ClickonLight :{
        color : "#000000"
    },
    ClickonDark : {
        color : "#ffffff",
        alignSelf: "center",
        fontSize : 20,
        fontFamily : "pMedium",
    },
    InstructionBlock : {
        backgroundColor : "#252936",
        alignContent: "center",
        borderRadius : 10,
        marginTop: 20,
        width : 330,
        height : 180,
        flexDirection : "row"
    },
    InstructionSet:{
        justifyContent : "center",
        backgroundColor : "#151317",
        zIndex: 1,
        position: "absolute",
        marginTop:520,
        height: 800,
        width : "100%",
        borderRadius: 20,
        justifyContent : "center",
        alignItems : "center",
        marginLeft :"auto",
        marginRight : "auto"
    },
    InstructionSetActive:{
        justifyContent : "center",
        backgroundColor : "#151317",
        zIndex: 1,
        position: "absolute",
        marginTop:0,
        height: 800,
        width : "98%",
        borderRadius: 20,
        justifyContent : "center",
        alignItems : "center",
        marginLeft :"auto",
        marginRight : "auto"
    },
    InstructionTitle:{
        marginLeft:20,
        marginTop : 25,
        fontSize:20,
        fontFamily : "pBold",
        color :"#7AA8AE",
    },
    InstructionDescription : {
        marginLeft: 20,
        alignItems: "center",
        fontSize : 15,
        fontFamily : "pMedium",
        color :"#ffffff"
    },
    InstructionInsideBlock : {
        backgroundColor : "#1a1d26",
        alignItems: "center",
        borderRadius : 10,
        width: 200,
        marginLeft:10
    },
    ScrollViewStyle:{
        height: 200,
    },
    firstImageStyle : {
        width:300,
        height :300,
        margin:20,
        alignSelf: "center"
    },

    CameraPermissionView: {
        position : "absolute",
        alignSelf : "center",
        width: 380,
        height: 250,
        top: 0,
        backgroundColor : "#303545",
        borderRadius :10,
        top : "30%",
        zIndex:3
    },

    NoticeText : {
        width : 380,
        height : 130,
        borderRadius: 5,
        alignSelf : "center",
        backgroundColor : "#20232e"
    },
    NoticeButton :{
            backgroundColor: "#7AA8AE",
            height: 40,
            margin:10,
            zIndex : 0,
            width: 200,
            borderRadius:10,
            justifyContent : "center",
            textAlign : "center",
            alignSelf: "center"
    }

})

export default styles;
