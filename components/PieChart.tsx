import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Text } from 'react-native-svg';

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  strokeWidth?: number;
  style?: object;
}

const PieChart: React.FC<PieChartProps> = ({ data, size = 200, strokeWidth = 0, style }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativeValue = 0;

  return (
    <View style={style}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          {data.map((item, index) => {
            const [startX, startY] = polarToCartesian(cumulativeValue, total, size / 2);
            cumulativeValue += item.value;
            const [endX, endY] = polarToCartesian(cumulativeValue, total, size / 2);
            const largeArcFlag = item.value > total / 2 ? 1 : 0;

            return (
              <Path
                key={`slice-${index}`}
                d={`M${size / 2},${size / 2} L${startX},${startY} A${size / 2 - strokeWidth},${size / 2 - strokeWidth} 0 ${largeArcFlag} 1 ${endX},${endY} z`}
                fill={item.color}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

const polarToCartesian = (value: number, total: number, radius: number) => {
  const angle = (2 * Math.PI * value) / total - Math.PI / 2;
  return [radius + radius * Math.cos(angle), radius + radius * Math.sin(angle)];
};

export default PieChart;

