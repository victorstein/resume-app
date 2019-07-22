import React from 'react'
import { View, Image, Dimensions, Text, Animated } from 'react-native'
import ContactInfo from '../components/contactInfo'
import SocialMedia from '../components/socialMedia'

const { height } = Dimensions.get('window')

const IMAGE_SIZE = 130

export default ({ style, dataOpacity }) => {
  return (
    <Animated.View style={[styles.mainCard, style]}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/media/profile.jpg')}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
      <Text style={[ styles.mainText, styles.textShadow ]}>
        Alfonso Gomez
      </Text>
      <Text style={[ styles.subHeaderText, styles.textShadow ]}>
        JavaScript developer
      </Text>
      <Animated.View style={{ width: '90%', alignItems: 'center', marginBottom: 20, opacity: dataOpacity }}>
        <ContactInfo data='stein.hakase.vs@gmail.com' icon='envelope' />
        <ContactInfo data='8682-6131' icon='phone' />
        <ContactInfo data='Managua, Nicaragua' icon='map-marker' />
      </Animated.View>
      <View style={{ flexDirection: 'row' }}>
        <SocialMedia icon='facebook' link='' />
        <SocialMedia icon='github' link='' />
        <SocialMedia icon='mobile' link='' />
        <SocialMedia icon='code' link='' />
      </View>
    </Animated.View>
  )
}

const styles = {
  mainCard: {
    elevation: 4,
    backgroundColor: '#1B9FC6',
    width: '90%',
    paddingHorizontal: '5%',
    paddingBottom: 30,
    marginTop: (height / 3) / 2,
    alignItems: 'center'
  },
  imageContainer: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: IMAGE_SIZE / 2,
    overflow: 'hidden',
    marginTop: -IMAGE_SIZE / 2,
    elevation: 4,
    marginBottom: 10
  },
  mainText: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center'
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
  }
}
