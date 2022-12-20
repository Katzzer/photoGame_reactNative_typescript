import React from "react"
import LoginForm from "../components/Form/LoginForm"
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Keyboard,
  Text,
} from "react-native"

const HomeScreen = () => {
  return (
    <>
      <TouchableWithoutFeedback
        onPress={ Keyboard.dismiss }
      >
        <View style={ Style.page }>
          <Text style={ Style.pageTitle }>PhotoGame</Text>
          <LoginForm formStyle={ Style.loginForm } />
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const Style = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitle: {
    marginBottom: 20,

    fontSize: 32,
    fontWeight: "bold",
  },
  loginForm: {
    width: "70%",
  },
})

export default HomeScreen
