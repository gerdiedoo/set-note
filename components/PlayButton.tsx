import React from 'react'

import { View, Text, StyleSheet} from 'react-native'
export function PlayButton({playSize}) {
  return(
    <View style={styles.startButton}>
      <View style={[styles.righTriangle,{
        borderTopWidth: playSize,
        borderBottomWidth: playSize,
        borderLeftWidth: playSize*1.7,
      }]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  startButton:{
    width:50,
    height:50,
    position: 'absolute',
    backgroundColor: '#928374',
    bottom:20,
    right:20,
    borderRadius:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightTriangle:{
    marginLeft: 5,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FBF1C7',
  },
});
