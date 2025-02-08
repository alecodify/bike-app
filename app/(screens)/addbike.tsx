import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/constants';
import { CustomModel, Header } from '@/components';
import { fetchUserAddBikeData, fetchUserBikesData } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Addbike = () => {
    const colorScheme = useColorScheme();
    const [bikeModel, setBikeModel] = useState('');
    const [bikeName, setBikeName] = useState('');
    const [bikeCompanyName, setBikeCompanyName] = useState('');
    const [bikeRegNumber, setBikeRegNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleAddBike = async () => {
        setLoading(true);
        if (bikeName === '' || bikeCompanyName === '' || bikeModel === '' || bikeRegNumber === '') {
            return;
        }

        const bikeData = {
            bike_model: bikeModel,
            bike_name: bikeName,
            bike_company_name: bikeCompanyName,
            bike_registration_number: bikeRegNumber,
        };

        const response = await fetchUserAddBikeData(bikeData);

        const userData: any = await AsyncStorage.getItem('user');
        const { _id } = JSON.parse(userData);

        if (response.status === 'Success') {
            setLoading(false);
            setShowSuccessModal(true);
            setBikeName('');
            setBikeModel('');
            setBikeCompanyName('');
            setBikeRegNumber('');
            await fetchUserBikesData(_id);
            setTimeout(() => {
                setShowSuccessModal(false);
            }, 3000);
        } else {
            setLoading(false);
            setShowErrorModal(true);
            setBikeName('');
            setBikeModel('');
            setBikeCompanyName('');
            setBikeRegNumber('');
            setTimeout(() => {
                setShowErrorModal(false);
            }, 3000);
        }
    }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      <Header title='Add Bikes' subTitle='Here you add your bike data.' />

      <ScrollView contentContainerStyle={{paddingTop: 10,}}>
        <View className='w-[90%] mx-6 gap-4'>
            <View className="gap-1">
                <Text className="text-base font-semibold text-gray-700 dark:text-white">Bike Name</Text>
                <TextInput
                    className="w-full bg-gray-100 text-gray-900 dark:text-white rounded-lg px-4 py-3 border-2 border-gray-300 dark:border-primary"
                    placeholder="Enter your bike name"
                    placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                    value={bikeName}
                    onChangeText={text => setBikeName(text)}
                />
            </View>
            <View className="gap-1">
                <Text className="text-base font-semibold text-gray-700 dark:text-white">Bike Model</Text>
                <TextInput
                    className="w-full bg-gray-100 text-gray-900 dark:text-white rounded-lg px-4 py-3 border-2 border-gray-300 dark:border-primary"
                    placeholder="Enter your bike model"
                    placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                    value={bikeModel}
                    onChangeText={text => setBikeModel(text)}
                />
            </View>
            <View className="gap-1">
                <Text className="text-base font-semibold text-gray-700 dark:text-white">Bike Company Name</Text>
                <TextInput
                    className="w-full bg-gray-100 text-gray-900 dark:text-white rounded-lg px-4 py-3 border-2 border-gray-300 dark:border-primary"
                    placeholder="Enter your bike company name"
                    placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                    value={bikeCompanyName}
                    onChangeText={text => setBikeCompanyName(text)}
                />
            </View>
            <View className="gap-1">
                <Text className="text-base font-semibold text-gray-700 dark:text-white">Bike Registration Number</Text>
                <TextInput
                    className="w-full bg-gray-100 text-gray-900 dark:text-white rounded-lg px-4 py-3 border-2 border-gray-300 dark:border-primary"
                    placeholder="Enter your bike registration number"
                    placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark}
                    value={bikeRegNumber}
                    onChangeText={text => setBikeRegNumber(text)}
                />
            </View>
        </View>

        <TouchableOpacity className={`w-full mt-4 items-center`} onPress={handleAddBike}>
            <Text className='rounded-md top-4 px-6 py-3 text-lg font-bold bg-gray'>
                {loading ? (
                    <ActivityIndicator size={25} color={COLORS.white} />
                       ) : (
                    'Add Bike'
                )}
            </Text>
        </TouchableOpacity>
      </ScrollView>

      <CustomModel visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description='Bike added successfully.' animationSource={require('../../assets/animations/success.json')} />
      <CustomModel visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Failed!' description='Error adding bike.' animationSource={require('../../assets/animations/error.json')} />
    </SafeAreaView>
  )
}

export default Addbike

const styles = StyleSheet.create({})