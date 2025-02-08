import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/constants';
import { Header } from '@/components';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const Chatbot = () => {
  const colorScheme = useColorScheme();
  const [userInput, setUserInput] = useState('');
  const [chatResponses, setChatResponses] = useState([]);

  const handleSend = async()=>{
    if (!userInput) return;

    const userMessage: Message = { role: 'user', content: userInput };
    setChatResponses((prev) => [...prev, userMessage]);
  
    setUserInput('');
  
    const botResponse = 'Yes! Here implement the bot chat';
    const botMessage: Message = { role: 'assistant', content: botResponse };
    setChatResponses((prev) => [...prev, botMessage]);
  }

  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <Header title='Chat Bot' subTitle='Talk with our chat bot.' />
        
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingTop: 4, paddingBottom: 10}}>
            {chatResponses.map((msg: Message, index) => (
                <View key={index} style={msg.role === 'user' ? styles.userMessage : styles.botMessage}>
                    <Text className={`${msg.role === 'user' ? "text-white" : "text-dark"}`}>{msg.content}</Text>
                </View>
            ))}
        </ScrollView>

        <View className='flex-row items-center p-4 px-6 border-t-2 border-t-gray gap-2'>
            <TextInput value={userInput} onChangeText={setUserInput} placeholder='Type your message...' placeholderTextColor={colorScheme === 'dark' ? COLORS.white : COLORS.dark} className={`flex-1 border-gray border-2 text-dark dark:text-white rounded-md p-4`} />
            <TouchableOpacity onPress={handleSend}>
                <Feather name='arrow-right-circle' size={25} color={colorScheme === 'dark' ? COLORS.white : COLORS.dark}  />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default Chatbot

const styles = StyleSheet.create({
    userMessage: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    
    botMessage: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.lightGray,
        padding: 10,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
    },
})