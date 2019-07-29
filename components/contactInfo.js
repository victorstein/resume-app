import React from 'react'
import { View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Text from './text'

export default ({ data, icon }) => (
  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', marginBottom: 5 }}>
    <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' }}>
      <FontAwesome
        name={icon}
        color='white'
        size={16}
      />
    </View>
    <View style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
      <Text style={[styles.regularText]} fontFamily='light'>
        {data}
      </Text>
    </View>
  </View>
)

const styles = {
  regularText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10
  }
}
