import {NavigationContainer} from "@react-navigation/native";
import {StatusBar} from 'expo-status-bar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./screen/Login";
import Menu from "./screen/Menu";
import ListOfPhotos from "./screen/ListOfPhotos";
import {colors, RootStackParamList, SCREEN, TITLE} from "./constants/constants";
import TokenContext from "./context/token-context";
import {useReducer} from "react";
import {tokenReducer} from "./reducer/tokenReducer";
import {initialState} from "./model/token.model";
import CapturePhoto from "./screen/CapturePhoto";
import MenuButton from "./screen/components/MenuButton";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

    const [state, dispatch] = useReducer(tokenReducer, initialState);

    const screenOptions = ({navigation}: any) => ({
        headerTintColor: colors.onSurface,
        headerStyle: {
            backgroundColor: colors.surface,
        },
        headerTitleStyle: {
            fontWeight: 'bold' as 'bold',
        },
        headerHideBackButton: true,
        headerRight: () =>
            <MenuButton navigation={navigation}/>
    });

  return (
      <TokenContext.Provider value={[state, dispatch]}>
        <StatusBar style={"light"}/>
        <NavigationContainer>
          <Stack.Navigator 
              initialRouteName={SCREEN.LOGIN}
              screenOptions={screenOptions}
          >

              <Stack.Screen
                  name={SCREEN.LOGIN}
                  component={Login}
                  options={{ title: TITLE.LOGIN_SCREEN }}
              />

              <Stack.Screen
                  name={SCREEN.LIST_OF_PHOTOS}
                  component={ListOfPhotos}
                  options={{ title: TITLE.LIST_OF_PHOTOS }}
              />

              <Stack.Screen
                  name={SCREEN.MENU}
                  component={Menu}
                  options={{ title: TITLE.MENU }}
              />

              <Stack.Screen
                  name={SCREEN.CAPTURE_PHOTO}
                  component={CapturePhoto}
                  options={{ title: TITLE.CAPTURE_PHOTO }}
              />

          </Stack.Navigator>
        </NavigationContainer>
      </TokenContext.Provider>

  );
}
