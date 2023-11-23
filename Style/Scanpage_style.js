import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ScanStyle = StyleSheet.create({
	Scanning: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 30,
	},
	ScanText: {
		fontFamily: "pBold",
		fontSize: 40, //"Scan The Test" text on Scan Page
		color: "#7AA8AE",
	},
	CamArea: {
		/*margin : "auto",
        width: 390,
        alignSelf : "center",
        borderRadius : 10,
        margin: 'auto',
        marginTop : 25,
        justifyContent: "center",
        alignSelf: "center",
        height : "80%", //Bottom margin for camera area*/
		height: screenHeight * 0.6, // 60% of the screen height
		width: screenWidth, // full screen width
	},
	cam_icon: {
		width: 50,
		height: 50,
	},
	Darkmode: {
		backgroundColor: "#231f26",
		height: "120%",
		position: "absolute",
		width: "100%",
	},
	Lightmode: {
		backgroundColor: "#ffffff",
		height: "100 %",
	},
	StatuesBarLight: {
		backgroundColor: "#ffffff",
	},
	StatuesBarDark: {
		backgroundColor: "#231f26",
	},
	ContainingBox: {
		backgroundColor: "#151317",
		position: "absolute",
		width: "100%",
		height: "100%",
		marginTop: 150,
		borderRadius: 30, //Rounded Corners For Background
	},
	CameraStyle: {
		flex: 1,
		width: "100%",
		maxHeight: "100%",
	},
});
export default ScanStyle;
