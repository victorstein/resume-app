import React, { memo, useEffect, useContext } from 'react'
import { View } from 'react-native'
import Square from './square'
import Overlay from './overlay'
import Text from './text'
import { MainStore } from '../App'

export default memo((props) => {
  const { mutation } = useContext(MainStore)

  useEffect(() => {
    mutation.loadAssets()
  }, [])

  return (
    <>
      <Overlay />
      <View
        style={styles.splashScreen}
      >
        <Square />
        <Text
          style={[
            styles.mainText,
            styles.textShadow
          ]}
          fontFamily='bold'
        >
          Alfonso Gomez
        </Text>
        <Text
          style={[
            styles.subHeaderText,
            styles.textShadow
          ]}
        >
          JavaScript developer
        </Text>
      </View>
    </>
  )
})

const styles = {
  splashScreen: {
    backgroundColor: '#1B9FC6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%'
  },
  mainText: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center'
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
  }
}
