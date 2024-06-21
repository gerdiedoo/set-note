import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import PieChart from '@/components/PieChart';

const containerWidth = 166;
const containerHeight = 90;

const data = [
  { label: 'progress', value: 30, color: '#FE8019' },
  { label: 'goal', value: 70, color: '#EBDBB2' },
];

export function GoalGraph({goalName=""}) {
  return(
    <View style={styles.container}>
      <View style={styles.goalContainer}>
        <View style={styles.pieOuterGraph}>
          <PieChart data={data} size={50} />
          <View style={styles.pieInnerGraph}>
          </View>
        </View>
      </View>
      <View style={{
        marginLeft: -5,
      }}>
        <Text style={{
          color: '#EBDBB2',

        }}> {goalName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: containerWidth,
    height: containerHeight,
    // backgroundColor: '#3C3836',
    justifyContent: 'center',
    alignItems: 'center',
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
    position: 'absolute',
    width:45,
    height:45,
    borderRadius: 100,
    backgroundColor: '#3C3836',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

 
