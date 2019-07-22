import React from 'react'
import { View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default ({ data, icon }) => (
  <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
    <View style={{ width: '15%', alignItems: 'flex-end', justifyContent: 'center' }}>
      <FontAwesome
        name={icon}
        color='white'
        size={16}
      />
    </View>
    <View style={{ width: '85%', alignItems: 'flex-start', justifyContent: 'center' }}>
      <Text style={styles.regularText}>
        {data}
      </Text>
    </View>
  </View>
)

const styles = {
  regularText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  }
}
