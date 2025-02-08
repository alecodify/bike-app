import { StyleSheet, Text, View, Image, useColorScheme } from 'react-native'
import React from 'react'

interface Services {
    _id: string,
    service_name: string,
    description: string,
    price: number,
    imageUrl: string,
}

interface ServicesCardProps {
    service: Services,
}

const ServiceCard: React.FC<ServicesCardProps> = ({ service }) => {
    const colorSchema = useColorScheme();

  return (
    <View className={`p-4 rounded-lg shadow-md mb-4 ${colorSchema === 'dark' ? 'bg-darkColor' : 'bg-gray'}`}>
      
      <Image
        source={{ uri: service.imageUrl }}
        style={{ backgroundColor: 'transparent' }}
        className="w-full h-28 rounded-md"
        resizeMode="contain"
      />

      <Text className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">{service.service_name}</Text>
      <Text className="text-gray-600 mt-1 dark:text-white">{service.description}</Text>
    </View>
  )
}

export default ServiceCard

const styles = StyleSheet.create({})