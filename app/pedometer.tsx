import { useRouter } from "expo-router"; 
import React, { useEffect,useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet,TextInput } from "react-native";
import Constants from "expo-constants";

export default function Pedometer() { 
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.pedometerContainer}>
        <View style={styles.titleContainer}>
          <Text>
            pedometer stats
          </Text>
        </View>
        
      </View>
    </View>
  ); 
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  pedometerContainer: {
    flex: 1,
    backgroundColor: '#282828',
  },
  titleContainer: {
    marginTop: Constants.statusBarHeight,
    marginLeft:10,
    width: "100%",
  },
  workoutContainer: {
    flex:0.5,
    backgroundColor: '#1D2021',
    marginTop:10,
    borderRadius: 10,
  },
  warmupText:{
    flexDirection: 'row',   
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  workoutText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  warmupName:{
    color: "#FBF1C7"
  },
  warmupBar: {
    width: '95%',
    padding: 10,
    backgroundColor: '#3C3836',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  removeButton: {
    backgroundColor: '#ff0000',
    // padding: 5,
    borderRadius: 5,
    width:20,
    height:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FBF1C7',
    fontSize: 16,
  },
  scrollView: {
    width: '100%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(40,40,40,0.89)',
  },
  modalContent: {
    width: '85%',
    // height: '50%',
    backgroundColor: '#1D2021',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top:10,
    left:20,
    // marginBottom: 15,
    color: "#FBF1C7"
  },
  input: {
    width: '65%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // padding: 10,
    marginBottom: 48,
    marginTop: 35,
    // marginLeft: 6,
    color: "#FBF1C7",
    // backgroundColor: "#FBF1C7",
  },
  modalButtons: {
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
  },
  modalButton: {
    width: 90,
    height: 40,
    backgroundColor: '#3C3836',
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#CC241D',
  },
});
