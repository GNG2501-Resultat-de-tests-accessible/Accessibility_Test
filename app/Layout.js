import Home from "./Homepage.js";
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";

const Layout = () =>{
    const [fontsLoaded] = useFonts({
        'pBold': require('../src/fonts/pBold.ttf'),   //importing the poppins-bold font
        'pMedium': require('../src/fonts/pMedium.ttf'), //importing the poppins-medium font
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();     //show a splash screen if font is not loaded
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
      return(<Home />) // return the Home component
}
export default Layout;