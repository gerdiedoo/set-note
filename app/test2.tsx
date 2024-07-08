// import { useRouter } from "expo-router"; 
import React, { useEffect,useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet,TextInput } from "react-native";
import { supabase } from "@/utils/supabase";
import Constants from "expo-constants";
import ArchProgressBar from "@/components/ArchProgressBar";
import Svg, { Path, Circle } from 'react-native-svg';

export default function Test2() { 
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev + 0.01) % 1);
    }, 1);
    return () => clearInterval(interval);
  }, []);
  return ( 
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
      <ArchProgressBar size={230} strokeWidth={12} underColor={"black"} overColor={"blue"} progress={75}/>
    </View>
  ); 
}


