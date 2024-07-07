// import { useRouter } from "expo-router"; 
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DraggableFlatList from "react-native-draggable-flatlist";
import Auth from "@/components/Auth";
import React, { useEffect,useState, useCallback } from "react";
import { View, TouchableOpacity, Text, Button, StyleSheet,TextInput } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { supabase } from "@/utils/supabase";
// import { setUserID, clearUserID } from './userReducer';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '@/store/reducers/exampleReducer'; // Import your actions
import { clearUserID } from '@/store/reducers/userReducer'; // Import your actions
import { addWarmupItem, updateWarmupItem, removeWarmupItem } from '@/store/reducers/warmupReducer';
import Constants from "expo-constants";

interface ProfileItem {
  id: number,
  name: string,
  email: string,
}

interface warmupItem{
  id: number;
  name: string;
  rep: number;
  set: number;
}

export default function Test() { 
  const dispatch = useDispatch();
  const userID = useSelector((state) => state.user.userID);

  const value = useSelector((state) => state.example.value);
  const warmupItems = useSelector((state: { warmup: warmupItem[] }) => state.warmup);
  const [dataTemp, setDataTemp] = useState<warmupItem[]>([]);
  const [name, setName] = useState('');
  const [rep, setRep] = useState(0);
  const [set, setSet] = useState(0);

  useEffect(() => {
    setDataTemp(warmupItems);
  }, [warmupItems]);
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(clearUserID())
      console.log('User signed out');
      console.log(userID);

    } catch (error) {
      console.error(error);
    }
  };
  const handleAdd = () => {
    const newItem: warmupItem= {
      id: Date.now(), // Example ID, replace with a proper ID generation
      name,
      rep,
      set,
    };
    dispatch(addWarmupItem(newItem));
    setName('');
    setRep(0);
    setSet(0);
  };
  const fetchProfiles = async () => {
    try {
      let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
        
      if (error) {
        console.log("Error fetching profiles:");
        console.error(error.message);
        return;
      }

      console.log("Profiles:");
      console.log(JSON.stringify(profiles, null, 2));
    } catch (error) {
      console.log("Unexpected error:");
      console.error(error);
    }
  };
  const renderItem = useCallback(
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
                  onPress={() => dispatch(removeWarmupItem(item.id))}
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
  return ( 
  <GestureHandlerRootView>
    <View style={styles.container}>
      <Auth/>
      <Button title="sign out" onPress={()=>signOut()}/>
      <Text>
      </Text>
      <Button title="get profiles" onPress={()=>fetchProfiles()}/>
      <Text style={{color: "#FFFFFF"}}>{value}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Text style={{color: "#FFFFFF"}}> userID:{userID} </Text>
      <View style={styles.workoutContainer}>
        <View>
          <DraggableFlatList
            data={dataTemp}
            renderItem={renderItem}
            keyExtractor={(item, index) => `draggable-warmup-${item.id}`}
            onDragEnd={({data}) =>setDataTemp(data)}
          />
        </View>
      </View>
      {
      warmupItems.map(item => (
        <View key={item.id}>
          <Text>ID: {item.id}</Text>
          <Text>Name: {item.name}</Text>
          <Text>Reps: {item.rep}</Text>
          <Text>Sets: {item.set}</Text>
          <Button title="Remove" onPress={() => dispatch(removeWarmupItem(item.id))} />
        </View>
      ))
      }
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Reps" value={rep.toString()} onChangeText={(text) => setRep(Number(text))} />
      <TextInput placeholder="Sets" value={set.toString()} onChangeText={(text) => setSet(Number(text))} />
      <Button title="Add Warmup Item" onPress={handleAdd} />
    </View>
  </GestureHandlerRootView>
  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#282828',
  // },
  dateContainer: {
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
