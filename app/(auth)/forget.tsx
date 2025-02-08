import { ActivityIndicator, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { COLORS } from '@/constants/constants';
import { CustomModel, Header } from '@/components';
import { fetchForgetPassword } from '@/api/api';

const ForgetPassword = () => {
  const colorScheme = useColorScheme();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [emailBorderColor, setEmailBorderColor] = useState(COLORS.gray);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
     const statusBarColor = colorScheme === 'dark' ? '#000' : '#fff';
     StatusBar.setBackgroundColor(statusBarColor);
     StatusBar.setBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content');
  }, [colorScheme]);

  const handleForgetPassword = async() => {
    setLoading(true);
    if (email === '') {
      setLoading(false);
      return;
    }

    const response = await fetchForgetPassword(email);

    if (response.status === 'Success') {
      setShowSuccessModal(true);
      setLoading(false);
      setEmail('')
      setTimeout(() => {
        setShowSuccessModal(false);
        router.replace('/(auth)/signin');
      }, 3000);
    } else {
      setEmailBorderColor(COLORS.errorColor);
      setShowErrorModal(true);
      setEmail('');
      setLoading(false);
      setTimeout(() => {
        setShowErrorModal(false);   
      }, 3000);
    }
  }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? "bg-dark" : "bg-white"}`}>
      <Header title='Not to Worry!' subTitle="We'll send you instructions to recover it." />

      <View className='mx-6 mt-4 gap-2'>
        <Text className={`text-dark text-lg font-bold dark:text-white`}>Email</Text>
        <TextInput
          style={{borderColor: emailBorderColor}}
          className='border-2 rounded-md px-4 py-3 text-dark dark:text-white'
          placeholder='Enter your email'
          placeholderTextColor={ colorScheme === 'dark' ? COLORS.gray : COLORS.dark }
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setEmailBorderColor(COLORS.primary)}
        />
      </View>


      <TouchableOpacity className={`w-full mt-4 items-center`} onPress={handleForgetPassword}>
        <Text className='rounded-md top-4 px-6 py-3 text-lg font-bold bg-gray'>
          {loading ? (
              <ActivityIndicator size={25} color={COLORS.white} />
              ) : (
              'Send Email'
          )}
        </Text>
      </TouchableOpacity>

      <CustomModel visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description="We've sent an email for resetting your password. Kindly check your inbox to initiate the password recovery process." animationSource={require('../../assets/animations/success.json')} />
      <CustomModel visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Failure!' description="The given email does not exist in our database." animationSource={require('../../assets/animations/error.json')} />
    </SafeAreaView>
  )
}

export default ForgetPassword

const styles = StyleSheet.create({})