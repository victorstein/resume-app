import React, { createContext, useState, useEffect } from 'react'
import { YellowBox } from 'react-native'
import Splash from './components/splash'
import Main from './views/Main'

export const MainStore = createContext()

export default () => {
  // ignore specific yellowbox warnings
  YellowBox.ignoreWarnings(['Require cycle:', 'Remote debugger'])

  const [state, setState] = useState({
    loading: true,
    animationComplete: false
  })

  useEffect(() => {
    setTimeout(_ => setState({ loading: false }), 0)
  }, [])

  return (
    <MainStore.Provider value={{
      query: state,
      mutation: {
        stopLoading: () => setState({ ...state, loading: false }),
        animationComplete: () => setState({ ...state, animationComplete: true })
      }
    }}>
      {
        state.animationComplete
          ? <Main />
          : <Splash />
      }
    </MainStore.Provider>
  )
}
