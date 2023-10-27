import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    Title: {
        fontFamily: 'pBold',
        fontSize: 30,
        margin: 20,
        marginTop: 80,
        color: '#7AA8AE',
    },
    Welcome: {
        fontFamily: 'pBold',
        marginTop: 20,
        fontSize: 27,
    },
    Imagee: {
        marginTop:80,
        width: 300,
        height:300,
    },

    Button: {
        color: "#FFFFFF",
        textAlign: "center",
        fontFamily: 'pMedium',
        fontSize: 20,
        justifyContent : "center",
        alignItems : "center",
    },
    Pressable: {
        backgroundColor: "#7AA8AE",
        margin:70,
        marginTop: 100,
        borderRadius:8,
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
        marginTop: 20,
        fontSize: 27,
        color : "#ffffff"
    },
    ClickonLight :{
        color : "#000000"
    },
    ClickonDark : {
        color : "#ffffff"
    }

})

export default styles;
