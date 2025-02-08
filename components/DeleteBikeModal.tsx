import { ActivityIndicator, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react'
import CustomModal from './CustomModel';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/constants';
import LottieView from 'lottie-react-native';
import DeleteAnimation from '../assets/animations/delete.json';
import { fetchDeleteUserBike, fetchUserBikeData } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DeleteBikeModalProps {
  visible: boolean;
  title: string;
  description: string;
  onClose: () => void;
  bikeId: string | undefined;
  onDelete: (bikeId: string) => void;
}


const DeleteBikeModal: React.FC<DeleteBikeModalProps> = ({ visible, description, title, onClose, onDelete, bikeId }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeleteBike = async () => {
     if (!bikeId) return;
     setLoading(true);

     const response = await fetchDeleteUserBike(bikeId);
     
     if (response.status === 'Success') {
        setShowSuccessModal(true);
        const userData: any = await AsyncStorage.getItem('user');
        const { _id } = JSON.parse(userData);
        await fetchUserBikeData(_id);

        setTimeout(() => {
            setShowSuccessModal(false);
            onDelete(bikeId);
            onClose();
            setLoading(false);
        }, 3000);
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

                    <TouchableOpacity onPress={handleDeleteBike} className='flex-1 ml-2'>
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

        <CustomModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description='Bike has been deleted successfully.' animationSource={require('../assets/animations/success.json')} />
        <CustomModal visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Deletion Failed!' description='There was an error during the bike deletion.' animationSource={require('../assets/animations/error.json')} />
       </Modal>
    </View>
  )
}

export default DeleteBikeModal

const styles = StyleSheet.create({})