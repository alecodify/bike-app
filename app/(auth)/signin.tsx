import { ActivityIndicator, Image, ScrollView, StatusBar, TextInput, TouchableOpacity, useColorScheme, View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { CustomModel } from "@/components";
import { fetchSignIn } from "@/api/api";

const Signin = () => {
  const colorSchema = useColorScheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showGoogleAuthModal, setShowGoogleAuthModal] = useState(false);

  useEffect(() => {
    const statusBarColor = colorSchema === 'dark' ? '#000' : '#005792';
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(colorSchema === 'dark' ? 'light-content' : 'dark-content');
  }, [colorSchema]);

  const handleLogin = async() => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setShowAuthModal(true);
    
    const data = {
      email, password
    }

    const response = await fetchSignIn(data);

    if (response.status === "Success") {
      const token = response.token;
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));
      setLoading(false);
      setEmail('');
      setPassword('');
      setShowAuthModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.navigate('/(tabs)/home');
      }, 3000);
    }else{
      setShowAuthModal(false);
      setShowErrorModal(true);

      setTimeout(() => {
        setShowErrorModal(false);
        setLoading(false);
      }, 3000);
    }
  }

  const handleGoogleLogin = async() => {
    setGoogleLoading(true);
    setShowGoogleAuthModal(true);

    setTimeout(() => {
      setGoogleLoading(false);
      setShowGoogleAuthModal(false);
    }, 5000);
  }

  return (
    <SafeAreaView className={`flex-1 ${colorSchema === 'dark' ? 'bg-black' : 'bg-primary'}`}>
    
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} className="py-6 px-6">
      <View className="mb-8 text-center">
        <Text className={`text-3xl font-extrabold text-center ${colorSchema === 'dark' ? "text-blue-600" : "text-blue-300"}`}>Welcome Back</Text>
        <Text className="text-gray-200 text-lg text-center text-white mt-2">Please fill up the form to login.</Text>
      </View>

      <View className="flex-1 mt-10">
        <View className="p-6 w-full rounded-xl shadow-lg shadow-white">
        
        <TextInput
          className={`mb-4 pb-2 text-lg text-white border-b ${colorSchema === 'dark' ? "border-primary" : "border-gray-300"}`}
          placeholder="Email"
          placeholderTextColor={'white'}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <View className={`flex flex-row items-center justify-between w-full border-b mb-4 pb-0 ${colorSchema === 'dark' ? "border-primary" : "border-gray-300"}`}>
          <TextInput
            className="text-lg text-white"
            placeholder="Password"
            placeholderTextColor={'white'}
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => {setHidePassword(!hidePassword)}}>
            <Feather  name={hidePassword ? 'eye-off' : 'eye'} size={18} className='right-3' color={'white'} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity className='h-10' onPress={() => {router.navigate('/(auth)/forget')}}>
          <Text className={`font-bold text-sm right-1 uppercase text-right ${colorSchema === 'dark' ? "text-primary" : "text-white"}`}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleGoogleLogin} className={`${colorSchema === 'dark' ? "bg-googleButton" : "bg-googleButton"} mb-4 flex-row justify-center items-center rounded-md w-full p-2`}>
          {googleLoading ? (
            <ActivityIndicator size={25} color={'black'} />
            ) : (
              <>
                <Image className='w-10 h-10' resizeMode='contain' source={require('../../assets/images/google-icon.png')} />
                <Text className={`${colorSchema === 'dark' ? "text-dark" : "text-dark"} pt-2 font-rubik-bold text-lg`}>Continue with Google</Text>
              </>
          )}
        </TouchableOpacity>
      
        <TouchableOpacity
          className={`py-3 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'} active:bg-blue-700 transition-all duration-200`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-center text-white font-rubik-bold text-lg">Sign In</Text>
          )}
        </TouchableOpacity>
    </View>

      <View className='flex flex-row justify-center items-center mt-6'>
  	    <Text className="text-center text-gray-300 text-gray text-sm">Don't have an account? </Text>
        <TouchableOpacity onPress={() => {router.push('/(auth)/signup')}}><Text className="text-white text-sm font-semibold">Register</Text></TouchableOpacity>
      </View>
    </View>
    </ScrollView>

    <CustomModel visible={showAuthModal} title="Working!" description='Please wait while logging in your account.' onClose={() => {setShowAuthModal(false)}} animationSource={require('../../assets/animations/email.json')} />
    <CustomModel visible={showSuccessModal} title="Success!" description='Login successfully.' onClose={() => {setShowSuccessModal(false)}} animationSource={require('../../assets/animations/success.json')} />
    <CustomModel visible={showErrorModal} title="Failure!" description='Something went wrong.' onClose={() => {setShowErrorModal(false)}} animationSource={require('../../assets/animations/error.json')} />
    <CustomModel visible={showGoogleAuthModal} title="Trying to Login!" description="Please wait while we're trying to login with your Google Account." onClose={() => {setShowGoogleAuthModal(false)}} animationSource={require('../../assets/animations/google.json')} />
      
  </SafeAreaView>
  );
};

export default Signin;
