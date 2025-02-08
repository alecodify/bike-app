import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { format } from 'date-fns';
import React, { useState } from 'react'
import { fetchBookingsData, fetchDeleteBooking } from '@/api/api';
import CustomModel from './CustomModel';

interface BookingProps {
    _id: string;
    bookingDate: string;
    paymentStatus: string;
    services: { service_name: string; description: string }[];
}

const BookingCard = ({ booking, onDelete }: { booking: BookingProps, onDelete: (id: string) => void }) => {
    const bookingDate = new Date(booking.bookingDate);
    const formattedDate = format(bookingDate, 'dd MMM yyyy');
    const formattedTime = format(bookingDate, 'hh:mm a');
    const [errorText, setErrorText] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showErrorModal1, setShowErrorModal1] = useState(false);
  
    const handleCancelBooking = async () => {
       const response = await fetchDeleteBooking(booking._id);
       if (response.status === 'Success') {
           setShowSuccessModal(true);
           await fetchBookingsData();
           setTimeout(async() => {
               setShowSuccessModal(false);
               await onDelete(booking._id);
         }, 3000);
       } else if (response.status === 'Failed') {
          setShowErrorModal1(true);
          setErrorText(response.message);
          setTimeout(() => {
              setShowErrorModal1(false);
          }, 3000);
       } else {
        setShowErrorModal(true);
        setTimeout(() => {
            setShowErrorModal(false);
        }, 2000);
       }
       
    }
  
    return (
      <View className="bg-white dark:bg-darkColor shadow-md rounded-lg p-4 mb-4">
        {booking.services.length > 0 ? (
          booking.services.map((service, index) => (
            <View key={index} className="mb-2">
              <Text className="text-xl font-bold text-gray-900 dark:text-blue-300">
                {service.service_name || 'Service'}
              </Text>
              <Text className="text-gray-600 dark:text-white">
                {service.description || 'No description available'}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-dark dark:text-white">No services booked</Text>
        )}
      
        <View className="flex-row justify-between mt-3">
          <Text className="text-dark dark:text-white">Date: {formattedDate}</Text>
          <Text className="text-dark dark:text-white">Time: {formattedTime}</Text>
          <Text
            className={`font-bold ${
              booking.paymentStatus === 'Pending' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {booking.paymentStatus}
          </Text>
        </View>
      
        <TouchableOpacity className="bg-blue-500 py-2 rounded-lg mt-3" onPress={handleCancelBooking}>
          <Text className="text-white text-center font-bold">Cancel Booking</Text>
        </TouchableOpacity>

        <CustomModel visible={showSuccessModal} title="Success!" description='Your booking canceled successfully.' onClose={() => {setShowSuccessModal(false)}} animationSource={require('../assets/animations/success.json')} />
        <CustomModel visible={showErrorModal1} title="Failed!" description={errorText} onClose={() => {setShowErrorModal1(false)}} animationSource={require('../assets/animations/alert.json')} />
        <CustomModel visible={showErrorModal} title="Failure!" description='Something went wrong. Please try again later.' onClose={() => {setShowErrorModal(false)}} animationSource={require('../assets/animations/error.json')} />
                        
      </View>
    );
}

export default BookingCard

const styles = StyleSheet.create({})