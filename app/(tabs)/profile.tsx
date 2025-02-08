import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '@/constants/constants';
import { CustomModel, DeleteAccountModal, Header, LogoutModal } from '@/components';

const Profile = () => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  
  const colorSchema = useColorScheme();

  return (
    <SafeAreaView className={`flex-1 ${colorSchema === 'dark' ? "bg-dark" : "bg-white"}`} >
      <Header title='Profile' subTitle='Your Profile - Perferences' />

     <ScrollView contentContainerStyle={{paddingTop: 6}}>
       <View className={`px-8 py-4 gap-6 items-center ${colorSchema === 'dark' ? "text-darkColor" : "text-white"}`}>
          <View className='flex w-full flex-row justify-between items-center'>
             <View className='flex' style={styles.leftContainer}>
                <Feather name='edit' size={25} color={colorSchema === 'dark' ? COLORS.white : COLORS.primary} />
                <Text className={`${colorSchema === 'dark' ? "text-white" : "text-dark"} text-lg ml-2`}>Edit Profile:{' '}</Text>
             </View>
             <View>
                <TouchableOpacity onPress={() => router.navigate('/(screens)/editprofile')}>
                  <Feather name='chevron-right' size={30} color={COLORS.primary} />
                </TouchableOpacity>
             </View>
          </View>

          <View className='flex w-full flex-row justify-between items-center'>
             <View className='flex' style={styles.leftContainer}>
                <MaterialCommunityIcons name='motorbike' size={25} color={colorSchema === 'dark' ? COLORS.white : COLORS.primary} />
                <Text className={`${colorSchema === 'dark' ? "text-white" : "text-dark"} text-lg ml-2`}>Bike Management:{' '}</Text>
             </View>
             <View>
                <TouchableOpacity onPress={() => router.navigate('/(screens)/mybikes')}>
                  <Feather name='chevron-right' size={30} color={COLORS.primary} />
                </TouchableOpacity>
             </View>
          </View>

          <View className='flex w-full flex-row justify-between items-center'>
             <View className='flex' style={styles.leftContainer}>
                <Feather name='book' size={25} color={colorSchema === 'dark' ? COLORS.white : COLORS.primary} />
                <Text className={`${colorSchema === 'dark' ? "text-white" : "text-dark"} text-lg ml-2`}>My Bookings:{' '}</Text>
             </View>
             <View>
                <TouchableOpacity onPress={() => router.navigate('/(screens)/bookings')}>
                  <Feather name='chevron-right' size={30} color={COLORS.primary} />
                </TouchableOpacity>
             </View>
          </View>

          <View className='flex w-full flex-row justify-between items-center'>
             <View className='flex' style={styles.leftContainer}>
                <MaterialCommunityIcons name='headset' size={25} color={colorSchema === 'dark' ? COLORS.white : COLORS.primary} />
                <Text className={`${colorSchema === 'dark' ? "text-white" : "text-dark"} text-lg ml-2`}>Help & Support:{' '}</Text>
             </View>
             <View>
                <TouchableOpacity onPress={() => router.navigate('/(screens)/customercare')}>
                  <Feather name='chevron-right' size={30} color={COLORS.primary} />
                </TouchableOpacity>
             </View>
          </View>

          <View className='flex w-full flex-row justify-between items-center'>
             <View className='flex' style={styles.leftContainer}>
                <Feather name='rotate-cw' size={25} color={colorSchema === 'dark' ? COLORS.white : COLORS.primary} />
                <Text className={`${colorSchema === 'dark' ? "text-white" : "text-dark"} text-lg ml-2`}>Change Password:{' '}</Text>
             </View>
             <View>
                <TouchableOpacity onPress={() => router.navigate('/(auth)/change')}>
                  <Feather name='chevron-right' size={30} color={COLORS.primary} />
                </TouchableOpacity>
             </View>
          </View>

          <TouchableOpacity className='w-full' onPress={() => {setShowDeleteAccountModal(true)}}>
             <View className='flex-row w-full gap-2 justify-start items-center'>
               <Feather name='trash' size={25} color={colorSchema === 'dark' ? COLORS.errorColor : COLORS.errorColor } />
               <Text className={`${colorSchema === 'dark' ? "text-errorColor" : "text-errorColor"} text-lg ml-2`}>Delete Account</Text>
             </View>
          </TouchableOpacity>

          <TouchableOpacity className='w-full' onPress={() => {setShowLogoutModal(true)}}>
             <View className='flex-row w-full gap-2 justify-start items-center'>
               <Feather name='log-out' size={25} color={colorSchema === 'dark' ? COLORS.primary : COLORS.primary } />
               <Text className={`${colorSchema === 'dark' ? "text-primary" : "text-dark"} text-lg ml-2`}>Logout</Text>
             </View>
          </TouchableOpacity>
       </View>
     </ScrollView>


      <LogoutModal visible={showLogoutModal} onClose={() => setShowLogoutModal(false)} title='Logout!' description='Are are sure you want to logout ?' />
      <DeleteAccountModal visible={showDeleteAccountModal} onClose={() => setShowDeleteAccountModal(false)} title='Delete Account!' description='Are you sure you want to delete your account ?' />
      <CustomModel visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description='Image uploaded successfully!' animationSource={require('../../assets/animations/success.json')} />
      <CustomModel visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Error!' description='Error fetching user data. Please try again later.' animationSource={require('../../assets/animations/error.json')} />
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  leftContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 5,
    gap: 5,
  }
})