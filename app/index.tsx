// import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet, TouchableOpacity} from "react-native";
// import {Calendar} from "@/components/Calendar"
import {CustomCalendar} from "@/components/CustomCalendar"
import {PlayButton} from "@/components/PlayButton"
import {PedometerGraph} from "@/components/PedometerGraph"
import {GoalGraph} from "@/components/GoalGraph"
import Constants from "expo-constants"
const playSize = 12.5;
export default function Index() {
  // const router = useRouter();
  const chips = [];
  for(let i=0;i < 4;i++){
    chips.push(
      <View style={{
        width:80,
        height:40,
        backgroundColor: '#3C3836',
        borderRadius: 5,
      }}>
        <Text style={{ marginLeft: 5,color: '#EBDBB2'}}>
          test
        </Text>
        <Text style={{ marginLeft:5, color: '#EBDBB2'}}>
          100kg
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.startButton}> 
        <PlayButton playSize={playSize} location ={'/test'}/>
      </View>
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
            // marginTop: 20,
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
          <PlayButton playSize={playSize} location ={'/workout'}/>
        </View>
        
      </View>
      <View style={styles.bottom}>
        <View style={{
          position: 'absolute',
          top: 13,
          left: 10,
        }}>
          <View style={{
            width: 170,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <Text style={{
              color: '#EBDBB2',
            }}>
              your stats
            </Text>  
            <Text style={{
              color: '#EBDBB2',
            }}>
              weight: 12 kg
            </Text>
          </View>
          <View style={{
            marginTop: 20,
            width:170,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
            <GoalGraph goalName="test"/>
            <GoalGraph goalName="test"/>
            <GoalGraph goalName="test"/>
          </View>
        </View>

        <View style={styles.pedometerContainer}>
          <PedometerGraph/>
        </View>
        
        <View style={{
          width:360,
          height:70,
          position: 'absolute',
          bottom: 13,
          // backgroundColor: 'black',
        }}>
          <View style={{
            // marginLeft:10,
          }}>
            <Text style={{
              color :'#EBDBB2',
            }}>
              personal bests
            </Text>
          </View>
          <View style={{
            width:'100%',
            position: 'absolute',
            bottom:0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
            {chips.map((item, itemIndex) =>(
              <View key={itemIndex}>
                  {item}  
              </View>
            ))}
          </View>
        </View>



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
  pedometerContainer: {
    position: 'absolute',
    top: 5,
    right: 0,
  },
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
    // bacgroundColor: 'red',
    // marginTop: 10,
  },
  startButton:{
    // width:50,
    // height:50,
    position: 'absolute',
    // backgroundColor: '#928374',
    bottom:20,
    right:20,
    // borderRadius:100,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  // rightTriangle:{
  //   marginLeft: 5,
  //   borderTopWidth: playSize,
  //   borderBottomWidth: playSize,
  //   borderLeftWidth: playSize*1.7,
  //   borderTopColor: 'transparent',
  //   borderBottomColor: 'transparent',
  //   borderLeftColor: '#FBF1C7',
  // },
  top: {
    // flex: 0.35,
    justifyContent: 'center',
    backgroundColor: '#1D2021',
    // borderWidth: 5,
    // paddingTop: 20,
    // paddingBottom: 20,
    marginTop:  Constants.statusBarHeight,
    marginLeft: 10,
    marginRight:10,
    // marginBottom:10,
    borderRadius: 10,
  },
  middle: {
    flex: 0.19,
    backgroundColor: '#1D2021',
    borderRadius: 10,
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    // marginBottom:10,
  },
  bottom: {
    flex: 0.4,
    backgroundColor: '#1D2021',
    // borderWidth: 5,
    borderRadius: 10,
    margin:10,
    justifyContent:'center',
    alignItems: 'center',
  },
});



