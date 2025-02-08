import React from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity, } from 'react-native';
import LottieView from 'lottie-react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  animationSource?: any;
  primaryButtonText?: string;
  onPrimaryButtonPress?: () => void;
  secondaryButtonText?: string;
  onSecondaryButtonPress?: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ visible, onClose, title, description, animationSource, primaryButtonText, onPrimaryButtonPress, secondaryButtonText, onSecondaryButtonPress,}) => {
  return (
    <View className='w-[90%] max-h-[80%]'>
        <Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white rounded-2xl p-6 shadow-lg w-[90%] max-h-[80%] items-center">
            {animationSource && (
              <LottieView style={{width: "50%", height: "50%", marginBottom: 4}} source={animationSource} autoPlay loop />
            )}

            {title && <Text className="text-lg font-bold text-gray-800 text-center">{title}</Text>}

            {description && (
              <Text className="text-gray-700 text-center text-base mt-2">{description}</Text>
            )}

            <View className="mt-5 flex-row justify-between w-full">
              {primaryButtonText && (
                <TouchableOpacity
                  className="bg-blue-600 py-2 px-4 rounded-lg flex-1 mr-2"
                  onPress={onPrimaryButtonPress}>
                  <Text className="text-white font-semibold text-center">{primaryButtonText}</Text>
                </TouchableOpacity>
              )}

              {secondaryButtonText && (
                <TouchableOpacity
                  className="bg-gray-500 py-2 px-4 rounded-lg flex-1 ml-2"
                  onPress={onSecondaryButtonPress}>
                  <Text className="text-white font-semibold text-center">{secondaryButtonText}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    </View>
  );
};

export default CustomModal;
