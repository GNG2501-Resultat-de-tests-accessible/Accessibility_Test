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
        fontSize: 25,
        justifyContent : "center",
        alignItems : "center",
    },
    Pressable: {
        backgroundColor: "#7AA8AE",
        height: 50,
        top: 750,
        width: 300,
        left: "15%",
        position : "absolute",
        borderRadius:20,
        justifyContent : "center",
        textAlign : "center",
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
        marginTop: 50,
        width : 330,
        height : 180,
        flexDirection : "row"
    },
    InstructionSet:{
        justifyContent : "center",
        backgroundColor : "#151317",
        zIndex: 1,
        position: "absolute",
        marginTop:600,
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
    }

})

export default styles;
