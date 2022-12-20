import React from "react"
import {
  StyleSheet,
} from "react-native"
import {
  Svg,
  Path,
} from "react-native-svg"


const SvgIconClear = () => {
  return (
    <>
      <Svg style={ Style.svg } viewBox="0 0 50 50">
        <Path
          d="
            M2.70459e-05 6.93665L6.93668 0
            L25.0003 18.0636
            L43.0633 0.000682286
            L49.9999 6.93734
            L31.937 25.0003
            L50 43.0633
            L43.0633 49.9999
            L25.0003 31.9369
            L6.93665 50.0006
            L0 43.064
            L18.0637 25.0003
            L2.70459e-05 6.93665
            Z
          "
          fill="#7a7a7a"
        />
      </Svg>
    </>
  )
}

const Style = StyleSheet.create({
  svg: {
    width: 15,
    height: 15,
  }
})

export default SvgIconClear