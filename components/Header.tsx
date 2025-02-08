import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { COLORS } from '@/constants/constants';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react'

interface HeaderProps {
    title: string,
    subTitle: string,
}

const Header: React.FC<HeaderProps> = ({ title, subTitle }) => {
    const colorScheme = useColorScheme();

  return (
    <>
       <View className="absolute top-4 left-4 z-10">
            <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-black/20 dark:bg-white/20">
                <Feather name="chevron-left" size={30} color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}  />
            </TouchableOpacity>
        </View>
      
        <View className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-lg`}>
            <Text className={`text-2xl font-bold text-center ${colorScheme === 'dark' ? "text-white" : "text-dark"}`}>{title}</Text>
            <Text className={`text-lg text-gray-600 text-center ${colorScheme === 'dark' ? "text-white" : "text-dark"}`}>{subTitle}</Text>
        </View>
    </>
  )
}

export default Header

const styles = StyleSheet.create({})