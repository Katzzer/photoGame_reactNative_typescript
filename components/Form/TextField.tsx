import React, { RefObject, useRef, useState } from "react"
import SvgIconClear from "./SvgIconClear"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from "react-native"

const focusInput = (ref: RefObject<TextInput>) => {
  return () => {
    ref.current?.focus()
  }
}

interface Props {
  label: string,
  inputValue?: string,
  onInputChange?(value: string): void,
  isPswd?: boolean,
  style?: StyleProp<ViewStyle>,
}

const TextField = ( props: Props ) => {
  const inputRef: RefObject<TextInput> = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const handleInputChange = (value: string) => {
    props.onInputChange ? props.onInputChange(value) : null
  }

  const clearInput = () => {
    inputRef.current?.clear()
    handleInputChange('')
  }

  return (
    <>
      <View style={ [Style.textField, props.style] }>
        <Text
          style={ Style.label }
          onPress={ focusInput(inputRef) }
        >
          { props.label }
        </Text>
        <View style={ Style.inputWithIcon }>
          <TextInput
            style={ Style.input }
            ref={ inputRef }
            secureTextEntry={ props.isPswd }
            onFocus={ () => setIsFocused(true) }
            onBlur={ () => setIsFocused(false) }
            onChangeText={ (value: string) => handleInputChange(value) }
            value={ props.inputValue }
          />
          {
            isFocused && props.inputValue && props.inputValue.length > 0
              ? <Pressable onPress={ () => clearInput() } style={ Style.clickableSvgIcon }>
                  <SvgIconClear />
                </Pressable>
              : ''
          }
        </View>
      </View>
    </>
  )
}

const Style = StyleSheet.create({
  textField: {
    flexDirection: "column",
  },
  label: {
    zIndex: 2,
    position: "absolute",
    marginTop: -10,
    marginLeft: 10,
    paddingLeft: 5,
    paddingRight: 5,

    fontWeight: "500",
    color: "#7a7a7a",

    backgroundColor: "#ffffff",
  },
  inputWithIcon: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#c2c2c2",
  },
  input: {
    zIndex: 1,
    height: 40,
    width: "100%",

    paddingLeft: 20,
    paddingRight: 20,

    fontSize: 16,
    textAlign: "center",
  },
  clickableSvgIcon: {
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    height: "100%",
    width: 40,
    marginLeft: -40,

    backgroundColor: "#ffffff",
  }
})

export default TextField