import { useRouter } from 'expo-router';
import { Router } from 'expo-router/build/types';
import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { OpenWeatherMapGeoResponse, fetchCities } from '../api/api';
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
      <TouchableOpacity onPress={() => handleItemPress(lat, lon)} style={styles.cityItemPressable}>
        <Text>{name}</Text>
        <Text>{country}</Text>
     </TouchableOpacity>
    )
  }

  const EmptyList = () => (
    <Text>Try typing city name in box above!</Text>
  )

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
      <TextInput style={styles.textInput} placeholder="Name of city" onChangeText={handleChangeText} value={inputText}/>
      <Button title="Search" onPress={handlePress}/>
      <FlatList data={cities} renderItem={({ item }) => cityItem(item)} ListEmptyComponent={EmptyList}/>
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
  textInput: {
    width: "80%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5
  },
  cityItemPressable: {
    flexDirection: 'row',
    width: "80%",
    justifyContent: 'space-between'
  }
});
