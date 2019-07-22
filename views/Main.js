import React, { useState } from 'react'
import { View, ScrollView, Dimensions, Animated, Image } from 'react-native'
import Overlay from '../components/overlay'
import MainCard from '../components/mainCard'

const { width, height } = Dimensions.get('window')

const HEADER_MIN_HEIGHT = height / 8
const HEADER_MAX_HEIGHT = height / 3
const HEADER_MIN_WIDTH = width * 0.90
const HEADER_MAX_WIDTH = width

export default () => {
  const [state] = useState({
    scrollY: new Animated.Value(0)
  })

  const headerHeightData = state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  })

  const headerWidthData = state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MIN_WIDTH, HEADER_MAX_WIDTH],
    extrapolate: 'clamp'
  })

  const dataOpacity = state.scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  return (
    <View style={styles.background}>
      <Overlay />
      <Animated.View
        style={[styles.banner, { height: headerHeightData }]}
      >
        <Image
          source={require('../assets/media/background.jpg')}
          resizeMode='cover'
          style={{ width: width, height: HEADER_MAX_HEIGHT }}
        />
      </Animated.View>
      <ScrollView
        style={styles.mainContainer}
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center' }}
        onScroll={Animated.event(
          [{
            nativeEvent: {
              contentOffset: {
                y: state.scrollY
              }
            }
          }]
        )}
      >
        <MainCard style={{ width: headerWidthData }} dataOpacity={dataOpacity} />
      </ScrollView>
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
  },
  mainContainer: {
    backgroundColor: 'transparent'
  }
}
