import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/constants';
import { CustomModel, Header, ImageModal } from "@/components";
import { fetchUpdateUserData, fetchUserData } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Editprofile = () => {
  const colorScheme = useColorScheme();
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [newImageURL, setNewImageURL] = useState(null);

  useEffect(() => {
    userData();
  },[]);

  const userData = async () => {
    const response = await fetchUserData();
    const user = response.user;
    if (response.status === "Success") {
      setName(user.full_name);
      setPhone(user.phone_number);
      setEmail(user.email);
      setAddress(user.address);
      setRole(user.role);
      setPhotoURL(user.imageUrl);
    }
  }

  const handleImageUpload = (url: any) => {
    setShowImageUploadModal(false);
    setNewImageURL(url);
  }

  const handleUpdateProfile = async () =>{
    setLoading(true);
    setShowUpdateModal(true);

    let headers, body;

    const user: any = await AsyncStorage.getItem('user');
    const { _id } = JSON.parse(user);

    if (newImageURL) {
      const formData = new FormData();
      formData.append('full_name', name);
      formData.append('email', email);
      formData.append('phone_number', phone);
      formData.append('address', address);
      formData.append('role', role);
      formData.append('image', {
        uri: newImageURL,
        type: 'image/jpg',
        name: `profile+${Date.now()}.jpg`,
      });

      headers = { 'Content-Type': 'multipart/form-data' };
      body = formData;
    } else {
      headers = { 'Content-Type': 'application/json' };
      body = JSON.stringify({
        full_name: name,
        email,
        phone_number: phone,
        address,
        role,
      });
    }

    const response = await fetchUpdateUserData(headers, body, _id);
     if (response.status === "Success") {
          setPhotoURL('');
          setName('');
          setAddress('');
          setEmail('');
          setPhone('');
          setRole('');
          setLoading(false);
          setShowUpdateModal(true);
          userData();
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...JSON.parse(user), full_name: name, phone_number: phone, email, address, role, imageUrl: newImageURL || photoURL })
          );
    
          setTimeout(() => {
            setShowUpdateModal(false);
          }, 3000);
        } else {
          setShowErrorModal(true);
          setTimeout(() => {
            setShowErrorModal(false);
            setLoading(false);
          }, 1000);
        }
  }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? "bg-dark" : "bg-white"}`}>
      <Header title='Edit Profile' subTitle='You can edit your profile here!' />
     
      <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
        <View className="py-4 gap-4 items-center">
          <TouchableOpacity onPress={() => setShowImageUploadModal(true)}>
            {newImageURL || photoURL ? (
              <Image
                className="w-24 h-24 rounded-full border-2 border-gray-300"
                resizeMode="cover"
                source={{ uri: newImageURL || photoURL }}
              />
            ) : (
              <Image
                className="w-24 h-24 rounded-full border-2 border-gray-300"
                resizeMode="cover"
                source={{uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}
              />
            )}
          </TouchableOpacity>

          <View className="w-[90%] gap-4">
            <View className="gap-1">
              <Text className="text-base font-semibold text-gray-700 dark:text-white">Name</Text>
              <TextInput
                className="w-full bg-gray-100 text-gray-900 dark:text-white rounded-lg px-4 py-2 border-2 border-gray-300 dark:border-primary"
                placeholder="Enter your full name"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>

            <View className="gap-1">
              <Text className="text-base font-semibold text-gray-700 dark:text-white">Phone</Text>
              <TextInput
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 border-2 border-gray-300 dark:border-primary"
                placeholder="Enter your phone number"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={`+92 ${phone}`}
                onChangeText={text => setPhone(text)}
              />
            </View>

            <View className="gap-1">
              <Text className="text-base font-semibold text-gray-700 dark:text-white">Email</Text>
              <TextInput
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 border-2 border-gray-300 dark:border-primary"
                placeholder="Enter your email"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>

            <View className="gap-1">
              <Text className="text-base font-semibold text-gray-700 dark:text-white">Address</Text>
              <TextInput
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 border-2 border-gray-300 dark:border-primary"
                placeholder="Enter your address"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </View>

            <View className="gap-1">
              <Text className="text-base font-semibold text-gray-700 dark:text-white">Role</Text>
              <TextInput
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg px-4 py-2 border-2 border-gray-300 dark:border-primary"
                placeholder="Enter your role"
                placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                value={role}
                onChangeText={text => setRole(text)}
              />
            </View>
          </View>

          <TouchableOpacity className={`w-full mt-4 items-center`} onPress={handleUpdateProfile}>
            <Text className='rounded-md top-4 px-6 py-3 text-lg font-bold bg-gray'>
              {loading ? (
                <ActivityIndicator size={25} color={COLORS.white} />
                   ) : (
                'Update Profile'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ImageModal visible={showImageUploadModal} onClose={() => setShowImageUploadModal(false)} title='Upload Image!' description='Please choose your profile picture to upload.' onImageUpload={handleImageUpload} />
      <CustomModel visible={showUpdateModal} onClose={() => setShowUpdateModal(false)} title="Success!" description="Profile updated successfully!" animationSource={require('../../assets/animations/success.json')} />
      <CustomModel visible={showErrorModal} onClose={() => setShowErrorModal(false)} title="Update Failed!" description="There was an error updating your profile!" animationSource={require('../../assets/animations/error.json')} />
    </SafeAreaView>
  )
}

export default Editprofile

const styles = StyleSheet.create({})