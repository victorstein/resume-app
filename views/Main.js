import React, { useState } from 'react'
import { View, ScrollView, Dimensions, Animated, Image, SafeAreaView } from 'react-native'
import Overlay from '../components/overlay'
import MainCard, { HEADER_MARGIN_TOP } from '../components/mainCard'
import Snackbar from '../components/snackbar'

const messages = [
  { duration: 2000, message: 'Welcome!' },
  { duration: 6000, message: 'Hope you don\'t mind, but I am currently using a simple script to send myself a notification to my mobile phone' },
  { duration: 4000, message: 'You know, just be sure that you opened my resume...' },
  { duration: 2000, message: 'Sending...' },
  { duration: 4500, message: 'All right! Ill let you read my resume and be delighted by it.' }
]

const { width, height } = Dimensions.get('window')

const BACKGROUND_MAX_HEIGHT = height / 3

export default () => {
  const [state] = useState({
    scrollY: new Animated.Value(0)
  })

  return (
    <SafeAreaView style={styles.background}>
      <Overlay />
      <View style={{ alignItems: 'center' }}>
        <MainCard scroll={state.scrollY} />
      </View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center', width }}
        overScrollMode='never'
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
            useNativeDriver: true
          }
        )}
      >
        <Animated.View
          style={[
            styles.banner,
            {
              transform: [
                {
                  scaleY: state.scrollY.interpolate({
                    inputRange: [0, HEADER_MARGIN_TOP],
                    outputRange: [1, 70 / BACKGROUND_MAX_HEIGHT],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }
          ]}
        >
          <Image
            source={require('../assets/media/background.jpg')}
            resizeMode='cover'
            style={{ flex: 1, width: null, height: null }}
          />
        </Animated.View>
        <View style={{ height: 500, width: 300, backgroundColor: 'transparent' }} />
        <View style={{ height: 500, width: 300, backgroundColor: 'transparent' }} />
        <View style={{ height: 500, width: 300, backgroundColor: 'transparent' }} />
      </Animated.ScrollView>
      <Snackbar messages />
    </SafeAreaView>
  )
}

const styles = {
  banner: {
    width: width,
    position: 'absolute',
    overflow: 'hidden',
    height: BACKGROUND_MAX_HEIGHT
  },
  background: {
    backgroundColor: '#F5F5F5',
    flex: 1
  }
}
