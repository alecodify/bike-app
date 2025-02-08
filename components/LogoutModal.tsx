import { ActivityIndicator, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutAnimation from "../assets/animations/logout.json";
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';
import CustomModal from './CustomModel';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/constants';
import { fetchSignOut } from '@/api/api';
import { router } from 'expo-router';

interface LogoutModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, title, description }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async ()=> {
    setLoading(true);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    const response: any = await fetchSignOut();
    if (response.status === 200) { 
        setShowSuccessModal(true);
        
        setTimeout(() => {
            router.replace('/(auth)/signin');
        }, 1500);
    } else{
        setShowErrorModal(true);
    }
  }

  return (
    <View className=''>
       <Modal animationType='slide' onRequestClose={onClose} transparent={true} visible={visible}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View className='flex-1 justify-center items-center bg-black/40'>
              <View className='bg-white w-4/5 p-5 rounded-lg items-center'>
                 <LottieView source={LogoutAnimation} autoPlay loop style={{width: "50%", height: 100, marginBottom: 4}} />
                 <Text className='text-lg font-semibold text-gray-900'>{title}</Text>
                 <Text className='text-sm text-gray-600 text-center mt-1'>{description}</Text>

                 <View className='flex-row justify-between mt-5 w-full'>
                    <TouchableOpacity onPress={onClose} className='flex-1 mr-2'>
                        <View className='flex-row items-center justify-center bg-black p-2 rounded-lg'>
                            <Feather name='x-circle' size={20} color={COLORS.white} />
                            <Text className='text-white font-semibold ml-2'>Cancel</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleLogout} className='flex-1 ml-2'>
                        <View className='flex-row items-center justify-center bg-red-500 p-2 rounded-lg'>
                            {loading ? (
                                <ActivityIndicator size={20} color={COLORS.white} />
                            ) : (
                                <>
                                    <Feather name='check-circle' size={20} color={COLORS.white} />
                                    <Text className='text-white font-semibold ml-2'>Proceed</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                 </View>
              </View>
            </View>
        </TouchableWithoutFeedback>

        <CustomModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Logout Successfully!' description='You have been logged out successfully.' animationSource={require('../assets/animations/success.json')} />
        <CustomModal visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Logout Failed!' description='There was an error during the logout.' animationSource={require('../assets/animations/error.json')} />
       </Modal>
    </View>
  )
}

export default LogoutModal;
