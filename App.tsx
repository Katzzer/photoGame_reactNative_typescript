import {NavigationContainer} from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import Login from "./screen/Login";
import Colors from "./constants/colors";
import OrderDetail from "./screen/OrderDetail";
import {PAGE, TITLE} from "./tools/constants";
import TokenContext from "./context/token-context";
import {useReducer} from "react";
import {tokenReducer} from "./reducer/tokenReducer";
import {ActionType, initialState, State} from "./model/token.model";

const Stack = createNativeStackNavigator();

export default function App() {

    const [state, dispatch] = useReducer(tokenReducer, initialState);

    function handleRedirectToOrderDetail(navigation: any) {
        navigation.navigate(PAGE.ORDER_DETAIL as never, {} as never);
    }

    function handleRedirectLoginPage(navigation: any) {
        navigation.navigate(PAGE.LOGIN as never, {} as never);
    }

    function setToken(type: ActionType, tokens: Partial<State>) {
        // Merge with the current state so only provided tokens are changed
        dispatch({
            type: type,
            payload: {
                ...state,
                ...tokens
            }
        });
    }

    function setLoggedUserUsername(loggedUserUsername: string | null) {
        dispatch({
            type: ActionType.SET_USER_USERNAME,
            payload: {
                ...state,
                loggedUserUsername: loggedUserUsername
            }
        });
    }

    function setIsUserLogged(isUserLogged: boolean) {
        dispatch({
            type: ActionType.SET_IS_USER_LOGGED,
            payload: {
                ...state,
                isUserLogged: isUserLogged
            }
        });
    }

  return (
      <TokenContext.Provider value={[state, dispatch]}>
        <StatusBar style={"light"}/>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={PAGE.LOGIN}>
            <Stack.Screen
                name={PAGE.LOGIN}
                component={Login}
                options={({navigation}) => ({
                  title: TITLE.LOGIN_SCREEN,
                  headerTintColor: Colors.darkWhite,
                  headerStyle: {
                    backgroundColor: Colors.darkGrey,
                  },
                    headerHideBackButton: true,
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
                name={PAGE.ORDER_DETAIL}
                component={OrderDetail}
                options={({navigation}) => ({
                  title: TITLE.ORDER_DETAIL,
                  headerTintColor: Colors.darkWhite,
                  headerStyle: {
                    backgroundColor: Colors.darkGrey,
                  },
                    headerHideBackButton: true,
                    headerRight: ({tintColor}) =>
                        <>
                            <View style={styles.price_container}>
                                <Pressable onPress={() => handleRedirectLoginPage(navigation)}>
                                    <Text style={styles.price_text}>Go back</Text>
                                </Pressable>
                            </View>
                        </>
                })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TokenContext.Provider>

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
