import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface NumberPickerProps {
  min: number;
  max: number;
  onValueChange: (value: number) => void;
}

export const NumberPicker: React.FC<NumberPickerProps> = ({ min, max, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<number>((min + max) / 2);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const value = Math.round(offsetY / 40) + min; // Assuming each number has a height of 40
    if (value >= min && value <= max) {
      setSelectedValue(value);
      onValueChange(value);
    }
  };

  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }

  const renderNumber = (number: number, index: number) => {
    const isMiddle = number === selectedValue;
    return (
      <View key={index} style={[styles.numberContainer, isMiddle && styles.middleNumber]}>
        <Text style={[styles.number, isMiddle && styles.middleNumberText]}>{number}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ 
        position: "absolute", 
        top: 45,
        width: 20, 
        height: 3, 
        backgroundColor: '#FFFFFF'
      }} />
      <View style={{ 
        position: "absolute", 
        bottom: 45,
        width: 20, 
        height: 3, 
        backgroundColor: '#FFFFFF'
      }} />
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        snapToInterval={40} // Assuming each number has a height of 40
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.spacer} />
        {numbers.map(renderNumber)}
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 40,
    // backgroundColor: 'black',
    alignItems: 'center',
    transform: [{ scale: 0.8 }],
  },
  numberContainer: {
    height: 40,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: '#FFFFFF',
    fontSize: 24,
    opacity: 0.3,
    transform: [{ scale: 0.65 }],
  },
  middleNumber: {
    color: '#FFFFFF',
    transform: [{ scale: 1.5 }],
  },
  middleNumberText: {
    fontSize: 24,
    opacity: 1,
    fontWeight: 'bold',
  },
  spacer: {
    height: 50, // Add spacing before and after the numbers
  },
});

