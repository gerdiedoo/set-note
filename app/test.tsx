// import { useRouter } from "expo-router"; 
import Auth from "@/components/Auth";
import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
// import DraggableFlatList, {
//   RenderItemParams,
// } from "react-native-draggable-flatlist";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { DATABASE_URL } from "@/utils/env";
// import {DATABASE_URL} from "@env"
export default function Test() { 
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error(error);
    }
  };
  return ( 
    <View style={styles.container}>
      <Auth/>
      <Button title="sign out" onPress={()=>signOut()}/>
    </View>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
