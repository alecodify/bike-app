import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View, ActivityIndicator, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
import { CustomModel, ImageModal } from '@/components';
import { fetchSignUp } from '@/api/api';

const Signup = () => {
  const colorScheme = useColorScheme();
  const [fullName, setFullName] = useState('');
  const [image, setImage] = useState<any | String>('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [newImageURL, setNewImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showImageUploadModal, setShowImageUploadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const statusBarColor = colorScheme === 'dark' ? '#000' : '#005792';
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(colorScheme === 'dark' ? 'light-content' : 'dark-content');
  }, [colorScheme]);

  const handleRegister = async() => {
    if (!fullName || !email || !phone || !address || !password || !confirmPassword || !role) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
  
    setLoading(true);
    setShowAuthModal(true);

    let headers, body;
  
    if (newImageURL) {
     
      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('email', email);
      formData.append('password', password);
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
        full_name: fullName,
        email,
        phone_number: phone,
        password,
        address,
        role,
      });
    }

    const response = await fetchSignUp(headers, body);

    if (response.status === "Success") {
      setImage(null);
      setFullName('');
      setAddress('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhone('');
      setRole('');

      setShowAuthModal(false);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        router.navigate('/(auth)/signin');
      }, 3000);
    } else {
      setShowAuthModal(false);
      setShowErrorModal(true);

      setTimeout(() => {
        setShowErrorModal(false);
        setLoading(false);
      }, 1000);
    }

  };

  const handleImageUpload = (url: any) => {
    setShowImageUploadModal(false);
    setNewImageURL(url);
  }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-black' : 'bg-primary'}`}>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }} className="py-6 px-6">
        <View className="mb-8 text-center">
          <Text className={`text-3xl font-extrabold text-center ${colorScheme === 'dark' ? "text-blue-600" : "text-blue-300"}`}>Register</Text>
          <Text className="text-gray-200 text-lg text-center text-white mt-2">Create an account to get started!</Text>
        </View>

        <View className="p-6 rounded-xl shadow-lg shadow-white">
          <TouchableOpacity onPress={() => setShowImageUploadModal(true)}>
            {newImageURL ? (
              <Image source={{ uri: newImageURL }} className="mt-4 w-24 h-24 rounded-full self-center" />
            ) : (
              <Image source={{ uri: image }} className="mt-4 w-24 h-24 rounded-full self-center" />
            )}
          </TouchableOpacity>
          <TextInput
            className={`mb-4 pb-2 text-lg text-white border-b ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"}`}
            placeholder="Full Name"
            placeholderTextColor={'white'}
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            className={`mb-4 pb-2 text-lg text-white border-b ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"}`}
            placeholder="Email"
            placeholderTextColor={'white'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
           className={`mb-4 pb-2 text-lg text-white border-b ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"}`}
            placeholder="Phone Number"
            placeholderTextColor={'white'}
            keyboardType="number-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
           className={`mb-4 pb-2 text-lg text-white border-b ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"}`}
            placeholder="Address"
            placeholderTextColor={'white'}
            value={address}
            onChangeText={setAddress}
          />

          <TextInput
            className={`mb-4 pb-2 text-lg text-white border-b ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"}`}
            placeholder="Password"
            placeholderTextColor={'white'}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TextInput
            className={`mb-4 pb-2 text-lg text-white border-b ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"}`}
            placeholder="Confirm Password"
            placeholderTextColor={'white'}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View className={`border-b mb-6 ${colorScheme === 'dark' ? "border-primary" : "border-gray-300"} `}>
            <Picker
              selectedValue={role}
              onValueChange={(itemValue) => setRole(itemValue)}
              style={{ fontSize: 18, color: 'white' }}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="Customer" value="customer" />
              <Picker.Item label="Mechanic" value="mechanic" />
            </Picker>
          </View>

          <TouchableOpacity
            className={`py-3 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600'} active:bg-blue-700 transition-all duration-200`}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-center text-white font-bold text-lg">Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
        
        <View className='flex flex-row justify-center items-center mt-6'>
          <Text className="text-center text-gray-300 text-gray text-sm">Already have an account? </Text>
          <TouchableOpacity onPress={() => {router.push('/(auth)/signin')}}><Text className="text-white text-sm font-semibold">Login</Text></TouchableOpacity>
        </View>

      </ScrollView>
      
      <ImageModal visible={showImageUploadModal} onClose={() => setShowImageUploadModal(false)} title='Select Image!' description='Please choose your profile picture to upload.' onImageUpload={handleImageUpload} />
      <CustomModel visible={showAuthModal} title="Working!" description='Please wait while creating your account.' onClose={() => {setShowAuthModal(false)}} animationSource={require('../../assets/animations/email.json')} />
      <CustomModel visible={showSuccessModal} title="Success!" description='Your account has been created successfully.' onClose={() => {setShowSuccessModal(false)}} animationSource={require('../../assets/animations/success.json')} />
      <CustomModel visible={showErrorModal} title="Failure!" description='Something went wrong.' onClose={() => {setShowErrorModal(false)}} animationSource={require('../../assets/animations/error.json')} />
      
    </SafeAreaView>
  );
};

export default Signup;
