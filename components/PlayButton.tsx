import { useRouter } from 'expo-router';
import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
export function PlayButton({playSize, location}) {
  const router = useRouter();
  return(
    <TouchableOpacity onPress={() => router.push(location)}>
      <View style={styles.startButton}>
        <View style={[styles.rightTriangle,{
          borderTopWidth: playSize,
          borderBottomWidth:  playSize,
          borderLeftWidth:  playSize*1.7,
        }]}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  startButton:{
    width:50,
    height:50,
    // position: 'absolute',
    backgroundColor: '#928374',
    // bottom:20,
    // right:20,
    borderRadius:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTriangle:{
    width:10,
    height:10,
    marginLeft: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FBF1C7',
  },
});
