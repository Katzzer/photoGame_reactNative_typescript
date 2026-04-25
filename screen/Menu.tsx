import {StyleSheet, Text, Pressable, View} from "react-native";
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
                <Pressable onPress={handleRedirectToLoginScreen} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go to Login page</Text>
                </Pressable>

                <Pressable onPress={handleRedirectToOrderScreen} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go to List Of Photos</Text>
                </Pressable>

                <Pressable onPress={handleRedirectToCameraScreen} style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Go Camera</Text>
                </Pressable>
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
        padding: 20,
    },
    buttonContainer: {
        elevation: 4,
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 20,
        marginBottom: 15,
        width: '100%',
        maxWidth: 300,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    buttonText: {
        fontSize: 16,
        color: colors.onPrimary,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: 'uppercase',
    },
});
