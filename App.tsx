import {NavigationContainer} from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import LoginScreen from "./screen/LoginScreen";
import Colors from "./constants/colors";
import OrderDetail from "./screen/OrderDetail";

const Stack = createNativeStackNavigator();

export default function App() {

    function handleRedirectToOrderDetail(navigation: any) {
        navigation.navigate("OrderDetail" as never, {} as never);
    }

    function handleRedirectLoginPage(navigation: any) {
        navigation.navigate("LoginScreen" as never, {} as never);
    }

  return (
      <>
        <StatusBar style={"light"}/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={({navigation}) => ({
                  title: "Login Screen",
                  headerTintColor: Colors.darkWhite,
                  headerStyle: {
                    backgroundColor: Colors.darkGrey,
                  },
                  headerRight: ({tintColor}) =>
                      <>
                        <View style={styles.price_container}>
                          <Pressable onPress={() => handleRedirectToOrderDetail(navigation)}>
                            <Text style={styles.price_text}>{"120"} Kč</Text>
                          </Pressable>
                        </View>
                      </>
                })}
            />
            <Stack.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={({navigation}) => ({
                  title: "PK Pizza",
                  headerTintColor: Colors.darkWhite,
                  headerStyle: {
                    backgroundColor: Colors.darkGrey,
                  },
                    headerRight: ({tintColor}) =>
                        <>
                            <View style={styles.price_container}>
                                <Pressable onPress={() => handleRedirectLoginPage(navigation)}>
                                    <Text style={styles.price_text}>{"999"} Kč</Text>
                                </Pressable>
                            </View>
                        </>
                })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price_container: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    minWidth: 100,
  },
  price_text: {
    color: Colors.darkWhite,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
