import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from './../screens/SplashScreen'
import SignInScreen from './../screens/SignInScreen'
import SignUpScreen from './../screens/SignUpScreen'

const Stack = createStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }} 
      initialRouteName='SplashScreen'>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator