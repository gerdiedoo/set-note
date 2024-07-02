import { useState } from "react";
import { Modal, TextInput, Text, StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
import Constants from "expo-constants";
import {NumberPicker} from "@/components/NumberPicker"
import DraggableFlatList from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from "react-native-gesture-handler";
interface ViewItem {
  id: number;
  name: string;
  rep: number;
  set: number;
}

export default function Workout() {
  const [currentDate] = useState(new Date());
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  const [views, setViews] = useState<ViewItem[]>([]);
  const [nextId, setNextId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [rep, setRep] = useState(0);
  const [set, setSet] = useState(0);
  const addView = () => {
    if (inputValue.trim() === '') return; // Ignore empty input
    const newView: ViewItem = {
        id: nextId,
        name: inputValue,
        rep: rep,
        set: set,
    };
    setViews([...views, newView]);
    setNextId(nextId + 1);
    setInputValue('');
    setRep(0);
    setSet(0);
    setModalVisible(false); // Hide the modal after adding
  };

    // Function to remove a view by its ID
  const removeView = (id: number) => {
    setViews(views.filter(view => view.id !== id));
  };
  const handleValueChange = (value: number) => {
    // console.log('Selected Value:', value);
  };
  const handleSetChange= (value: number) => {
    setSet(value);
  };
  const handleRepChange= (value: number) => {
    setRep(value);
  };

  const renderItem = ({ item, drag, isActive }) => (
    <View key={item.id} style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.warmupBar}>
        <Text style={styles.warmupName}>{item.name}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <Text style={{ color: '#FFFFFF' }}> {item.set} {item.set === 1 ? "set" : "sets"}</Text>
          </View>
          <View style={{ width: 2, height: 20, backgroundColor: '#FFFFFF' }}></View>
          <View style={{ marginLeft: 5, marginRight: 10 }}>
            <Text style={{ color: '#FFFFFF' }}> {item.rep} {item.set === 1 ? "rep" : "reps"}</Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => removeView(item.id)}
          >
            <Text style={{ color: "#FBF1C7" }}>x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

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
        </View>
        <View style={styles.workoutContainer}>
          <View>
            <View style={styles.warmupText}>
              <Text style={{color: '#EBDBB2'}}>
                warm up
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{color: '#EBDBB2'}}>+</Text>
              </TouchableOpacity>
            </View>
            {
              views.map(view => (
                <View key={view.id} style={{ width: '100%', justifyContent: 'center', alignItems:'center'}}>
                  <View style={styles.warmupBar}>
                    <Text style={styles.warmupName}>{view.name}</Text>
                    <View style={{flexDirection: 'row',justifyContent: 'between',}}>
                      <View style={{marginLeft:10, marginRight:10}}>
                        <Text style={{color: '#FFFFFF'}}> {view.set} {view.set === 1 ? "set" : "sets"}</Text>
                      </View>
                      <View style={{width:2,height:20, backgroundColor: '#FFFFFF'}}>
                      </View>
                      <View style={{marginLeft:5, marginRight:10}}>
                        <Text style={{color:'#FFFFFF'}}> {view.rep} {view.set === 1 ? "rep" : "reps"}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeView(view.id)}
                      >
                        <Text style ={{ color: "#FBF1C7" }}>x</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            }
            {
            // <DraggableFlatList
            //   data={views}
            //   renderItem={renderItem}
            //   keyExtractor={(item) => item.id.toString()}
            //   onDragEnd={({ views }) => setViews(views)}
            // />
            }
            <View style={styles.workoutText}>
              <Text style={{color: '#EBDBB2'}}>
                sets
              </Text>
              <Text style={{color: '#EBDBB2'}}>+</Text>
            </View>
          </View>
          <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>add</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between',}}>
                  <TextInput
                    style={styles.input}
                    placeholder="name"
                    value={inputValue}
                    placeholderTextColor="#FBF1C7"
                    onChangeText={setInputValue}
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
                  <TouchableOpacity style={styles.modalButton} onPress={addView}>
                    <Text style={styles.buttonText}>Add</Text>
                  </TouchableOpacity>
                  
                </View>
                <TouchableOpacity
                  // style={[styles.modalButton, styles.cancelButton]}
                  style={{position: 'absolute', top: 10, right: 10}}
                  onPress={() => {
                      setModalVisible(false);
                      setInputValue('');
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
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
