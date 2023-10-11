import Home from "./Homepage.js";
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";

const Layout = () =>{
    const [fontsLoaded] = useFonts({
        'Inter-Black': require('../src/fonts/pBold.ttf'),
      });
    
      const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);
    
      if (!fontsLoaded) {
        return null;
      }
      return(<Home />)
}
export default Layout;