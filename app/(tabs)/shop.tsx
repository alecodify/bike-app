import { StyleSheet, Text, TouchableOpacity, useColorScheme, View, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomModel, DateTimeBookingModal, Header } from '@/components';
import React, { useEffect, useState } from 'react';
import { fetchBookingsData, fetchCreateBookingData, fetchServicesData } from '@/api/api';

interface ServicesProps {
  _id: string;
  service_name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Shop = () => {
  const colorScheme = useColorScheme();
  const [services, setServices] = useState<ServicesProps[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModal1, setShowErrorModal1] = useState(false);
  
  const serviceData = async () => {
    const response = await fetchServicesData();
    if (response.status === 'Success') {
      setServices(response.services);
    }
  };

  useEffect(() => {
    serviceData();
  }, []);

  const toggleSelection = (serviceId: string) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(serviceId)) {
        return prevSelectedServices.filter((id) => id !== serviceId);
      }
      return [...prevSelectedServices, serviceId];
    });
  };

  const totalPrice = selectedServices.reduce((total, serviceId) => {
    const service = services.find((s) => s._id === serviceId);
    return total + (service ? service.price : 0);
  }, 0);

  const onConfirm = async (bookingTimeDate: Date, bike: any) => {
     const { _id, user } = bike;
     const data = {
       user,
       bikeId: _id,
       bookingDate: bookingTimeDate,
       totalPrice,
       services: selectedServices,
     }

     const response = await fetchCreateBookingData(data);
     if (response.status === 'Success') {
       setShowSuccessModal(true);
       setSelectedServices([]);
       await fetchBookingsData();
       setTimeout(() => {
        setShowSuccessModal(false);
       }, 3000);
     } else if (response.status === 'Failed') {
      setShowErrorModal1(true);
      setErrorText(response.message);
      setSelectedServices([]);
      setTimeout(() => {
        setShowErrorModal1(false);
      }, 3000);
     } else {
      setShowErrorModal1(true);
      setTimeout(() => {
        setShowErrorModal1(false);
      }, 2000);
     }
  }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      <Header title="Shop" subTitle="Here are all our bike services!" />

      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isSelected = selectedServices.includes(item._id);

          return (
            <View className="border-b dark:border-b-primary p-4 px-10" key={item._id}>
              <Text className={`text-xl font-semibold ${colorScheme === 'dark' ? 'text-white' : 'text-dark'}`}>
                {item.service_name} - <Text className="text-green-500 dark:text-blue-300">{item.price}</Text>/Pkr
              </Text>
              <Text className={`text-base ${colorScheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>
                {item.description}
              </Text>

              <TouchableOpacity
                className={`mt-4 px-4 py-2 ${isSelected ? 'bg-red-500' : 'bg-blue-500'} rounded`}
                onPress={() => toggleSelection(item._id)}
              >
                <Text className="text-white text-center">
                  {isSelected ? 'Remove from Booking' : 'Add to Booking'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <View className="p-4 px-10">
        <Text className={`text-xl font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-dark'}`}>
          Total Price: {totalPrice.toFixed(2)} Pkr
        </Text>

      
        <TouchableOpacity
          className={`mt-4 px-6 py-3 rounded bg-blue-500`}
          onPress={() => setShowDateTimePicker(true)}
          disabled={selectedServices.length === 0}
        >
          <Text className="text-white text-center">Select Service, Time & Date</Text>
        </TouchableOpacity>
      </View>

      <DateTimeBookingModal visible={showDateTimePicker} onClose={() => setShowDateTimePicker(false)} onConfirm={onConfirm}   />
      <CustomModel visible={showSuccessModal} title="Success!" description='Your booking completed successfully. Please reach on time that you are selected.' onClose={() => {setShowSuccessModal(false)}} animationSource={require('../../assets/animations/success.json')} />
      <CustomModel visible={showErrorModal1} title="Not Available!" description={errorText} onClose={() => {setShowErrorModal1(false)}} animationSource={require('../../assets/animations/error.json')} />
      <CustomModel visible={showErrorModal} title="Booking Failure!" description='Something went wrong. Please try again later.' onClose={() => {setShowErrorModal(false)}} animationSource={require('../../assets/animations/error.json')} />
                        
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({});
