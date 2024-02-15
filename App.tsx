import {NavigationContainer} from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./screen/Login";
import Menu from "./screen/Menu";
import Colors from "./constants/colors";
import ListOfPhotos from "./screen/ListOfPhotos";
import {SCREEN, TITLE} from "./tools/constants";
import TokenContext from "./context/token-context";
import {useReducer} from "react";
import {tokenReducer} from "./reducer/tokenReducer";
import {ActionType, initialState, State} from "./model/token.model";
import AppModal from "./screen/AppModal";
import CapturePhoto from "./screen/CapturePhoto";

const Stack = createNativeStackNavigator();

export default function App() {

    const [state, dispatch] = useReducer(tokenReducer, initialState);

    function handleRedirectToMenu(navigation: any) {
        navigation.navigate(SCREEN.MENU as never, {} as never);
    }

    function handleRedirectLoginPage(navigation: any) {
        navigation.navigate(SCREEN.LOGIN as never, {} as never);
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
          <Stack.Navigator initialRouteName={SCREEN.LOGIN}>

              <Stack.Screen
                  name={SCREEN.LOGIN}
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
                              <View style={styles.menu_container}>
                                  <Pressable onPress={() => handleRedirectToMenu(navigation)}>
                                      <Text style={styles.menu_text}>Menu</Text>
                                  </Pressable>
                              </View>
                          </>
                  })}
              />

              <Stack.Screen
                  name={SCREEN.LIST_OF_PHOTOS}
                  component={ListOfPhotos}
                  options={({navigation}) => ({
                      title: TITLE.LIST_OF_PHOTOS,
                      headerTintColor: Colors.darkWhite,
                      headerStyle: {
                          backgroundColor: Colors.darkGrey,
                      },
                      headerHideBackButton: true,
                      headerRight: ({tintColor}) =>
                          <>
                              <View style={styles.menu_container}>
                                  <Pressable onPress={() => handleRedirectToMenu(navigation)}>
                                      <Text style={styles.menu_text}>Menu</Text>
                                  </Pressable>
                              </View>
                          </>
                  })}
              />

              <Stack.Screen
                  name={SCREEN.MENU}
                  component={Menu}
                  options={({navigation}) => ({
                      title: TITLE.MENU,
                      headerTintColor: Colors.darkWhite,
                      headerStyle: {
                          backgroundColor: Colors.darkGrey,
                      },
                      headerHideBackButton: true,
                      headerRight: ({tintColor}) =>
                          <>
                              <View style={styles.menu_container}>
                                  <Pressable onPress={() => handleRedirectToMenu(navigation)}>
                                      <Text style={styles.menu_text}>Menu</Text>
                                  </Pressable>
                              </View>
                          </>
                  })}
              />

              {/* FOR TESTING */}
              <Stack.Screen
                  name={SCREEN.APP_WITH_MODAL}
                  component={AppModal}
                  options={({navigation}) => ({
                      title: TITLE.APP_WITH_MODAL,
                      headerTintColor: Colors.darkWhite,
                      headerStyle: {
                          backgroundColor: Colors.darkGrey,
                      },
                      headerHideBackButton: true,
                      headerRight: ({tintColor}) =>
                          <>
                              <View style={styles.menu_container}>
                                  <Pressable onPress={() => handleRedirectToMenu(navigation)}>
                                      <Text style={styles.menu_text}>Menu</Text>
                                  </Pressable>
                              </View>
                          </>
                  })}
              />

              <Stack.Screen
                  name={SCREEN.CAPTURE_PHOTO}
                  component={CapturePhoto}
                  options={({navigation}) => ({
                      title: TITLE.CAPTURE_PHOTO,
                      headerTintColor: Colors.darkWhite,
                      headerStyle: {
                          backgroundColor: Colors.darkGrey,
                      },
                      headerHideBackButton: true,
                      headerRight: ({tintColor}) =>
                          <>
                              <View style={styles.menu_container}>
                                  <Pressable onPress={() => handleRedirectToMenu(navigation)}>
                                      <Text style={styles.menu_text}>Menu</Text>
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
  menu_container: {
    backgroundColor: "#6200ee",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    minWidth: 100,
  },
  menu_text: {
    color: Colors.darkWhite,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
