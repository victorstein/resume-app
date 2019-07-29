import React from 'react'
import { Image, Dimensions, Animated } from 'react-native'
import ContactInfo from '../components/contactInfo'
import SocialMedia from '../components/socialMedia'
import Text from '../components/text'

const { height, width } = Dimensions.get('window')

const IMAGE_MAX_SIZE = 130
const IMAGE_MIN_SIZE = 50
const HEADER_MARGIN_TOP = (height / 3) / 2
const HEADER_MIN_WIDTH = width * 0.90
const HEADER_MAX_WIDTH = width
const MAIN_TEXT_MAX_SIZE = 32
const MAIN_TEXT_MIN_SIZE = 20
const HEADER_MAX_HEIGHT = 350
const HEADER_MIN_HEIGHT = 70

export default ({ scroll }) => {
  const headerWidth = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [HEADER_MIN_WIDTH, HEADER_MAX_WIDTH],
    extrapolate: 'clamp'
  })

  const headerHeight = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp'
  })

  const headerMarginTop = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [HEADER_MARGIN_TOP, 0],
    extrapolate: 'clamp'
  })

  const imageSize = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [IMAGE_MAX_SIZE, IMAGE_MIN_SIZE],
    extrapolate: 'clamp'
  })

  const imageLeftPosition = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [(HEADER_MIN_WIDTH / 2) - (IMAGE_MAX_SIZE / 2) - HEADER_MIN_WIDTH * 0.05, 0],
    extrapolate: 'clamp'
  })

  const imageTopPosition = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [-IMAGE_MAX_SIZE / 2, 10],
    extrapolate: 'clamp'
  })

  const textSize = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [MAIN_TEXT_MAX_SIZE, MAIN_TEXT_MIN_SIZE],
    extrapolate: 'clamp'
  })

  const textTopPosition = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -IMAGE_MIN_SIZE],
    extrapolate: 'clamp'
  })

  const opacitySocialMedia = scroll.interpolate({
    inputRange: [0, 15],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  const opacitySocialMediaCont = scroll.interpolate({
    inputRange: [0, 15],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const opacityContactInfo = scroll.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const opacitySubheaderCont = scroll.interpolate({
    inputRange: [79, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const opacitySubheader = scroll.interpolate({
    inputRange: [0, 60],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })

  return (
    <Animated.View
      style={[
        styles.mainCard,
        {
          width: headerWidth,
          height: headerHeight,
          top: 0,
          marginTop: headerMarginTop,
          position: 'absolute'
        }
      ]}
    >
      <Animated.View
        style={[
          styles.imageContainer,
          {
            width: imageSize,
            height: imageSize,
            left: imageLeftPosition,
            marginTop: imageTopPosition
          }
        ]}>
        <Image
          source={require('../assets/media/profile.jpg')}
          style={{ flex: 1, width: null, height: null }}
        />
      </Animated.View>
      <Animated.Text
        style={[
          styles.mainText,
          styles.textShadow,
          {
            fontSize: textSize,
            top: textTopPosition
          }
        ]}
        fontFamily='bold'
        numberOfLines={1}
      >
        Alfonso Gomez
      </Animated.Text>
      <Animated.View style={{ opacity: opacitySubheaderCont }}>
        <Text style={[ styles.subHeaderText, styles.textShadow ]} numberOfLines={2}>
          Senior{'\n'}JavaScript developer
        </Text>
        <Animated.View style={[styles.iconsOverlay, { opacity: opacitySubheader }]} />
      </Animated.View>
      <Animated.View style={{ width: '90%', alignItems: 'center', marginBottom: 20, alignSelf: 'center', opacity: opacityContactInfo }}>
        <ContactInfo data='stein.hakase.vs@gmail.com' icon='envelope' />
        <ContactInfo data='(505) 8682-6131' icon='phone' />
        <ContactInfo data='Managua, Nicaragua' icon='map-marker' />
      </Animated.View>
      <Animated.View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', opacity: opacitySocialMediaCont }}>
        <SocialMedia icon='facebook' link='https://www.facebook.com/steinhakase22' deepLink='fb://profile/1001751782' />
        <SocialMedia icon='github' link='https://github.com/victorstein' />
        <SocialMedia icon='logo-npm' type='ionIcons' link='https://www.npmjs.com/~steinhakasevs' />
        <SocialMedia icon='logo-whatsapp' type='ionIcons' deepLink='https://wa.me/50586826131' />
        <Animated.View style={[styles.iconsOverlay, { opacity: opacitySocialMedia }]} />
      </Animated.View>
    </Animated.View>
  )
}

const styles = {
  mainCard: {
    elevation: 4,
    backgroundColor: '#1B9FC6',
    width: '90%',
    paddingHorizontal: HEADER_MIN_WIDTH * 0.05,
    paddingBottom: 30,
    top: HEADER_MARGIN_TOP,
    marginTop: HEADER_MARGIN_TOP,
    zIndex: 2
  },
  imageContainer: {
    height: IMAGE_MAX_SIZE,
    width: IMAGE_MAX_SIZE,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: IMAGE_MAX_SIZE / 2,
    overflow: 'hidden',
    marginTop: -IMAGE_MAX_SIZE / 2,
    elevation: 4,
    marginBottom: 10,
    left: (HEADER_MIN_WIDTH / 2) - (IMAGE_MAX_SIZE / 2) - HEADER_MIN_WIDTH * 0.05
  },
  mainText: {
    color: 'white',
    fontSize: MAIN_TEXT_MAX_SIZE,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  subHeaderText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20
  },
  textShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  iconsOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1B9FC6',
    position: 'absolute'
  }
}
