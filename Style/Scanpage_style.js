import { StyleSheet } from "react-native";

const ScanStyle = StyleSheet.create({
	Scanning: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 150,
	},
	ScanText: {
		fontFamily: "pBold",
		fontSize: 30,
		color: "#7AA8AE",
	},
	CamArea: {
		backgroundColor: "#d6d6d6",
		margin: "auto",
		width: 350,
		left: "7%",
		height: 350,
		margin: "auto",
		marginTop: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	cam_icon: {
		width: 50,
		height: 50,
	},
	Darkmode: {
		backgroundColor: "#231f26",
	},
	Lightmode: {
		backgroundColor: "#ffffff",
	},
});
export default ScanStyle;
