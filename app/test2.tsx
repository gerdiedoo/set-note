import React, { useEffect,useState } from "react";
import { View, Text, PermissionsAndroid, Alert, Button } from "react-native";
import {Pedometer} from 'expo-sensors'
export default function Test2() { 
  const requestActivityPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Start walking");
      } else {
        Alert.alert("permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      // const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      // if (pastStepCountResult) {
      //   setPastStepCount(pastStepCountResult.steps);
      // }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);
  // useEffect(() => {
  //   let subscription:any;
  //   const subscribeAndStore = async () => {
  //     subscription = await subscribe();
  //   };
  //
  //   subscribeAndStore();
  //
  //   return () => {
  //     if (subscription) {
  //       subscription.remove();
  //     }
  //   };
  // }, []);
  return ( 
    <View style={{flex:1,justifyContent: 'center',alignItems: 'center',}}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
      <Button title="Request Permission" onPress={requestActivityPermission} />
    </View>
  ); 
}


