import React from 'react'
import { Image, Dimensions, Animated } from 'react-native'
import ContactInfo from '../components/contactInfo'
import SocialMedia from '../components/socialMedia'

const { height, width } = Dimensions.get('window')

const IMAGE_MAX_SIZE = 130
export const IMAGE_MIN_SIZE = 50
export const HEADER_MARGIN_TOP = (height / 3) / 2
const HEADER_WIDTH = width
const MAIN_TEXT_MAX_SIZE = 32
const MAIN_TEXT_MIN_SIZE = 20
const HEADER_MAX_HEIGHT = 350

export default ({ scroll }) => {
  const headerWidth = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0.90, 1],
    extrapolate: 'clamp'
  })

  const headerHeight = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [1, 70 / HEADER_MAX_HEIGHT],
    extrapolate: 'clamp'
  })

  const translateHeader = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -140],
    extrapolate: 'clamp'
  })

  const scaleImage = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP / 2, HEADER_MARGIN_TOP],
    outputRange: [1, 60 / IMAGE_MAX_SIZE, 50 / IMAGE_MAX_SIZE],
    extrapolate: 'clamp'
  })

  const imageTranslateX = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP / 2, HEADER_MARGIN_TOP],
    outputRange: [0, -width / 2 + IMAGE_MIN_SIZE / 2 + 25, -width / 2 + IMAGE_MIN_SIZE / 2 + 15],
    extrapolate: 'clamp'
  })

  const imageTranslateY = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, IMAGE_MIN_SIZE / 2 + 10],
    extrapolate: 'clamp'
  })

  const titleTranslateX = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -MAIN_TEXT_MIN_SIZE / MAIN_TEXT_MAX_SIZE - 20],
    extrapolate: 'clamp'
  })

  const titleTranslateY = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -IMAGE_MAX_SIZE / 2 - 5],
    extrapolate: 'clamp'
  })

  const subtitleTranslateX = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -MAIN_TEXT_MIN_SIZE / MAIN_TEXT_MAX_SIZE - 20],
    extrapolate: 'clamp'
  })

  const subtitleTranslateY = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -IMAGE_MAX_SIZE / 2 - 20],
    extrapolate: 'clamp'
  })

  const titleScale = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [1, MAIN_TEXT_MIN_SIZE / MAIN_TEXT_MAX_SIZE],
    extrapolate: 'clamp'
  })

  const contactInfoOpacity = scroll.interpolate({
    inputRange: [0, 35],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const socialMediaOpacity = scroll.interpolate({
    inputRange: [0, 18],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })

  const contactInfoTranslateY = scroll.interpolate({
    inputRange: [0, HEADER_MARGIN_TOP],
    outputRange: [0, -IMAGE_MAX_SIZE / 2 - 20],
    extrapolate: 'clamp'
  })

  return (
    <>
      <Animated.View
        style={[
          styles.mainCardContainer,
          {
            transform: [
              { translateY: translateHeader }
            ]
          }
        ]}
      >
        <Animated.View
          style={[
            styles.mainCard,
            {
              transform: [
                { scaleX: headerWidth },
                { scaleY: headerHeight }
              ]
            }
          ]}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.imageParentContainer,
          {
            transform: [
              { translateX: imageTranslateX },
              { translateY: imageTranslateY }
            ]
          }
        ]}
      >
        <Animated.View
          style={[
            styles.imageContainer,
            {
              transform: [
                { scale: scaleImage }
              ]
            }
          ]}
        >
          <Image
            source={require('../assets/media/profile.jpg')}
            style={{ flex: 1, width: null, height: null }}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          styles.mainTextContainer,
          {
            transform: [
              { translateX: titleTranslateX },
              { translateY: titleTranslateY }
            ]
          }
        ]}
      >
        <Animated.Text
          style={[
            styles.mainText,
            styles.textShadow,
            {
              transform: [
                { scale: titleScale }
              ]
            }
          ]}
          fontFamily='bold'
          numberOfLines={1}
        >
          Alfonso Gomez
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.subHeaderTextContainer,
          {
            transform: [
              { translateX: subtitleTranslateX },
              { translateY: subtitleTranslateY }
            ]
          }
        ]}
      >
        <Animated.Text
          style={[
            styles.subHeaderText,
            styles.textShadow,
            {
              transform: [
                { scale: titleScale }
              ]
            }
          ]}
          numberOfLines={2}
        >
          Senior JavaScript developer
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.contactInfoContainer,
          {
            opacity: contactInfoOpacity,
            transform: [
              { translateY: contactInfoTranslateY }
            ]
          }
        ]}
      >
        <ContactInfo data='stein.hakase.vs@gmail.com' icon='envelope' />
        <ContactInfo data='(505) 8682-6131' icon='phone' />
        <ContactInfo data='Managua, Nicaragua' icon='map-marker' />
      </Animated.View>
      <Animated.View style={[
        styles.socialMediaContainer,
        {
          opacity: socialMediaOpacity,
          transform: [
            { translateY: contactInfoTranslateY }
          ]
        }
      ]}
      >
        <SocialMedia icon='facebook' link='https://www.facebook.com/steinhakase22' deepLink='fb://profile/1001751782' />
        <SocialMedia icon='github' link='https://github.com/victorstein' />
        <SocialMedia icon='logo-npm' type='ionIcons' link='https://www.npmjs.com/~steinhakasevs' />
        <SocialMedia icon='logo-whatsapp' type='ionIcons' deepLink='https://wa.me/50586826131' />
      </Animated.View>
    </>
  )
}

const styles = {
  mainCardContainer: {
    alignItems: 'center',
    elevation: 4,
    zIndex: 2,
    marginTop: HEADER_MARGIN_TOP,
    position: 'absolute'
  },
  mainCard: {
    backgroundColor: '#1B9FC6',
    paddingHorizontal: HEADER_WIDTH * 0.05,
    paddingBottom: 30,
    width: HEADER_WIDTH,
    height: HEADER_MAX_HEIGHT
  },
  imageParentContainer: {
    position: 'absolute',
    marginTop: HEADER_MARGIN_TOP - IMAGE_MAX_SIZE / 2,
    elevation: 4,
    zIndex: 4
  },
  imageContainer: {
    height: IMAGE_MAX_SIZE,
    width: IMAGE_MAX_SIZE,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: IMAGE_MAX_SIZE / 2,
    overflow: 'hidden'
  },
  mainTextContainer: {
    position: 'absolute',
    marginTop: HEADER_MARGIN_TOP + IMAGE_MAX_SIZE / 2 + 10,
    zIndex: 4,
    elevation: 4
  },
  subHeaderTextContainer: {
    position: 'absolute',
    marginTop: HEADER_MARGIN_TOP + IMAGE_MAX_SIZE / 2 + MAIN_TEXT_MAX_SIZE + 20,
    zIndex: 4,
    elevation: 4
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
    textAlign: 'center'
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
  },
  contactInfoContainer: {
    position: 'absolute',
    width: width * 0.9,
    alignItems: 'center',
    paddingHorizontal: HEADER_WIDTH * 0.05,
    marginTop: HEADER_MARGIN_TOP + IMAGE_MAX_SIZE + 30,
    zIndex: 4,
    elevation: 4,
    alignSelf: 'center'
  },
  socialMediaContainer: {
    position: 'absolute',
    width: width * 0.9,
    justifyContent: 'center',
    paddingHorizontal: HEADER_WIDTH * 0.05,
    marginTop: HEADER_MARGIN_TOP + IMAGE_MAX_SIZE + 120,
    zIndex: 4,
    elevation: 4,
    flexDirection: 'row',
    alignSelf: 'center'
  }
}
