import React from 'react'
import { View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const SOCIAL_MEDIA_SIZE = 40

export default ({ icon, link }) => (
  <View style={styles.socialMedia}>
    <FontAwesome
      size={20}
      name={icon}
      color='white'
    />
  </View>
)

const styles = {
  socialMedia: {
    width: SOCIAL_MEDIA_SIZE,
    height: SOCIAL_MEDIA_SIZE,
    borderRadius: SOCIAL_MEDIA_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C4DAC',
    elevation: 4,
    marginHorizontal: 4
  }
}
