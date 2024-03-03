import React, {Dispatch, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, TextInput, View} from "react-native";
import {colors} from "../../constants/constants";

interface propsType {
    labelName: string,
    textInputValue: string,
    onChange: Dispatch<string>,
    isPassword?: boolean
}

function LabelAndInput({labelName, textInputValue, onChange, isPassword=false}:propsType) {

    const [isFocused, setIsFocused] = useState(false);

    const positionAnim = useRef(new Animated.Value(textInputValue ? -50 : 55)).current;
    const marginAnim = positionAnim.interpolate({
        inputRange: [0, 25],
        outputRange: [0, 0],
    });

    const fontSizeAnim = useRef(new Animated.Value(textInputValue ? 20 : 20)).current;

    useEffect(() => {
        Animated.timing(positionAnim, {
            toValue: textInputValue || isFocused ? 0 : 20,
            duration: 200,
            useNativeDriver: false,
        }).start();

        Animated.timing(fontSizeAnim, {
            toValue: textInputValue || isFocused ? 15 : 20,
            duration: 200,
            useNativeDriver: false,
        }).start();

    }, [textInputValue, isFocused]);

    return (
        <View style={styles.inputBox}>
            <TextInput
                style={[styles.input, textInputValue || isFocused ? null : styles.darkBorder]}
                value={textInputValue}
                onChangeText={onChange}
                secureTextEntry={isPassword}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <Animated.Text
                style={[
                    styles.label,
                    {
                        transform: [{translateY: positionAnim}, {translateX: marginAnim}],
                        fontSize: fontSizeAnim,
                        color: isFocused || textInputValue ? colors.lightBlue : colors.lightGrey,
                    },
                ]}
            >
                {labelName}
            </Animated.Text>

        </View>
    )
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
        left: 0,
        fontSize: 17,
        color: '#0ef',
        backgroundColor: '#1f293a',
        marginHorizontal: 10,
        paddingHorizontal: 4
    },
    darkBorder: {
        borderColor: colors.darkBlue,
    }
});