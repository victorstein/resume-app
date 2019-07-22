import React, { useEffect } from 'react'
import { Animated } from 'react-native'

const config = {
  toValue: 0,
  duration: 500,
  useNativeDriver: true
}

export default () => {
  let overlayOpacity = new Animated.Value(1)

  useEffect(() => {
    Animated.timing(
      overlayOpacity,
      config
    ).start()
  })

  return <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
}

const styles = {
  overlay: {
    backgroundColor: '#1B9FC6',
    width: '100%',
    height: '100%',
    position: 'absolute'
  }
}
