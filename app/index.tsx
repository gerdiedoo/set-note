import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Calendar} from "@/components/Calendar"
import {CustomCalendar} from "@/components/CustomCalendar"
import {PlayButton} from "@/components/PlayButton"
const playSize = 12.5;
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <CustomCalendar/>
      </View>
      <View style={styles.middle}>
        <Text style={styles.workoutName}>
          today's workout
        </Text>
        <View style={styles.etaContainer}>
          <View style={{
            height:50,
            width:70,
          }}>
            <Text style ={{
              fontSize:13,
              color: '#EBDBB2',
            }}>
              estimated time to complete
            </Text>
          </View>
          <View style={{
            backgroundColor: '#FFFFFF',
            width: 3,
            height: 50,
          }}>
          </View>
          <View style={{
            height:50,
            width:80,
            marginLeft:10,
          }}>
            <Text style ={{
              fontSize:20,
              color: '#EBDBB2',
            }}>
              1 hour
              30 mins
            </Text>
          </View>  
        </View>
        <View style={styles.startButton}> 
          <View style={styles.rightTriangle}/>
        </View>
          {/*<PlayButton playSize={playSize}/>*/}
      </View>
      <View style={styles.bottom}>
        
      </View>
    </View>
  );
}
 // <TouchableOpacity style = {styles.buttonTest} onPress={() => router.push("/test")}>
 //          <Text> 
 //          go to test screen test
 //          </Text>
 //        </TouchableOpacity>
const styles = StyleSheet.create({
  buttonTest:{
    padding: 10,
    borderWidth:2,
    borderRadius:10,
    backgroundColor: '#282828',
  },
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: '#282828',
    // padding: 20,
    // margin: 10,
  },
  workoutName: {
    position: 'absolute',
    top: 10,
    left:10,
    fontSize:12,
    color: '#EBDBB2',
  },
  etaContainer:{
    flexDirection: 'row',
    position: 'absolute',
    bottom:10,
    left:10,
    bacgroundColor: 'red',
  },
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
    borderTopWidth: playSize,
    borderBottomWidth: playSize,
    borderLeftWidth: playSize*1.7,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#FBF1C7',
  },
  top: {
    flex: 0.35,
    justifyContent: 'center',
    backgroundColor: '#1D2021',
    // borderWidth: 5,
    // paddingTop: 20,
    // paddingBottom: 20,
    marginTop: 70,
    marginLeft: 10,
    marginRight:10,
    // marginBottom:10,
    borderRadius: 10,
  },
  middle: {
    flex: 0.13,
    backgroundColor: '#1D2021',
    borderRadius: 10,
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    // marginBottom:10,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: '#1D2021',
    // borderWidth: 5,
    borderRadius: 10,
    margin:10,
  },
});



