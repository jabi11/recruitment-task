import { useRouter } from 'expo-router';
import { Router } from 'expo-router/build/types';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { OpenWeatherMapGeoResponse, fetchCities } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const insets: EdgeInsets = useSafeAreaInsets()
  const router: Router = useRouter()
  const [inputText, setInputText] = useState("")
  const [cities, setCities] = useState<[OpenWeatherMapGeoResponse]>()
  const handleChangeText: (text: string) => void = (text) => setInputText(text)
  const handleItemPress: (lat: number, long: number) => void = (lat, long) => router.push({pathname: "detail", params: {lat, long}})
  const handlePress: () => Promise<void> = async () => {
    try {
      const data = await fetchCities(inputText)
      setCities(data)
    } catch (e) {
      alert("failed to fetch " + e)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('city');
        if (value !== null) {
          setInputText(value)
        }
      } catch (e) {
        console.error(e)
      }
    };
    getData()
  }, [])

  const cityItem = (item: OpenWeatherMapGeoResponse) => {
    const {name, country, lat, lon} = item
    return (
      <TouchableOpacity onPress={() => handleItemPress(lat, lon)} style={{flexDirection: 'row', width: "80%", justifyContent: 'space-between'}}>
        <Text>{name}</Text>
        <Text>{country}</Text>
     </TouchableOpacity>
    )
  }

  return (
    <View style={[styles.container,
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
      }
    ]}>
      <Text>Check weather in your favourite city!</Text>
      <TextInput style={{width: "80%", borderColor: "black", borderWidth: 1, borderRadius: 5, padding: 5}} placeholder="Name of city" onChangeText={handleChangeText} value={inputText}/>
      <Button title="Search" onPress={handlePress}/>
      <FlatList data={cities} renderItem={({ item }) => cityItem(item)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
