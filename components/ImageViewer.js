import { StyleSheet, Image, Dimensions } from "react-native";

export default function ImageViewer({ imageSource }) {
	const screenWidth = Dimensions.get("window").width;
	const screenHeight = Dimensions.get("window").height;
	return (
		<Image
			source={imageSource}
			style={{
				...styles.image,
				width: screenWidth * 0.7,
				height: screenHeight * 0.3,
			}}
		/>
	);
}

const styles = StyleSheet.create({
	image: {
		resizeMode: "contain",
	},
});
