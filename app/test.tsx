// import { useRouter } from "expo-router"; 
import Auth from "@/components/Auth";
import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";
// import { setUserID, clearUserID } from './userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/store/reducers/exampleReducer'; // Import your actions
import { clearUserID } from '@/store/reducers/userReducer'; // Import your actions

interface ProfileItem {
  id: number,
  name: string,
  email: string,
}

export default function Test() { 
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userID);

  const value = useSelector((state) => state.example.value);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(clearUserID())
      console.log('User signed out');
      console.log(userID);

    } catch (error) {
      console.error(error);
    }
  };
  const fetchProfiles = async () => {
    try {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
        
      if (error) {
        console.log("Error fetching profiles:");
        console.error(error.message);
        return;
      }

      console.log("Profiles:");
      console.log(JSON.stringify(profiles, null, 2));
    } catch (error) {
      console.log("Unexpected error:");
      console.error(error);
    }
  };
  
  return ( 
    <View style={styles.container}>
      <Auth/>
      <Button title="sign out" onPress={()=>signOut()}/>
      <Text>
      </Text>
      <Button title="get profiles" onPress={()=>fetchProfiles()}/>
      <Text style={{color: "#FFFFFF"}}>{value}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Text style={{color: "#FFFFFF"}}> userID:{userID} </Text>
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
