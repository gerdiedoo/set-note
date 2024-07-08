import React from 'react';
import { View } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const CircleProgressBar= ({ size, strokeWidth, underColor, overColor, progress }) => {
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - (progress);

  const strokeDashoffset = circum * (1 - (progress/ 100));

  return (
    <View style={{margin: 10}}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle 
          stroke={underColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeLinecap="round"
          strokeDasharray={`${circum} ${circum}`}
          {...{strokeWidth}}
        />
        
        {/* Progress Circle */}
        <Circle 
          stroke={overColor}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          {...{strokeWidth}}
        />

        {/* Text */}
      </Svg>
    </View>
  );
};

export default CircleProgressBar;

