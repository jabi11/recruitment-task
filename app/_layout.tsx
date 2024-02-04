import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
    return(
    <SafeAreaProvider>
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
            <Stack.Screen name="detail" options={{title: "Weather"}}/>
        </Stack>
    </SafeAreaProvider>
    )
}