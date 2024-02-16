import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./screen/Login";
import Menu from "./screen/Menu";
import Colors from "./constants/colors";
import ListOfPhotos from "./screen/ListOfPhotos";
import {SCREEN, TITLE} from "./tools/constants";
import TokenContext from "./context/token-context";
import {useReducer} from "react";
import {tokenReducer} from "./reducer/tokenReducer";
import {initialState} from "./model/token.model";
import CapturePhoto from "./screen/CapturePhoto";
import MenuButton from "./screen/components/MenuButton";

const Stack = createNativeStackNavigator();

export default function App() {

    const [state, dispatch] = useReducer(tokenReducer, initialState);

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
                          <MenuButton navigation={navigation}/>
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
                          <MenuButton navigation={navigation}/>
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
                          <MenuButton navigation={navigation}/>
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
                          <MenuButton navigation={navigation}/>
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
