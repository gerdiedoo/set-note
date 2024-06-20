import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'

const containerWidth = 166;
const containerHeight = 90;


export function GoalGraph({}) {
  
  return(
    <View style={styles.container}>
      <View style={styles.goalContainer}>
        <View style={styles.pieOuterGraph}>
          <View style={styles.pieInnerGraph}>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: containerWidth,
    height: containerHeight,
    // backgroundColor: '#3C3836',
  },
  goalContainer:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pieOuterGraph:{
    width:50,
    height:50,
    backgroundColor: '#EBDBB2',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieInnerGraph:{
    width:45,
    height:45,
    borderRadius: 100,
    backgroundColor: '#3C3836',
  },

});

 
