import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import { COLORS } from '@/constants/constants'
import { BikeCard, CustomModel, Header } from '@/components'
import { fetchUserBikesData } from '@/api/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Bike {
    _id: string;
    bike_name: string;
    bike_company_name: string;
    bike_model: string;
    bike_registration_number: string;
}

const Mybikes = () => {
    const colorSchema = useColorScheme();
    const [bikes, setBikes] = useState([]);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserBikes();
    },[]);

    const fetchUserBikes = async () => {
        const userData: any = await AsyncStorage.getItem('user');
        const { _id } = JSON.parse(userData);
        const response = await fetchUserBikesData(_id);
        if (response.status === 'Success') {
            setBikes(response.bikes);
            setLoading(false);
            setRefreshing(false);
        }
    }    

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchUserBikes();
        setRefreshing(false);
    }
 
    const renderBikeItem = ({ item }: { item: Bike }) => (
        <BikeCard bike={item} onDelete={bikeId => {
            setBikes(prev => prev.filter((bike: Bike) => bike._id !== bikeId))
        }} />
    )

  return (
    <SafeAreaView className={`flex-1 ${colorSchema === 'dark' ? "bg-dark" : "bg-white"}`}>
      <Header title='My Bikes' subTitle='Here your all bike list!' />
      
      <View className="absolute top-4 right-4 z-10">
          <TouchableOpacity onPress={() => router.navigate('/(screens)/addbike')} className="p-2 rounded-full bg-black/20 dark:bg-white/20">
            <Feather name="plus" size={30} color={colorSchema === 'dark' ? COLORS.white : COLORS.dark}  />
          </TouchableOpacity>
      </View>

      <View className='flex-1 p-2'>
        {loading ? (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size={50} color={COLORS.primary} />
            </View>
        ) : (
            <FlatList 
              data={bikes} 
              contentContainerStyle={{flexGrow: 1}}
              renderItem={renderBikeItem}
              keyExtractor={item => item?._id}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              ListEmptyComponent={
                <View className="flex-1 justify-center items-center">
                    <Text className="text-lg text-gray-700 dark:text-white">
                        No Bikes Available
                    </Text>
                </View>
              }
            
            />
        )}
      </View>

      <CustomModel visible={showErrorModal} onClose={() => setShowErrorModal(false)} title='Error' description='Error fetching user data. Please try again later.' animationSource={require('../../assets/animations/error.json')} />
    </SafeAreaView>
  )
}

export default Mybikes

const styles = StyleSheet.create({})