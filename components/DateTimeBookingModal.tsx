import { Modal, View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useCallback } from 'react';
import { Picker } from '@react-native-picker/picker';
import { fetchUserBikesData } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingAnimation from '../assets/animations/booking.json';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from 'expo-router';

interface Bike {
  _id: string;
  bike_name: string;
  bike_registration_number: string;
  user: string;
}

interface DateTimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (bookingTimeData: Date, selectedBike: any) => void;
}

const DateTimeBookingModal: React.FC<DateTimePickerModalProps> = ({ visible, onClose, onConfirm}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  
  useFocusEffect(
    useCallback(() => {
      const fetchBikes = async () => {
        const userData: any = await AsyncStorage.getItem('user');
        const { _id } = JSON.parse(userData);
        const response = await fetchUserBikesData(_id);
        if (response.status === 'Success') {
          setBikes(response.bikes);
          setSelectedBike(response.bikes[0]); 
        }
      };
      fetchBikes();
  }, []))

  const handleConfirm = async() => {
    const combinedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds() 
    );

    onConfirm(combinedDateTime, selectedBike);
    setDate(new Date());
    setTime(new Date());
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-black/60">
        <View className="bg-white p-5 rounded-lg w-[85%]">
        <LottieView source={BookingAnimation} autoPlay loop style={{width: "50%", margin: 'auto', height: 100, marginBottom: 4}} />

        <View className="w-[100%] mx-20 justify-center items-center">
          <View style={{ width: '100%', overflow: 'hidden' }}>
            <Picker
              selectedValue={selectedBike?._id}
              onValueChange={(itemValue) => {
                const bike = bikes.find((b) => b._id === itemValue) || null;
                setSelectedBike(bike);
              }}
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "center",
                backgroundColor: "transparent",
                marginRight: 40, 
              }}
              mode="dropdown"
              dropdownIconColor={'white'} 
            >
              {bikes.map((bike) => (
                <Picker.Item
                  key={bike._id}
                  label={`${bike.bike_name} (${bike.bike_registration_number})`}
                  value={bike._id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity className="px-4 py-2 bg-gray-300 rounded mb-3" onPress={() => setShowDatePicker(true)}>
            <Text className="text-center">{date.toDateString()}</Text>
        </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            />
          )}

          <TouchableOpacity className="px-4 py-2 bg-gray-300 rounded mb-3" onPress={() => setShowTimePicker(true)}>
            <Text className="text-center">{time.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowTimePicker(false);
                if (selectedTime) {
                  setTime(selectedTime);
                }
              }}
            />
          )}

          <View className="flex-row justify-between">
            <TouchableOpacity className="px-4 py-2 bg-red-500 rounded" onPress={onClose}>
              <Text className="text-white">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity className="px-4 py-2 bg-green-500 rounded" onPress={handleConfirm}>
              <Text className="text-white">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>        
    </Modal>
  );
};

export default DateTimeBookingModal;
