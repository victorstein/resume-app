import React, { createContext, useState, useEffect } from 'react'
import { YellowBox, Image } from 'react-native'
import { Asset } from 'expo-asset'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import { Provider as PaperProvider } from 'react-native-paper'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Splash from './components/splash'
import Main from './views/Main'

export const MainStore = createContext()

export default () => {
  // ignore specific yellowbox warnings
  YellowBox.ignoreWarnings(['Require cycle:', 'Remote debugger'])

  const [state, setState] = useState({
    loading: true,
    animationComplete: false,
    loadingFonts: true
  })

  const cacheImages = (images) => {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image)
      } else {
        return Asset.fromModule(image).downloadAsync()
      }
    })
  }

  const loadFonts = async () => {
    let fonts = Font.loadAsync({
      'light': require('./assets/fonts/Raleway-Light.ttf'),
      'regular': require('./assets/fonts/Raleway-Regular.ttf'),
      'bold': require('./assets/fonts/Raleway-Bold.ttf')
    })
    return Promise.all([
      fonts
    ])
  }

  const loadAssets = async () => {
    try {
      await cacheImages([
        require('./assets/media/profile.jpg'),
        require('./assets/media/background.jpg')
      ])
      await Font.loadAsync(FontAwesome.font)
      await Font.loadAsync(Ionicons.font)
      setState({ ...state, loading: false })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {
        state.loadingFonts
          ? <AppLoading
            startAsync={loadFonts}
            onFinish={() => {
              setState({ ...state, loadingFonts: false })
            }}
            onError={(e) => console.log(e)}
          />
          : <MainStore.Provider value={{
            query: state,
            mutation: {
              stopLoading: () => setState({ ...state, loading: false }),
              animationComplete: () => setState({ ...state, animationComplete: true }),
              loadAssets: () => loadAssets()
            }
          }}>
            <PaperProvider>
              {
                state.animationComplete
                  ? <Main />
                  : <Splash />
              }
            </PaperProvider>
          </MainStore.Provider>
      }
    </>
  )
}
