import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import Colors from "../../constants/colors";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList, SCREEN} from "../../tools/constants";
import TokenContext from "../../context/token-context";

interface MenuButtonProps {
    navigation: NativeStackNavigationProp<RootStackParamList>
}

function MenuButton(props: MenuButtonProps) {
    const [state, _] = useContext(TokenContext);

    function handleRedirect() {
        props.navigation.navigate(SCREEN.MENU);
    }

    return (
        <>
            {state.isUserLogged &&
                <View style={styles.menu_container}>
                    <Pressable onPress={handleRedirect}>
                        <Text style={styles.menu_text}>Menu</Text>
                    </Pressable>
                </View>
            }

        </>
    );
}

export default MenuButton;

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