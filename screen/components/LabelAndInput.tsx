import React, {Dispatch} from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";

interface propsType {
    label: string,
    textInputValue: string,
    onChange: Dispatch<string>,
    isPassword?: boolean
}

function LabelAndInput({label, textInputValue, onChange, isPassword=false}:propsType) {
    
    return (
        <>

            <View style={styles.container}>
                <Text>{label}</Text>
                <TextInput
                    style={styles.input}
                    value={textInputValue} onChangeText={onChange}
                    secureTextEntry={isPassword}
                />
            </View>
           

        </>
    );
}

export default LabelAndInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})