import React, { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  StyleProp,
} from "react-native";

interface PropsInterface {
  fields: ReactNode,
  submitBtn: ReactNode,
  style?: StyleProp<ViewStyle>,
}

const Form = (props: PropsInterface) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={ Platform.OS === "ios" ? "padding" : "height" }
        style={ props.style }
      >
        { props.fields }
        { props.submitBtn }
      </KeyboardAvoidingView>
    </>
  );
}

export default Form;