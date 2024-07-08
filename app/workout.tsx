import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router"; 
import { Modal, TextInput, Text, StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
import Constants from "expo-constants";
import {NumberPicker} from "@/components/NumberPicker"
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';
import { addWarmupItem, updateWarmupItem, removeWarmupItem } from '@/store/reducers/warmupReducer';
import {addWorkoutItem, updateWorkoutItem, removeWorkoutItem, setWorkoutItems} from '@/store/reducers/workoutReducer';
import {HomeButton} from "@/components/HomeButton"

interface ViewItem {
  id: number;
  name: string;
  rep: number;
  set: number;
}
interface warmupItem{
  id: number;
  type:string;
  name: string;
  rep: number;
  set: number;
}

export default function Workout() {
  const dispatch = useDispatch();
  const [isWarmup, setIsWarmup] = useState(true);
  const warmupItems = useSelector((state: { warmup: warmupItem[] }) => state.warmup);
  const workoutItems = useSelector((state: {workout: warmupItem[] }) => state.workout);
  const [dataTemp, setDataTemp] = useState<warmupItem[]>([]);
  const [dataWorkout, setDataWorkout] = useState<warmupItem[]> ([]);
  const [nameTemp, setNameTemp] = useState('');
  const [repTemp, setRepTemp] = useState(0);
  const [setTemp, setSetTemp] = useState(0);
  useEffect(() => {
    setDataTemp(warmupItems);
  }, [warmupItems]);
  useEffect(()=> {
    setDataWorkout(workoutItems);
  }, [workoutItems]);
  const handleAdd = () => {
    const newItem: warmupItem= {
      id: Date.now(), // Example ID, replace with a proper ID generation
      type: isWarmup ? "warmup" : "workout", 
      name: nameTemp,
      rep: repTemp,
      set: setTemp,
    };
    if(isWarmup)
      dispatch(addWarmupItem(newItem));
    else  dispatch(addWorkoutItem(newItem));

    setNameTemp('');
    setRepTemp(0);
    setSetTemp(0);
    setModalVisible(false);
  };
  const renderItem= useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<warmupItem>) => {
      return (
        
        <TouchableOpacity
          style={{
            // height: 100,
            // backgroundColor: isActive ? "red" : item.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
          }}
          onLongPress={drag}
        >
          <View key={item.id} style={{ width: '100%', justifyContent: 'center', alignItems:'center'}}>
            <View style={styles.warmupBar}>
              <Text style={styles.warmupName}>{item.name}</Text>

              <View style={{flexDirection: 'row',justifyContent: 'between',}}>
                <View style={{marginLeft:10, marginRight:10}}>
                  <Text style={{color: '#FFFFFF'}}> {item.set} {item.set === 1 ? "set" : "sets"}</Text>
                </View>
                <View style={{width:2,height:20, backgroundColor: '#FFFFFF'}}>
                </View>
                <View style={{marginLeft:5, marginRight:10}}>
                  <Text style={{color:'#FFFFFF'}}> {item.rep} {item.set === 1 ? "rep" : "reps"}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => { item.type === "warmup" ? dispatch(removeWarmupItem(item.id)): dispatch(removeWorkoutItem(item.id))}}
                >
                    <Text style={{ marginTop: -2,color: "#FBF1C7" }}>x</Text>
                </TouchableOpacity>
              </View>


            </View>
          </View>

        </TouchableOpacity>
      );
    },
    [dispatch]
  );
  /////////////////////////////////////////
  const router = useRouter();
  const [currentDate] = useState(new Date());
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'long' });


  const [modalVisible, setModalVisible] = useState(false);

  const handleSetChange= (value: number) => {
    setSetTemp(value);
  };
  const handleRepChange= (value: number) => {
    setRepTemp(value);
  };

  
  return(
  <GestureHandlerRootView>
    <View style={styles.container}>
      <View style={{ flex: 1, marginLeft:10,marginRight:10}}>
        <View style={styles.dateContainer}>
          <Text style={{
            color: '#EBDBB2',
          }}>
            your today's workout
          </Text>
          <Text style={{
            color: '#EBDBB2',
          }}>
            {month.toLowerCase()} {day} {year}
          </Text>
          <HomeButton/>
        </View>
        <View style={styles.workoutContainer}>
          <View>
            <View style={styles.warmupText}>
              <Text style={{color: '#EBDBB2'}}>
                warm up
              </Text>
              <TouchableOpacity onPress={() => {
                setIsWarmup(true);
                setModalVisible(true);
                }}>
                <Text style={{color: '#EBDBB2'}}>+</Text>
              </TouchableOpacity>
            </View>
            <DraggableFlatList
              data={dataTemp}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggable-warmup-${item.id}`}
              onDragEnd={({data}) =>setDataTemp(data)}
            />
            <View style={styles.workoutText}>
              <Text style={{color: '#EBDBB2'}}>
                workout
              </Text>
              <TouchableOpacity onPress={() => {
                setIsWarmup(false);
                setModalVisible(true);
                }}>
                <Text style={{color: '#EBDBB2'}}>+</Text>
              </TouchableOpacity>
            </View>
            <DraggableFlatList
              data={dataWorkout}
              renderItem={renderItem}
              keyExtractor={(item, index) => `draggable-workout-${item.id}`}
              onDragEnd={({data}) =>setDataWorkout(data)}
            />
          </View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>add {isWarmup ? "warm up" :"workout"}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                  <TextInput
                    style={styles.input}
                    placeholder="name"
                    value={nameTemp}
                    placeholderTextColor="#FBF1C7"
                    onChangeText={setNameTemp}
                  />
                  <View style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    // position: 'absolute',
                    // right:0,
                  }}> 
                    <NumberPicker min={0} max={99} step={1} onValueChange={handleSetChange} />
                    <Text style={{ marginTop: -20, color: '#FFFFFF'}}> set </Text>
                  </View>
                  <View style={{
                    flexDirection: 'column',
                    alignItems:'center',
                    // right:0,
                  }}> 
                    <NumberPicker min={0} max={99} step={1} onValueChange={handleRepChange} />
                    <Text style={{ marginTop: -20, color: '#FFFFFF'}}> rep </Text>
                  </View>
                </View>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={handleAdd}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                  
                </View>
                <TouchableOpacity
                  // style={[styles.modalButton, styles.cancelButton]}
                  style={{position: 'absolute', top: 10, right: 10}}
                  onPress={() => {
                      setModalVisible(false);
                      setNameTemp('');
                  }}
                > 
                  <Text style={{fontSize: 18, color : '#EBDBB2'}}> x </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
  </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
  },
  dateContainer: {
    marginTop: Constants.statusBarHeight,
    marginLeft:10,
    width: "100%",
  },
  workoutContainer: {
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
