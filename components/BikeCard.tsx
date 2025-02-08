import { Dimensions, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/constants';
import { router } from 'expo-router';
import DeleteBikeModal from './DeleteBikeModal';

const {width, height} = Dimensions.get('window');

interface Bike {
  _id: string;
  bike_name: string;
  bike_company_name: string;
  bike_model: string;
  bike_registration_number: string;
}

interface BikeCardProps {
   bike: Bike;
   onDelete: (bikeId: string) => void;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const [showDeleteBikeModal, setShowDeleteBikeModal] = useState(false);
    const colorScheme = useColorScheme();

    const handleDeleteBike = async (bikeId: any) => {
        await onDelete(bikeId);
        setShowDeleteBikeModal(false);
    }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? "bg-dark" : "bg-white" }`}>
      <TouchableOpacity onPress={() => {setExpanded(prev => !prev)}}>
        <View className={`px-6 py-3 gap-4 items-center ${colorScheme === 'dark' ? "text-darkColor" : "text-white"}`}>
            <View className='flex w-full flex-row justify-between items-center'>
                <View className='flex flex-row items-center'>
                    <MaterialCommunityIcons name='motorbike' size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.primary} />
                    <Text className={`${colorScheme === 'dark' ? "text-white" : "text-dark"} text-lg ml-2`}>{bike.bike_name}</Text>
                </View>
                <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={30} color={COLORS.primary} />
            </View>
        </View>          
      </TouchableOpacity>
      {expanded && (
        <View className={`flex w-full justify-center mb-4 shadow-black dark:shadow-white ${colorScheme === 'dark' ? "bg-darkColor" : "bg-white"}`} style={styles.vehicleCard}>
            <View>
                <Text className={`text-lg font-rubik p-2 ${colorScheme === 'dark' ? "text-white" : "text-dark"}`}>Company: {bike.bike_company_name}</Text>
                <Text className={`text-lg font-rubik p-2 ${colorScheme === 'dark' ? "text-white" : "text-dark"}`}>Model: {bike.bike_model}</Text>
                <Text className={`text-lg font-rubik p-2 ${colorScheme === 'dark' ? "text-white" : "text-dark"}`}>Registration Number: {bike.bike_registration_number}</Text>
            </View>

            <View className='flex flex-row items-center justify-between'>
                <TouchableOpacity onPress={() => {setShowDeleteBikeModal(true)}}>
                    <Feather name='trash' size={25} color={colorScheme === 'dark' ? COLORS.errorColor : COLORS.errorColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.push({pathname: '/(screens)/bikedetails', params: {bike: JSON.stringify(bike)}})}}>
                    <Feather name='eye' size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.dark} />
                </TouchableOpacity>
            </View>
        </View>
      )}

      <DeleteBikeModal visible={showDeleteBikeModal} onClose={() => setShowDeleteBikeModal(false)} bikeId={bike._id} onDelete={handleDeleteBike} title="Delete Bike!" description='Are you sure you want to delete this bike?' />
    </SafeAreaView>
  )
}

export default BikeCard

const styles = StyleSheet.create({
    vehicleCard: {
        borderRadius: 10,
        padding: 20,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        width: width * 0.9,
        gap: 8,
        marginHorizontal: 10,
    },
})