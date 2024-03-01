import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./screen/Login";
import Menu from "./screen/Menu";
import ListOfPhotos from "./screen/ListOfPhotos";
import {colors, SCREEN, TITLE} from "./constants/constants";
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
                      headerTintColor: colors.darkWhite,
                      headerStyle: {
                          backgroundColor: colors.darkGrey,
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
                      headerTintColor: colors.darkWhite,
                      headerStyle: {
                          backgroundColor: colors.darkGrey,
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
                      headerTintColor: colors.darkWhite,
                      headerStyle: {
                          backgroundColor: colors.darkGrey,
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
                      headerTintColor: colors.darkWhite,
                      headerStyle: {
                          backgroundColor: colors.darkGrey,
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
