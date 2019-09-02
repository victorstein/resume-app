import React, { useRef } from 'react'
import { View, Dimensions, Animated, Image, SafeAreaView, Text } from 'react-native'
import Overlay from '../components/overlay'
import MainCard, { HEADER_MARGIN_TOP, IMAGE_MIN_SIZE } from '../components/mainCard'
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
  const scrollY = new Animated.Value(0)

  const ANIMATED_SCROLLVIEW = useRef()

  const snapToPlace = Animated.event([
    {
      nativeEvent: {
        contentOffset: {
          y: new Animated.Value(0)
        }
      }
    }
  ], {
    useNativeDriver: true,
    listener: (e) => {
      if (e.nativeEvent.contentOffset.y < HEADER_MARGIN_TOP / 2) {
        ANIMATED_SCROLLVIEW.current._component.scrollTo({
          y: 0,
          animated: true
        })
      } else if (e.nativeEvent.contentOffset.y >= HEADER_MARGIN_TOP / 2 &&
        e.nativeEvent.contentOffset.y < HEADER_MARGIN_TOP) {
        ANIMATED_SCROLLVIEW.current._component.scrollTo({
          y: HEADER_MARGIN_TOP,
          animated: true
        })
      }
    }
  })

  const replacementHeaderOpacity = scrollY.interpolate({
    inputRange: [HEADER_MARGIN_TOP + 1, HEADER_MARGIN_TOP + 1],
    outputRange: [0, 1]
  })

  return (
    <SafeAreaView style={styles.background}>
      <Overlay />
      <Animated.View style={[styles.replacementHeader, { opacity: replacementHeaderOpacity }]}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/media/profile.jpg')}
            style={{ flex: 1, width: null, height: null }}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', marginTop: -2 }}>
          <Text style={[styles.mainText, styles.textShadow]}>Alfonso Gomez</Text>
          <Text style={[styles.subHeaderText, styles.textShadow, { marginLeft: 3, marginTop: -2 }]}>
            Senior Javascript developer
          </Text>
        </View>
      </Animated.View>
      <Animated.ScrollView
        scrollEventThrottle={16}
        contentContainerStyle={{ alignItems: 'center', width }}
        overScrollMode='never'
        ref={ANIMATED_SCROLLVIEW}
        onMomentumScrollEnd={snapToPlace}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ],
          {
            useNativeDriver: true
          }
        )}
      >
        <View style={{ alignItems: 'center' }}>
          {<MainCard scroll={scrollY} />}
        </View>
        <Animated.View
          style={[
            styles.banner,
            {
              transform: [
                {
                  scaleY: scrollY.interpolate({
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
      <Snackbar messages={messages} />
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
  },
  replacementHeader: {
    backgroundColor: '#1B9FC6',
    width: '100%',
    height: 70,
    position: 'absolute',
    top: 0,
    zIndex: 4,
    elevation: 4,
    flexDirection: 'row'
  },
  imageContainer: {
    height: IMAGE_MIN_SIZE,
    width: IMAGE_MIN_SIZE,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: IMAGE_MIN_SIZE / 2,
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: 15,
    marginRight: 14
  },
  mainText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subHeaderText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  }
}
