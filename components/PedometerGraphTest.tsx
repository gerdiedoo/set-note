import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const containerHeight=205;
const containerWidth=240;

const transformArray = (firstArray: number[], scalingFactor: number): number[] => {
  if (firstArray.length === 0) return [];

  const maxVal = Math.max(...firstArray);
  if (maxVal === 0) return Array(firstArray.length).fill(0);

  return firstArray.map(num => (num / maxVal) * scalingFactor);
};

export function PedometerGraphTest({}) {
  // temporary, change it so that the date is included
  const latestStats = [  230,340,50,120,220,230,340,50,120,220,230,340,50,160,170,120,390,190,110,120,230 ];
  // const maxSteps = Math.max(...latestStats);
  const temp = transformArray(latestStats, containerHeight-30);
  const bars =[]
  //pre-process based on the height of the container
  for(let i = 0 ; i < latestStats.length ; i++){
    bars.push(
      // temporary fix, make it so that this will check if it is the current day
      <View key={`current-${i}`} style={[styles.bar,{
        height: temp[i],
        backgroundColor: i+1 === latestStats.length ? '#FE8019' : '#EBDBB2',
      }]}/>
    );
  }
      // <View style={styles.bar}/>
  // console.log(bars);
  return(
    <View style={styles.container}>
      <View style={styles.barContainer}> 
        {bars}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // transform: [{ scale: 0.85 }], // Scale down the entire calendar
    marginTop: 10,
    width : containerWidth,
    height: containerHeight,
    backgroundColor: '#3C3836',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barContainer:{
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bar: {
    width: 5,
    // height: 100,
    marginLeft:5,
    marginRight:5,
    borderRadius: 10,
  },
});
