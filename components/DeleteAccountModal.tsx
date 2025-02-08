import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TouchableOpacity, ActivityIndicator } from 'react-native'
import DeleteAnimation from '../assets/animations/delete.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import CustomModal from './CustomModel';
import { COLORS } from '@/constants/constants';
import { Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { fetchDeleteUserAccount } from '@/api/api';
import { router } from 'expo-router';

interface DeleteAccountModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ title, description, visible, onClose}) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
        setLoading(true);
        const data: any = await AsyncStorage.getItem('user');
        const userData = JSON.parse(data);
        
        const response = await fetchDeleteUserAccount(userData._id);

        if (response.status === "Success") {
            setShowSuccessModal(true);    
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('user');
            setTimeout(() => {
                router.replace('/(auth)/signin');
            }, 1500);
            setLoading(false);
        } else {
            setShowErrorModal(true);
            setTimeout(() => {
                setShowErrorModal(false);
            }, 3000);
        }
  }

  return (
    <View className=''>
    <Modal animationType='slide' onRequestClose={onClose} transparent={true} visible={visible}>
     <TouchableWithoutFeedback onPress={onClose}>
         <View className='flex-1 justify-center items-center bg-black/40'>
           <View className='bg-white w-4/5 p-5 rounded-lg items-center'>
              <LottieView source={DeleteAnimation} autoPlay loop style={{width: "50%", height: 100, marginBottom: 4}} />
              <Text className='text-lg font-semibold text-gray-900'>{title}</Text>
              <Text className='text-sm text-gray-600 text-center mt-1'>{description}</Text>

              <View className='flex-row justify-between mt-5 w-full'>
                 <TouchableOpacity onPress={onClose} className='flex-1 mr-2'>
                     <View className='flex-row items-center justify-center bg-black p-2 rounded-lg'>
                         <Feather name='x-circle' size={20} color={COLORS.white} />
                         <Text className='text-white font-semibold ml-2'>Cancel</Text>
                     </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={handleDeleteAccount} className='flex-1 ml-2'>
                     <View className='flex-row items-center justify-center bg-red-500 p-2 rounded-lg'>
                         {loading ? (
                             <ActivityIndicator size={20} color={COLORS.white} />
                         ) : (
                             <>
                                 <Feather name='check-circle' size={20} color={COLORS.white} />
                                 <Text className='text-white font-semibold ml-2'>Delete</Text>
                             </>
                         )}
                     </View>
                 </TouchableOpacity>
              </View>
           </View>
         </View>
     </TouchableWithoutFeedback>

     <CustomModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description='Your account has been deleted successfully!' animationSource={require('../assets/animations/success.json')} />
     <CustomModal visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Deletion Failed!' description='There was an error during the account deletion.' animationSource={require('../assets/animations/error.json')} />
    </Modal>
   </View>
  )
}

export default DeleteAccountModal

const styles = StyleSheet.create({})