import { useState } from "react";
import { Modal, TextInput, Text, StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
import Constants from "expo-constants";

interface ViewItem {
  id: number;
  content: string;
}

export default function Workout() {
  const [currentDate] = useState(new Date());
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  // const warmUp = [];
  // const sets = [];
  const [views, setViews] = useState<ViewItem[]>([]);
  const [nextId, setNextId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  // const addView = () => {
  //       const newId = nextId;
  //       const newView: ViewItem = {
  //           id: newId,
  //       };
  //       setViews([...views, newView]);
  //       setNextId(newId + 1);
  //   };
  const addView = () => {
    if (inputValue.trim() === '') return; // Ignore empty input
    const newView: ViewItem = {
        id: nextId,
        content: inputValue,
    };
    setViews([...views, newView]);
    setNextId(nextId + 1);
    setInputValue('');
    setModalVisible(false); // Hide the modal after adding
  };

    // Function to remove a view by its ID
  const removeView = (id: number) => {
    setViews(views.filter(view => view.id !== id));
  };

  return(
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
          <ScrollView>
            <View style={styles.warmupText}>
              <Text style={{color: '#EBDBB2'}}>
                warm up
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={{color: '#EBDBB2'}}>+</Text>
              </TouchableOpacity>
            </View>
            {views.map(view => (
              <View key={view.id} style={{ width: '100%', justifyContent: 'center', alignItems:'center'}}>
                <View style={styles.warmupBar}>
                  <Text style={styles.warmupName}>{view.content}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeView(view.id)}
                  >
                    <Text>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.workoutText}>
              <Text style={{color: '#EBDBB2'}}>
                sets
              </Text>
              <Text style={{color: '#EBDBB2'}}>+</Text>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Enter View Content</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Type here..."
                  value={inputValue}
                  placeholderTextColor="#FBF1C7"
                  onChangeText={setInputValue}
                />
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
                  <Text style={{fontSize: 18}}> x </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </View>
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
    padding: 5,
    borderRadius: 5,
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
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#3C3836',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: "#FBF1C7"
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
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
    backgroundColor: '#fe8019',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#CC241D',
  },
});
