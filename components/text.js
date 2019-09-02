import React from 'react'
import { Text } from 'react-native'

export default ({ children, style = null, fontFamily = 'regular' }) => {
  console.log(style)
  if (style) {
    return (
      <Text style={[...style, { fontFamily }]}>
        {
          children
        }
      </Text>
    )
  } else {
    return (
      <Text style={[{ fontFamily }]}>
        {
          children
        }
      </Text>
    )
  }
}
