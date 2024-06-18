import { useRouter } from "expo-router";
import { Button, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Calendar} from "@/components/Calendar"
import {CustomCalendar} from "@/components/CustomCalendar"
export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <CustomCalendar>
        </CustomCalendar>
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
  top: {
    flex: 0.35,
    backgroundColor: '#1D2021',
    // borderWidth: 5,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 50,
    marginLeft: 10,
    marginRight:10,
    marginBottom:10,
    borderRadius: 10,
  },
  middle: {
    flex: 0.3,
    backgroundColor: '#1D2021',
    borderRadius: 10,
    margin:10,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: '#1D2021',
    // borderWidth: 5,
    borderRadius: 10,
    margin:10,
  },
});



