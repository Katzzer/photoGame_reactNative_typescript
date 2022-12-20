import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LoginScreen from "./screen/LoginScreen";
import HomeScreen from "./screen/HomeScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
