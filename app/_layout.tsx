import { Stack } from "expo-router";
import {View} from 'react-native';

export default function RootLayout() {
  return (
    <View style={{flex: 1, backgroundColor: '#282828'}}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="test" options={{headerShown: false}}/>
        <Stack.Screen name="workout" options={{headerShown: false}}/>
      </Stack>
    </View>
  );
}
