import { Text, View, Image, useColorScheme, StatusBar, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const colorSchema = useColorScheme();

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await AsyncStorage.getItem('token');
      // console.log(isLoggedIn)
      if (isLoggedIn !== null) {
        router.replace('/(tabs)/home'); 
      } else {
        router.replace('/(auth)/signin');
      }
    };

    checkLogin()

    const statusBarColor = colorSchema === 'dark' ? '#000' : '#005792';
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(colorSchema === 'dark' ? 'light-content' : 'dark-content');

    // const timeout = setTimeout(() => {
    //   router.navigate('/(auth)/signin');
    // }, 3000);

    // return () => clearTimeout(timeout);
  },[colorSchema]);

  return (
    <SafeAreaView className={`flex-1 ${colorSchema === 'dark' ? 'bg-dark' : 'bg-primary'}`}>
      <View className="flex-1 justify-center items-center">
        <View>
          <Animatable.Image source={require("../assets/images/splash.png")} animation={'fadeIn'} duration={1500} style={{tintColor: 'white'}} />
        </View>
        <View>
          <Text className="font-rubik-bold text-3xl text-white text-center">Fix My Bike</Text>
          <Text className="font-rubik text-xl text-white text-center mt-2">Reliable Bike Repair Service</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
