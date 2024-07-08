import { useRouter } from "expo-router"; 
import React, { useEffect,useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet,TextInput } from "react-native";
import Constants from "expo-constants";
import { HomeButton } from "@/components/HomeButton"
import ArchProgressBar from "@/components/ArchProgressBar";
import CircleProgressBar from "@/components/CircleProgressBar";

export default function Pedometer() { 
  const router = useRouter();
  const data = [];
  const weekdays = ["mo", "tu", "we", "th", "fr", "sa", "su"];
  for (let i = 0; i < 7; i++) {
    data.push(
      <View style={{alignItems: 'center', justifyContent: 'center',}}>
        <CircleProgressBar
          size={30} 
          strokeWidth={5} 
          underColor={"#FE8019"} 
          overColor={"#98971A"} 
          progress={i+1*10}
        />
        <Text style={{marginLeft: -5,color:"#EBDBB2"}}> {weekdays[i]}</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.pedometerContainer}>
        <View style={styles.titleContainer}>
          <Text style={{color: '#EBDBB2'}}>
            pedometer stats
          </Text>
          {/*temporary fix*/}
          <Text style={{color: "rgba(0,0,0,0)"}}>
          test
          </Text>
          <HomeButton/>
        </View>
        <View style ={styles.workoutContainer}>
          <View style={{flex:0.5,  alignItems: 'center',}}>
            <View style={{
              flex:1,   
              justifyContent: 'center', 
              alignItems: 'center',
              marginTop: 20,
              }}>
              <ArchProgressBar 
                size={230} 
                strokeWidth={12} 
                underColor={"#FE8019"} 
                overColor={"#98971A"} 
                progress={75}
              /> 
              <View style={{
                position: 'absolute',
                alignItems: 'center',
              }}>
                <Text style={{color: "#EBDBB2", fontSize: 35,}}>
                  5000
                </Text>
                <Text style={{color: "#EBDBB2", fontSize: 20,}}>
                  steps
                </Text>
              </View>
            </View>
            <View style={{
              width: "70%",
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <View style={{
              flexDirection:'column',
              alignItems: 'center',
              }}>
                <Text style={{color: "#EBDBB2"}}>
                99
                </Text>
                <Text style={{color: "#EBDBB2"}}>
                kcal
                </Text>
              </View>
              <View style={{
              flexDirection:'column',
              alignItems: 'center',
              }}>
                <Text style={{color: "#EBDBB2"}}>
                99
                </Text>
                <Text style={{color: "#EBDBB2"}}>
                dist
                </Text>
              </View>
              <View style={{
              flexDirection:'column',
              alignItems: 'center',
              }}>
                <Text style={{color: "#EBDBB2"}}>
                99
                </Text>
                <Text style={{color: "#EBDBB2"}}>
                mins
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20,width:300,height:1, backgroundColor: "#FBF1C7"}}/>
          </View>
          <View style={{
            flex:0.15,
            backgroundColor: "#3C3836",
            marginTop: 20,
            marginLeft:10,
            marginRight:10,
            marginBottom:10,
            borderRadius: 15,
          }}>
            <Text style={{
              position: 'absolute',
              top: 10,
              left: 10,
              color: "#EBDBB2"}}>
              weekly goals
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop:25,
            }}>
            {data.map((item, itemIndex) =>(
              <View key={itemIndex}>
                  {item}  
              </View>
            ))}
              
            </View>
          </View>
          <View style={{
            flex:0.2,
            backgroundColor: "#3C3836",
            marginTop: 10,
            marginLeft:10,
            marginRight:10,
            marginBottom:10,
            borderRadius: 15,
          }}>
          </View>
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
    marginLeft: 10,
    marginRight:10,
  },
  titleContainer: {
    marginTop: Constants.statusBarHeight,
    marginLeft:10,
    width: "100%",
  },
  workoutContainer: {
    // flex:0.8,
    // backgroundColor: '#1D2021',
    // marginTop:10,
    // borderRadius: 10,
    // workoutContainer: {
    flex:0.97,
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
