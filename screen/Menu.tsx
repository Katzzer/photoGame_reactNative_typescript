import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors,  SCREEN} from "../constants/constants";
import {useNavigation} from "@react-navigation/native";

function Menu() {
    const navigation = useNavigation();

    function handleRedirectToLoginScreen() {
        navigation.navigate(SCREEN.LOGIN as never);
    }

    function handleRedirectToOrderScreen() {
        navigation.navigate(SCREEN.LIST_OF_PHOTOS as never);
    }

    function handleRedirectToCameraScreen() {
        navigation.navigate(SCREEN.CAPTURE_PHOTO as never);
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleRedirectToLoginScreen} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go to Login page</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRedirectToOrderScreen} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go to List Of Photos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleRedirectToCameraScreen} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go Camera</Text>
                </TouchableOpacity>
            </View>

        </>
    );
}

export default Menu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // menu_container: {
    //     backgroundColor: "#6200ee",
    //     paddingVertical: 10,
    //     paddingHorizontal: 10,
    //     borderRadius: 8,
    //     minWidth: 100,
    // },
    // menu_text: {
    //     color: colors.darkWhite,
    //     textAlign: "center",
    //     fontWeight: "bold",
    //     fontSize: 20,
    // },
    buttonContainer: {
        elevation: 8,
        backgroundColor: "#6200ee",
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
        width: '80%'
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
    },
});