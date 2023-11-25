import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Scan from "./components/Scanpage";
import HomeScreen from "./components/HomeScreen";
import Result from "./components/ResultPage";

const Stack = createStackNavigator();

export default function App() {
	const colorScheme = useColorScheme();

	const headerStyle = {
		backgroundColor: colorScheme === "light" ? "#fff" : "#231f26",
	};

	const headerTintColor = colorScheme === "light" ? "#231f26" : "#fff";
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='HomeScreen'>
				<Stack.Screen
					name='HomeScreen'
					component={HomeScreen}
					options={{
						title: "Home",
						headerStyle,
						headerTintColor,
					}}
				/>
				<Stack.Screen
					name='Scan'
					component={Scan}
					options={{
						title: "Scan",
						headerStyle,
						headerTintColor,
					}}
				/>
				<Stack.Screen
					name='Result'
					component={Result}
					options={{
						title: "Result",
						headerStyle,
						headerTintColor,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
