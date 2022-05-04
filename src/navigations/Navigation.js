import React, { useEffect, useMemo, useReducer } from 'react'
import { View, ActivityIndicator } from 'react-native'

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage'

import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'

// Import Auth Context
import { AuthContext } from './../store/Context'

import AppNavigator from './AppNavigator';

const Navigation = () => {

  // สร้างตัวแปรแบบ State ไว้เก็บสถานะการ Loading 
  // const [isLoading, setIsLoading] = useState(true)

  // สร้างตัวแปร State ไว้ทดสอบเก็บ Token
  // const [userToken, setUserToken] = useState(null)

  // สร้างตัวแปรแบบ initialloginState
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userEmail: null,
    userToken: null,
  }

  // สร้าง Action สำหรับไว้ให้ Reducer เรียกทำงาน
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        }
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        }
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        }
      case 'REGISTER': 
        return {
          ...prevState,
          userEmail: action.id,
          userToken: action.token,
          isLoading: false,
        }
    }
  }

  // กำหนดค่าลง Reducer
  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  // เรียกใช้ useEffect เพื่อเรียกทำงานฟังก์ชัน Loading
  useEffect(() => {
    setTimeout( async() => {
      loginState.isLoading = false
      let userToken;
      userToken = null;
      try {
        // อ่านค่าใน AsyncStorage
        userToken = await AsyncStorage.getItem('userToken')
      } catch(e) {
        console.log(e);
      }
      // ทำการเรียก Action RETRIEVE_TOKEN
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken })
    }, 1000)
  }, [])

  // เพิ่มการใช้งาน useMemo เก็บค่าฟังก์ชันและตัวแปรต่างๆ ไว้ เมื่อโหลด component ครั้งแรก
  const authContextValue = useMemo(()=>({

    signIn: async(email, token) => {
      const userToken = token
      const userName = email
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken })
    },

    signUp: async(email, token)=>{
      const userToken = token
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'REGISTER', id: email, token: userToken })
    },

    signOut: async()=>{

      try {
        // เก็บข้อมูล token ลง AsyncStorage
        await AsyncStorage.removeItem('userToken');
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'LOGOUT' });

      // setUserToken(null)
      // setIsLoading(false)
    },

  }),[])

  // ลองเรียกดู userToken
  // console.log(loginState.userToken)
  
  // แสดง loading ขึ้นมา
  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View>
    )
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer>
        {/* <AuthNavigator /> */}
        {
          loginState.userToken !== null ? <AppNavigator />: <AuthNavigator />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default Navigation