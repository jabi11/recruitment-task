import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, Button } from "react-native";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import { OpenWeatherMapResponse, fetchForecast } from "../api";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen() {
    const insets: EdgeInsets = useSafeAreaInsets()
    const {lat, long} = useLocalSearchParams()
    const [weather, setWeather] = useState<OpenWeatherMapResponse>()

    useFocusEffect(
        useCallback(() => {
      
          const fetchWeather = async () => {
            try {
              const weather = await fetchForecast(Number(lat), Number(long))
              setWeather(weather)
            } catch (e) {
                alert("fetch failed")
            }
          };
      
          fetchWeather();
      
        }, [lat, long])
      );

    const saveFavourite = async () => {
        try {
            if(weather?.name){
                await AsyncStorage.setItem('city', weather.name);
                alert("Favourite city saved")
            }
        } catch (e) {
            alert("Error while saving city")
        }
    }

    return (
        <View style={{
                    paddingBottom: insets.bottom,
                    paddingLeft: insets.left,
                    paddingRight: insets.right
        }}>
            <Text>Temp: {weather?.main.temp} Celsius</Text>
            <Text>Description:
            {weather?.weather.map(({id, description}) => <Text key={id}>{description}</Text>)}
            </Text>
            <Button title="Save this city as favourite" onPress={saveFavourite}/>
        </View>
    )
}