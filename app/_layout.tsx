import { Stack } from "expo-router";
import { View, Text } from 'react-native';
import { store, persistor } from "@/store";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
  <GestureHandlerRootView>
    <Provider store={store}>
      <PersistGate loading={<Text>Loading</Text>} persistor={persistor}>
        <View style={{flex: 1, backgroundColor: '#282828'}}>
          <Stack>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="test" options={{headerShown: false}}/>
            <Stack.Screen name="workout" options={{headerShown: false}}/>
            <Stack.Screen name="pedometer" options={{headerShown: false}}/>
            <Stack.Screen name="test2" options={{headerShown: false}}/>
          </Stack>
        </View>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
  );
}
