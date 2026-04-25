import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {colors, RootStackParamList, SCREEN} from "../../constants/constants";
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
    menu_container: {
        backgroundColor: colors.primary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        elevation: 2,
    },
    menu_text: {
        color: colors.onPrimary,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 14,
        textTransform: 'uppercase',
    },
});
