import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView} from "react-native";
import Constants from "expo-constants";

interface ViewItem {
  id: number;
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
  const addView = () => {
        const newId = nextId;
        const newView: ViewItem = {
            id: newId,
        };
        setViews([...views, newView]);
        setNextId(newId + 1);
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
              <TouchableOpacity onPress={addView}>
                <Text style={{color: '#EBDBB2'}}>+</Text>
              </TouchableOpacity>
            </View>
            {views.map(view => (
              <View key={view.id} style={{ width: '100%', justifyContent: 'center', alignItems:'center'}}>
                <View style={styles.view}>
                  <Text>View {view.id + 1}</Text>
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  workoutText:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
  view: {
        width: '95%',
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
});
