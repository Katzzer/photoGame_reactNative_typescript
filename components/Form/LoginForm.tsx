import React, { useState } from "react"
import TextField from "./TextField"
import Form from "./Form"
import {
  Pressable,
  Text,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from "react-native"

interface Props {
  formStyle?: StyleProp<ViewStyle>
}

const LoginForm = (props: Props) => {
  const [userName, setUserName] = useState('')
  const [userPassword, setUserPassword] = useState('')

  const clearState = () => {
    setUserName('')
    setUserPassword('')
  }

  const handleSubmit = () => {
    console.log(userName)
    console.log(userPassword)
    clearState()
  }

  const canSubmit = () => {
    return userName.length > 2 && userPassword.length > 2
  }

  return (
    <>
      <Form
        style={ props.formStyle }
        fields={
          <View>
            <TextField
              label="Username"
              style={ Style.textField }
              inputValue={ userName }
              onInputChange={ (value: string) => setUserName(value)}
              />
            <TextField
              label="Password"
              style={ Style.textField }
              inputValue={ userPassword }
              isPswd={ true }
              onInputChange={ (value: string) => setUserPassword(value)}
            />
          </View>
        }
        submitBtn={
          <View>
            <Pressable
                style={ canSubmit() ? Style.submitBtn : Style.submitBtnDisabled }
                disabled={ !canSubmit() }
                onPress={ handleSubmit }
              >
                <Text style={ Style.submitBtnTxt }>
                  { "Login" }
                </Text>
            </Pressable>
          </View>
        }
      />
    </>
  )
}

const Style = StyleSheet.create({
  textField: {
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#ba1a4f"
  },
  submitBtnTxt: {
    paddingTop: 10,
    paddingBottom: 10,

    color: "#ffffff",
    textAlign: "center",
    fontWeight: "bold",
  },
  submitBtnDisabled: {
    backgroundColor: "#9c9c9c"
  }
})

export default LoginForm