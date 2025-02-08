import { StyleSheet, Text, View, FlatList, ActivityIndicator, useColorScheme, TouchableOpacity, Alert  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStripe } from "@stripe/stripe-react-native";
import { CustomModel, Header } from '@/components';
import React, { useCallback, useEffect, useState } from 'react';
import { COLORS } from '@/constants/constants';
import { fetchBookingsData, fetchPayementMethod } from '@/api/api';
import { useFocusEffect } from 'expo-router';

interface BookingProps {
  _id: string;
  totalPrice: number;
  bookingDate: string;
  paymentStatus: string;
}

const Wallet = () => {
  const colorScheme = useColorScheme();
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchWalletData = async () => {
        setLoading(true);
        const response = await fetchBookingsData();
        if (response.status === 'Success') {
          setBookings(response.bookings);
        }
        setLoading(false);
      };
  
      fetchWalletData();
    }, [])
  );
  

  
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } 
  };

  const handlePayment = async(orderId: string, totalPrice: number) => {
    await openPaymentSheet();
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      status,
    } = await fetchPayementMethod(totalPrice.toString(), orderId);

    if (status === 'Success') {
      setShowSuccessModal(true);
      const updatedData = await fetchBookingsData();
      if (updatedData.status === 'Success') {
        setBookings(updatedData.booking);
      }
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    }

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Ali",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Ali',
      }
    });

    if (error) {
      console.error("Payment Sheet initialization failed:", error.message);
      Alert.alert("Error", "Failed to initialize payment sheet.");
      return;
    }
    
  };

  const renderBookingItem = ({ item }: { item: BookingProps }) => {
    return (
      <View className="bg-white dark:bg-darkColor shadow-md rounded-lg p-4 mb-4 border border-gray-300 dark:border-gray-600">
        <Text className="text-lg font-bold text-gray-900 dark:text-blue-300">
          Order ID: {item._id.slice(-6)}
        </Text>
        <Text className="text-gray-600 dark:text-white">
          Date: {new Date(item.bookingDate).toLocaleDateString()}
        </Text>
        <Text className="text-gray-600 dark:text-white">
          Total Price: <Text className="font-bold text-blue-500">${item.totalPrice}</Text>
        </Text>
        <Text className={`font-bold ${item.paymentStatus === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>
          {item.paymentStatus}
        </Text>

        {item.paymentStatus === 'Pending' && (
          <TouchableOpacity 
            className="mt-4 bg-blue-500 dark:bg-blue-400 py-2 px-4 rounded-lg shadow-md"
            onPress={() => handlePayment(item._id, item.totalPrice)}
          >
            <Text className="text-white font-bold text-center">Pay Now</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? "bg-dark" : "bg-white"}`}>
      <Header title="Wallet" subTitle="Here is your wallet!" />

      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size={50} color={COLORS.primary} />
        </View>
      ) : (
         <>
          {bookings?.length > 0 ? (
            <FlatList
              data={bookings}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ padding: 16 }}
              showsVerticalScrollIndicator={false}
              renderItem={renderBookingItem}
            />
          ): (
            <View className="flex-1 justify-center items-center px-6">
              <Text className={`text-lg font-bold ${colorScheme === 'dark' ? "text-white" : "text-gray-800"}`}>
                No orders found!
              </Text>
            </View>
          )}
         </>
      )}

      <CustomModel visible={showSuccessModal} onClose={() => setShowSuccessModal(false)} title='Success!' description='Your payment was successful. Thank you for choosing us!' animationSource={require('../../assets/animations/success.json')} />
    </SafeAreaView>
  );
};

export default Wallet;

const styles = StyleSheet.create({});
