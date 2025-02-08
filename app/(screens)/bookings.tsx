import { StyleSheet, Text, View, FlatList, ActivityIndicator, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookingCard, Header } from '@/components';
import { fetchBookingsData } from '@/api/api';
import { COLORS } from '@/constants/constants';

interface BookingProps {
  _id: string;
  bookingDate: string;
  paymentStatus: string;
  services: { service_name: string; description: string }[];
}

const Bookings = () => {
  const colorScheme = useColorScheme();
  const [bookings, setBookings] = useState<BookingProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetchBookingsData();
      if (response.status === 'Success') {
        setBookings(response.bookings);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  const renderBookingItem = ({ item }: { item: BookingProps }) => {
    return <BookingCard booking={item} onDelete={bookingId => {
      setBookings(prev => prev.filter((booking: BookingProps) => booking._id !== bookingId))
  }} />;
  };

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      <Header title="My Bookings" subTitle="Here are all your service bookings!" />

      {loading ? (
        <View className='flex-1 justify-center items-center'>
          <ActivityIndicator size={50} color={COLORS.primary} />
        </View>
      ) : (
        <>
         {bookings.length > 0 ? (
          <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={renderBookingItem}
        />
         ): (
          <View className="flex-1 justify-center items-center px-6">
            <Text className={`text-lg font-bold ${colorScheme === 'dark' ? "text-white" : "text-dark"}`}>
              No Booking yet!
            </Text>
          </View>
         )}
        </>
      )}
    </SafeAreaView>
  );
};

export default Bookings;

const styles = StyleSheet.create({});