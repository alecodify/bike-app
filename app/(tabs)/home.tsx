import {  FlatList, Image, ScrollView, StatusBar, Text, TextInput,  TouchableOpacity, useColorScheme, View, VirtualizedList } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { COLORS } from "@/constants/constants";
import { router } from 'expo-router';
import { fetchServicesData, fetchUserData } from '@/api/api';
import { ServiceCard } from '@/components';

interface ServicesProps {
  _id: string,
  service_name: string,
  description: string,
  price: number,
  imageUrl: string,
}

const Home = () => {
  const colorSchema = useColorScheme();
  const [services, setServices] = useState<ServicesProps[]>([]);
  const [allServices, setAllServices] = useState<ServicesProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState('');
  const [name, setName] = useState(''); 
  const [role, setRole] = useState(''); 
  const [searchBorderColor, setSearchBorderColor] = useState(COLORS.lightGray);

  useEffect(() => {
    const statusBarColor = colorSchema === 'dark' ? '#000' : '#fff';
    StatusBar.setBackgroundColor(statusBarColor);
    StatusBar.setBarStyle(colorSchema === 'dark' ? 'light-content' : 'dark-content');
    userData();
    serviceData();
  }, [colorSchema]);

  const userData = async () => {
    const response = await fetchUserData();
   
    if (response.status === "Success") {
      setName(response.user.full_name);
      setRole(response.user.role);
      setImage(response.user.imageUrl);
    }
  }

  const serviceData = async() => {
    const response = await fetchServicesData();
    if (response.status === "Success") {
      setServices(response.services);
      setAllServices(response.services);
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setServices(allServices);
    } else {
      const filtered = allServices.filter(service =>
        service.service_name.toLowerCase().includes(query.toLowerCase())
      );
      setServices(filtered); 
    }
  };

  const renderServiceItem = ({ item }: { item: ServicesProps }) => (
    <ServiceCard service={item} />  
  )

  return (
    <SafeAreaView className={`flex-1 ${colorSchema === 'dark' ? "bg-black" : "bg-white"}`}>
      <View style={{ paddingVertical: 20 }}>
        
        <View className="flex flex-row justify-between items-center px-6 mb-4">
          <View>
            <Text className={`text-md font-rubik-bold ${colorSchema === 'dark' ? "text-white" : "text-gray-800"}`}>
              Hello, <Text className="text-blue-300">{name} ({role})</Text>
            </Text>
            <Text className={`text-xl font-rubik-medium ${colorSchema === 'dark' ? "text-white" : "text-dark"}`}>
              Have a Nice Day!
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.navigate('/(tabs)/profile')}>
            <View className="border-2 border-lightGray rounded-full w-12 h-12 overflow-hidden shadow-md">
              <Image 
                source={image ? { uri: image } : require('../../assets/images/google-icon.png')} 
                className="w-full h-full dark:text-white" 
                resizeMode="cover" 
              />
            </View>
          </TouchableOpacity>
        </View>

        <View className="px-6 mb-6">
          <View className={`flex-row items-center bg-gray-100 dark:bg-gray-800 border-2 rounded-md px-4 py-2 transition-all`} 
            style={{ borderColor: searchBorderColor }}>
            <Feather name="search" size={20} color={`${colorSchema === 'dark' ? COLORS.white : COLORS.dark}`} />
            <TextInput  
              className="ml-3 flex-1 text-gray-800 text-dark dark:text-white text-base"
              placeholder="Search..."
              placeholderTextColor={colorSchema === 'dark' ? COLORS.gray : COLORS.dark}
              onFocus={() => setSearchBorderColor(COLORS.primary)}
              onBlur={() => setSearchBorderColor(COLORS.lightGray)}
              onChangeText={handleSearch}
            />
          </View>
        </View>

        {services.length > 0 ? (
          <FlatList 
            data={services} 
            contentContainerStyle={{flexGrow: 1, marginHorizontal: 25, paddingBottom: 140}}
            renderItem={renderServiceItem}
            keyExtractor={item => item?._id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="flex justify-center items-center px-6">
                <Text className={`text-lg font-rubik-bold ${colorSchema === 'dark' ? "text-white" : "text-gray-800"}`}>
                  No services available!
                </Text>
              </View>
            }
                      
          />
        ): (
          <View className="flex justify-center items-center px-6">
            <Text className={`text-lg font-rubik-bold ${colorSchema === 'dark' ? "text-white" : "text-gray-800"}`}>
              No services found!
            </Text>
          </View>
        )}
        
      </View>
    </SafeAreaView>
  );
};

export default Home;
