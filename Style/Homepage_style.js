import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	Title: {
		fontFamily: "pBold",
		fontSize: 30,
		margin: 20,
		marginTop: 40,
		zIndex:0,
		color: "#7AA8AE",
	},
	Welcome: {
		fontFamily: "pBold",
		marginTop: 20,
		fontSize: 27,
	},
	Imagee: {
		width: screenWidth*0.3,
		alignSelf: "center",
		height:screenHeight*0.1,
		
	},

	Button: {
		color: "#FFFFFF",
		textAlign: "center",
		fontFamily: "pBold",
		fontSize: 35, //Scan button text size
		justifyContent: "center",
		alignItems: "center",
	},
	Pressable: {
		//Scan button
		backgroundColor: "#7AA8AE",
		//height: 50,
		top: screenHeight * 0.8,
		zIndex: 3,
		//width: 380,
		position: "absolute",
		borderRadius: 20,
		justifyContent: "center",
		textAlign: "center",
		alignSelf: "center", //Scan button allign
		width: screenWidth * 0.8, // 80% of the screen width
		height: screenHeight * 0.08, // 10% of the screen height
	},
	Backgound: {
		backgroundColor: "#231f26",
		zIndex:0,
		height: screenHeight, //for some reason the safeareaview dosn't cover all the screen
	},
	Welcome: {
		fontFamily: "pBold",
		alignSelf: "center",
		marginTop: 20,
		fontSize: 27,
	},
	Guide: {
		color: "#ffffff",
		alignSelf: "center",
		fontSize: 20,
		fontFamily: "pMedium",
	},
	InstructionBlock: {
		flexDirection: "row",
		alignSelf : "center",
		borderRadius:15,
		borderColor: "#000000",
		borderWidth: 1
		
	},
	
	InstructionTitle: {
		fontSize: 20,
		fontFamily: "pBold",
		color: "#7AA8AE",
	},
	InstructionDescription: {

		alignItems: "center",
		margin:10,
		fontSize: 15,
		fontFamily: "pMedium",
		color: "#ffffff",
	},
	InstructionInsideBlock: {
		backgroundColor: "#1a1d26",
		alignItems: "center",
		fontSize:25,
		borderRadius: 15,
	},
	ScrollViewStyle: {
		height: 200,
	},
	firstImageStyle: {
		width: 300,
		height: 300,
		margin: 20,
		marginTop: screenHeight*0.1,
		alignSelf: "center",
	},

	CameraPermissionView: {
		position: "absolute",
		alignSelf: "center",
		width: 380,
		height: 250,
		top: 0,
		backgroundColor: "#303545",
		borderRadius: 10,
		top: "30%",
		zIndex: 3,
	},

	NoticeText: {
		width: 380,
		height: 130,
		borderRadius: 5,
		alignSelf: "center",
		backgroundColor: "#20232e",
	},
	NoticeButton: {
		backgroundColor: "#7AA8AE",
		height: 40,
		margin: 10,
		zIndex: 0,
		width: 200,
		borderRadius: 10,
		justifyContent: "center",
		textAlign: "center",
		alignSelf: "center",
	},
	TestView : {
		alignSelf:"center",
		position:"absolute",
		alignItems: "center",
		top: screenHeight*1.1,
		borderRadius:15,
		width: screenWidth*0.6,
		height: screenHeight*0.3,
	},
	ImageContainer : {
		width:screenWidth*0.3,
		height:screenHeight*0.2,
		alignContent:"center",
		justifyContent:"center",
	}
});

export default styles;
