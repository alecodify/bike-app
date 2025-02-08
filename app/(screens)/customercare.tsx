import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '@/constants/constants';
import { Header } from '@/components';

const {width , height} = Dimensions.get('window');

const CustomerCare = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      <Header title='Customer Care' subTitle='Talk with our customer care!' />

      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <View className={`px-6 flex-row justify-between items-center`}>
           <View className='flex-row items-center gap-2'>
              <Ionicons name='chatbubble-ellipses-outline' size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.primary} />
              <Text className='text-lg text-dark dark:text-white'>Chat with us!</Text>
           </View>
           <TouchableOpacity onPress={() => {router.navigate('/(screens)/chatbot')}}>
             <Feather name='chevron-right' size={30} color={COLORS.primary} />
           </TouchableOpacity>
        </View>

        <View className={`flex mt-4 justify-center items-center ${colorScheme === 'dark' ? 'bg-lightDark' : 'bg-white'}`} style={styles.contactCard}>
            <View className='flex mb-2 flex-row gap-2 items-center'>
              <Feather name='phone-call' size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.primary} />
              <Text className={`text-lg font-bold text-dark dark:text-white`}>Contact Us!</Text>
            </View>
            <View className='space-y-3 gap-1'>
                <Text className='text-dark dark:text-white text-md '>Phone: +92 3206914610</Text>
                <Text className='text-dark dark:text-white text-md '>Email: chaudaryaliraza0@gmail.com</Text>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CustomerCare

const styles = StyleSheet.create({
 contactCard: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    width: width * 0.9,
    marginHorizontal: 20,
  },
})