import React from 'react'
import { TouchableOpacity } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Linking } from 'expo'

const SOCIAL_MEDIA_SIZE = 40

export default ({ icon, link = '', deepLink = 'undefined', type = 'fontAwesome' }) => (
  <TouchableOpacity
    style={styles.socialMedia}
    onPress={() => {
      Linking.openURL(deepLink)
        .catch((e) => {
          Linking.openURL(link)
        })
    }}
  >
    {
      type === 'fontAwesome'
        ? <FontAwesome
          size={20}
          name={icon}
          color='white'
        />
        : <Ionicons
          size={20}
          name={icon}
          color='white'
        />
    }
  </TouchableOpacity>
)

const styles = {
  socialMedia: {
    width: SOCIAL_MEDIA_SIZE,
    height: SOCIAL_MEDIA_SIZE,
    borderRadius: SOCIAL_MEDIA_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C4DAC',
    marginHorizontal: 4
  }
}
