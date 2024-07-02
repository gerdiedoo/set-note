import { useRouter } from "expo-router"; 
import React, { useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";


interface ViewItem {
  id: number;
  name: string;
  rep: number;
  set: number;
}


const NUM_ITEMS = 10;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const exampleData: Item[] = [...Array(5)].map((d, index) => {
  // console.log(index);
  return {
    id: index,
    name: "test",
    rep: 1,
    set: 1,
  };
});

type Item = {
  key: string;
  label: string;
  backgroundColor: string;
};
export default function Test() { 
  const router = useRouter(); 
  const [data, setData] = useState(exampleData);
  const removeView = (id: number) => {
    console.log(id);
    setData(data.filter(data => data.id !== id));
  };
  const temp = () => {
    for (let index = 0; index < data.length; index++) {
      console.log(data[index].id)
    }
  }

  const renderItem = useCallback(
    ({ item, index, drag, isActive }: RenderItemParams<ViewItem>) => {
      return (
        
        <TouchableOpacity
          style={{
            height: 100,
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
                  onPress={() => removeView(item.id)}
                >
                    <Text style={{ color: "#FBF1C7" }}>x</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </TouchableOpacity>
      );
    },
    []
  );
  return ( 
    <GestureHandlerRootView>
      <View 
        style={{ 
          flex: 1, 
        }} 
      > 
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => setData(data)}
      />
      <Button title="Go to Test Screen" onPress={() => router.push("/")} /> 
      <Button title="test" onPress={ temp }/>
      </View>
    </GestureHandlerRootView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
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
