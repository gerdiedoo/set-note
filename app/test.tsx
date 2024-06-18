import { Text, View, Button} from "react-native"; 
import { useRouter } from "expo-router"; 
export default function Test() { 
  const router = useRouter(); 
  return ( 
    <View 
      style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
      }} 
    > 
    <Button title="Go to Test Screen" onPress={() => router.push("/")} /> 
    <Text>Edit app/index.tsx to edit this screen.</Text> 
    </View>
  ); 
}
