import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '@/constants/constants';
import { CustomModel, Header } from '@/components';
import { fetchChangePassword } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassword = () => {
  const colorScheme = useColorScheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    setLoading(true);
    if (currentPassword === '' || newPassword === '') {
      setLoading(false);
      return;
    }

    const userData: any = await AsyncStorage.getItem('user');
    const { email } = JSON.parse(userData);

    const response = await fetchChangePassword(email, currentPassword, newPassword);
    
    if (response.status === 'Success') {
      setShowAuthModal(true);
      setIsButtonEnabled(true);

      setTimeout(async() => {
        setShowAuthModal(false);
        setLoading(false);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        setIsButtonEnabled(false);
        AfterSuccessful();
      }, 3000);
    } else if (response.status === 'Failed') {
      setShowError(true);
      setErrorText(response.message);
      setTimeout(() => {
        setShowError(false);
        setErrorText('');
        setLoading(false);
      }, 3000);
    } else {
      setShowErrorModal(true);
      setTimeout(() => {
        setShowErrorModal(false);
        setLoading(false);
      }, 3000);
    }
  }

  const AfterSuccessful = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      router.replace('/(auth)/signin');
    }, 5000);
  }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      <Header title='Change Password' subTitle='Change account password from here.' />
      
     <View className='mx-6 mt-6'>
        <View className='space-y-6 gap-2 mb-4'>
           <Text className={`text-lg font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-dark' }`}>Current Password</Text>
           <View className='flex-row items-center'>
             <TextInput 
                className={`flex-1 border-2 rounded-md text-md px-4 py-3 dark:border-primary pr-10 ${colorScheme === 'dark' ? 'text-white' : 'text-dark'}`} 
                placeholder="Enter your current password"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={currentPassword}
                secureTextEntry={hidePassword}
                onChangeText={setCurrentPassword}
              />
             <TouchableOpacity className='absolute right-4' onPress={() => setHidePassword(!hidePassword)}>
                <Feather name={hidePassword ? 'eye-off' : 'eye'} size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.dark} />
             </TouchableOpacity>
           </View>
        </View>

        <View className='space-y-6 gap-2 mb-4'>
           <Text className={`text-lg font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-dark' }`}>New Password</Text>
           <View className='flex-row items-center'>
             <TextInput 
                className={`flex-1 border-2 rounded-md text-md px-4 py-3 dark:border-primary pr-10 ${colorScheme === 'dark' ? 'text-white' : 'text-dark'}`} 
                placeholder="Enter your new password"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={newPassword}
                secureTextEntry={hidePassword1}
                onChangeText={setNewPassword}
              />
             <TouchableOpacity className='absolute right-4' onPress={() => setHidePassword1(!hidePassword1)}>
                <Feather name={hidePassword1 ? 'eye-off' : 'eye'} size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.dark} />
             </TouchableOpacity>
           </View>
        </View>

        <TouchableOpacity onPress={handleChangePassword} className={`w-full items-center`} >
          <Text className='rounded-md top-4 px-6 py-3 text-lg font-bold'  style={{backgroundColor: isButtonEnabled ? COLORS.primary : COLORS.gray }}>
            {loading ? (
              <ActivityIndicator size={25} color={COLORS.white} />
            ) : (
              'Change Password'
            )}
          </Text>
        </TouchableOpacity>
     </View>

     <CustomModel visible={showAuthModal} onClose={() => setShowAuthModal(false)} title='Working!' description="Please wait while we're changing your account password." animationSource={require('../../assets/animations/email.json')} />
     <CustomModel visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description="Your account password has been changed successfully next time login with your new password." animationSource={require('../../assets/animations/success.json')} />
     <CustomModel visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Failure!' description="Something went wrong." animationSource={require('../../assets/animations/error.json')} />
     <CustomModel visible={showError} onClose={() => setShowError(false)} title='Failure!' description={errorText} animationSource={require('../../assets/animations/error.json')} />
    </SafeAreaView>
  )
}

export default ChangePassword

const styles = StyleSheet.create({})