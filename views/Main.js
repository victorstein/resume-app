import React, { useState } from 'react'
import { View, ScrollView, Dimensions, Animated, Image } from 'react-native'
import Overlay from '../components/overlay'
import MainCard from '../components/mainCard'
import Snackbar from '../components/snackbar'

const messages = [
  { duration: 2000, message: 'Welcome!' },
  { duration: 6000, message: 'Hope you don\'t mind, but I am currently using a simple script to send myself a notification to my mobile phone' },
  { duration: 4000, message: 'You know, just be sure that you opened my resume...' },
  { duration: 2000, message: 'Sending...' },
  { duration: 4500, message: 'All right! Ill let you read my resume and be delighted by it.' }
]

const { width, height } = Dimensions.get('window')

const BACKGROUND_MIN_HEIGHT = 70
const BACKGROUND_MAX_HEIGHT = height / 3

export default () => {
  const [state] = useState({
    scrollY: new Animated.Value(0)
  })

  const backgroundHeightData = state.scrollY.interpolate({
    inputRange: [0, BACKGROUND_MAX_HEIGHT - BACKGROUND_MIN_HEIGHT],
    outputRange: [BACKGROUND_MAX_HEIGHT, BACKGROUND_MIN_HEIGHT],
    extrapolate: 'clamp'
  })

  return (
    <View style={styles.background}>
      <Overlay />
      <Animated.View
        style={[styles.banner, { height: backgroundHeightData }]}
      >
        <Image
          source={require('../assets/media/background.jpg')}
          resizeMode='cover'
          style={{ width: width, height: BACKGROUND_MAX_HEIGHT }}
        />
      </Animated.View>
      <View style={{ alignItems: 'center' }}>
        { <MainCard scroll={state.scrollY} /> }
      </View>
      <ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center', width }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: state.scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: false
          }
        )}
      >
        <View style={{ height: 500, width: 300, backgroundColor: 'transparent' }} />
        <View style={{ height: 500, width: 300, backgroundColor: 'transparent' }} />
        <View style={{ height: 500, width: 300, backgroundColor: 'transparent' }} />
      </ScrollView>
      <Snackbar messages={messages} />
    </View>
  )
}

const styles = {
  banner: {
    width: width,
    position: 'absolute',
    overflow: 'hidden'
  },
  background: {
    backgroundColor: '#F5F5F5',
    flex: 1
  }
}
