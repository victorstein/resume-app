import React from 'react'
import { Text } from 'react-native'

export default ({ children, style, fontFamily = 'regular' }) => (
  <Text style={[ ...style, { fontFamily } ]}>
    {
      children
    }
  </Text>
)
