import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import LottieView from 'lottie-react-native';
import UploadAnimation from '../assets/animations/image.json';
import CustomModal from './CustomModel';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/constants';
import * as ImagePicker from "expo-image-picker";

interface ImageModalProps {
  visible: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  onImageUpload?: (imagePath: any) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ visible, onClose, title, description, onImageUpload  }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    try {
        setLoading(true);
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
  
        if (!result.canceled) {
          const imageUri = result.assets[0].uri;
          onImageUpload && onImageUpload(imageUri);
        }
      } catch (error) {
        console.error('Image selection error:', error);
        setShowErrorModal(true);
        setTimeout(() => {
            setShowErrorModal(false);
        }, 3000);
      } finally {
        setLoading(false);
      }
  }

  const handleOpenCamera = async () => {
    try {
        setLoading(true);
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          alert('Camera access is required to take a photo.');
          setLoading(false);
          return;
        }
  
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
  
        if (!result.canceled) {
          const imageUri = result.assets[0].uri;
          onImageUpload && onImageUpload(imageUri);
        }
      } catch (error) {
        console.error('Camera error:', error);
        setShowErrorModal(true);
        setTimeout(() => {
            setShowErrorModal(false);
        }, 3000);
      } finally {
        setLoading(false);
    }
  }

  return (
    <View className=''>
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
          <TouchableWithoutFeedback onPress={onClose}>
            <View className='flex-1 justify-center items-center bg-black/40'>
              <View className='bg-white w-4/5 p-5 rounded-lg items-center'>
                 <LottieView source={UploadAnimation} autoPlay loop style={{width: "50%", height: 100, marginBottom: 4}} />
                 <Text className='text-lg font-semibold text-gray-900'>{title}</Text>
                 <Text className='text-sm text-gray-600 text-center mt-1'>{description}</Text>

                 <View className='flex-row justify-between mt-5 w-full'>
                    <TouchableOpacity onPress={handleOpenCamera} className='flex-1 mr-2'>
                        <View className='flex-row items-center justify-center bg-black p-2 rounded-lg'>
                            <Feather name='camera' size={20} color={COLORS.white} />
                            <Text className='text-white font-semibold ml-2'>Camera</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlePickImage} className='flex-1 ml-2'>
                        <View className='flex-row items-center justify-center bg-primary p-2 rounded-lg'>
                            {loading ? (
                                <ActivityIndicator size={20} color={COLORS.white} />
                            ) : (
                                <>
                                    <Feather name='image' size={20} color={COLORS.white} />
                                    <Text className='text-white font-semibold ml-2'>Gallery</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                 </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          <CustomModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} animationSource={require('../assets/animations/success.json')} title='Success!' description='Image selected successfully!' />
          <CustomModal visible={showErrorModal} onClose={() => setShowErrorModal(false)} animationSource={require('../assets/animations/error.json')} title='Upload Failed!' description='There was an error during the image selection!' />
        </Modal>
    </View>
  )
}

export default ImageModal

const styles = StyleSheet.create({})