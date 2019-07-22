import React, { useEffect, useContext, memo } from 'react'
import { Animated, Dimensions, Easing } from 'react-native'
import { MainStore } from '../App'

const { width, height } = Dimensions.get('window')

export default memo(() => {
  let { query, mutation } = useContext(MainStore)

  let position = new Animated.Value(query.loading ? -height : 0)
  let rotation = new Animated.Value(0)
  let scale = new Animated.Value(1)

  const rotateData = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const rotateAndJump = () => {
    Animated.parallel([
      Animated.sequence([
        Animated.spring(
          rotation,
          {
            toValue: 1,
            friction: 5,
            easing: Easing.bounce(),
            useNativeDriver: true
          }
        ),
        Animated.spring(
          rotation,
          {
            toValue: 0,
            friction: 5,
            easing: Easing.bounce(),
            useNativeDriver: true
          }
        )
      ]),
      Animated.sequence([
        Animated.timing(
          position,
          {
            toValue: -25,
            duration: 100,
            easing: Easing.ease,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          position,
          {
            toValue: 0,
            duration: 150,
            easing: Easing.ease,
            useNativeDriver: true
          }
        )
      ])
    ]).start(() => {
      if (!query.loading) {
        scaleOut()
      } else {
        rotateAndJump()
      }
    })
  }

  const scaleOut = () => {
    Animated.timing(
      scale,
      {
        duration: 500,
        toValue: 50,
        useNativeDriver: true
      }
    ).start(() => {
      mutation.animationComplete()
    })
  }

  useEffect(() => {
    Animated.spring(
      position,
      {
        toValue: 0,
        bounciness: 6,
        easing: Easing.bounce,
        useNativeDriver: true
      }
    ).start(() => {
      rotateAndJump()
    })
  }, [])

  useEffect(() => {
    if (!query.loading) { rotateAndJump() }
  }, [query.loading])

  return (
    <Animated.View
      style={[styles.square, {
        transform: [
          { translateY: position },
          { rotate: rotateData },
          { scale: scale }
        ]
      }]}
    />
  )
})

const styles = {
  square: {
    backgroundColor: '#1B9FC6',
    borderColor: 'white',
    borderWidth: 5,
    width: width / 7,
    height: width / 7,
    zIndex: 2
  }
}
