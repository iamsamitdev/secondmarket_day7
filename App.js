import React, { useEffect } from 'react'
import Navigation from './src/navigations/Navigation'
import GlobalFont from 'react-native-global-font'

const App = () => {

  useEffect(() => {
    let fontName = 'NotoSansThai-Regular'
    GlobalFont.applyGlobal(fontName)
  }, [])

  return <Navigation />
}

export default App