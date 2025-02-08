import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '@/components';
import { fetchUserBikeData } from '@/api/api';

interface Service {
    _id: string;
    service_name: string;
    price: number;
}
  
interface ServiceHistory {
    _id: string;
    bookingDate: string;
    paymentStatus: string;
    totalPrice: number;
    services?: Service[];
}
  
interface Bike {
    _id: string;
    bike_model: string;
    bike_name: string;
    bike_company_name: string;
    bike_registration_number: string;
    bikeServiceHistory?: ServiceHistory;
}

const BikeDetails = () => {
    const colorScheme = useColorScheme();
    const { bike }: any = useLocalSearchParams();
    const bikeData = JSON.parse(bike);
    const [loading, setLoading] = useState(true);
    const [serviceHistory, setServiceHistory] = useState<ServiceHistory>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchUserBikeData(bikeData._id);
            if (response.status === 'Success') {
                setServiceHistory(response.bike.bikeServiceHistory);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? "bg-dark" : "bg-white"}`}>
            <Header title='My Bike History' subTitle='Here you see your bike history.' />

            <ScrollView showsVerticalScrollIndicator={false} className={`flex-1 mt-4 px-6 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                <View className='space-y-2'>
                    <View className='mb-3 gap-1'>
                        <Text className='text-md text-gray-700 dark:text-white'>Bike Model</Text>
                        <TextInput editable={false} value={`${bikeData.bike_model}`} className="border-2 border-gray-300 dark:border-primary rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
                    </View>
                    <View className='mb-3 gap-1'>
                        <Text className='text-md text-gray-700 dark:text-white'>Bike Name</Text>
                        <TextInput editable={false} value={`${bikeData.bike_name}`} className="border-2 border-gray-300 dark:border-primary rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
                    </View>
                    <View className='mb-3 gap-1'>
                        <Text className='text-md text-gray-700 dark:text-white'>Bike Company</Text>
                        <TextInput editable={false} value={`${bikeData.bike_company_name}`} className="border-2 border-gray-300 dark:border-primary rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
                    </View>
                    <View className='mb-3 gap-1'>
                        <Text className='text-md text-gray-700 dark:text-white'>Bike Registration Number</Text>
                        <TextInput editable={false} value={`${bikeData.bike_registration_number}`} className="border-2 border-gray-300 dark:border-primary rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-black dark:text-white" />
                    </View>
                </View>

                <View className='flex w-full justify-center items-center'>
                    <Text className={`text-lg font-rubik-bold ${colorScheme === 'dark' ? "text-primary" : "text-primary"}`}>Service History</Text>

                    {loading ? (
                        <ActivityIndicator
                        size="large"
                        color={colorScheme === "dark" ? "#FFF" : "#000"}
                        />
                    ) : serviceHistory && (
                        <View className="w-full p-4 my-2 border rounded-lg bg-gray-100 dark:bg-darkColor">
                        <Text className="text-lg font-bold text-black dark:text-white">
                            Service Date: {new Date(serviceHistory.bookingDate).toLocaleDateString()}
                        </Text>
                        <Text className="text-md text-gray-700 dark:text-white">
                            Payment Status: {serviceHistory.paymentStatus}
                        </Text>
                        <Text className="text-md text-primary font-bold">
                            Total Price: {serviceHistory.totalPrice}
                        </Text>

                        {serviceHistory.services && (
                            serviceHistory.services.map((service, i) => (
                            <View
                                key={service._id}
                                className="mt-2 p-3 flex-1 flex-row justify-between border dark:border-primary rounded-lg bg-white dark:bg-darkColor"
                            >
                                <Text className="text-md font-semibold text-black dark:text-white">
                                {service.service_name}
                                </Text>
                                <Text className="text-sm text-primary font-bold">
                                Price: {service.price}
                                </Text>
                            </View>
                            ))
                        )}
                        </View>
                    )}

                    {serviceHistory === undefined && <View>
                      <Text className='text-md text-dark dark:text-white'>No service history available</Text>    
                    </View>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default BikeDetails;

const styles = StyleSheet.create({});
