import React from 'react'
import { TouchableOpacity, View, } from 'react-native'
import { useRouter } from 'expo-router'


export function HomeButton () {
  const router = useRouter();
  return (
    
    <TouchableOpacity style={{
      position: 'absolute',
      right: 0,
      width: 25,
      height:25,
      borderRadius: 100,
      marginRight:20,
      marginTop: 5,
      backgroundColor: '#928374',
      justifyContent: 'center',
      alignItems: 'center',
    }}
      onPress={() => router.push("/")}
    >
      <View style={{
        position: 'absolute',
        width:2.5,
        height:15,
        transform: [{rotate: '-45deg'}],
        backgroundColor: 'black'
      }}/>
      <View style={{
        position: 'absolute',
        width:2.5,
        height:15,
        transform: [{rotate: '45deg'}],
        backgroundColor: 'black'
      }}/>
    </TouchableOpacity>

  )
}

