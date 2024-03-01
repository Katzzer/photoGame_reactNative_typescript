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

            {/*<View style={styles.inputBox}>*/}
            {/*    <TextInput*/}
            {/*        style={styles.input}*/}
            {/*        value="katzz"*/}
            {/*    />*/}
            {/*    <Text style={styles.label}>Email</Text>*/}
            {/*</View>*/}

            <View style={styles.inputBox}>
                <TextInput
                    style={styles.input}
                    value={textInputValue} onChangeText={onChange}
                    secureTextEntry={isPassword}
                />
                <Text style={styles.label}>{label}</Text>
            </View>
           

        </>
    );
}

export default LabelAndInput;

const styles = StyleSheet.create({
    inputBox: {
        marginVertical: 15,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: 'transparent',
        borderColor: '#0ef',
        borderWidth: 2,
        borderRadius: 20,
        fontSize: 20,
        color: '#fff',
        paddingHorizontal: 20,
    },
    label: {
        position: 'absolute',
        top: '-25%',
        left: 20,
        fontSize: 17,
        color: '#0ef',
        backgroundColor: '#1f293a',
        marginHorizontal: 10,
        paddingHorizontal: 4
    },
})