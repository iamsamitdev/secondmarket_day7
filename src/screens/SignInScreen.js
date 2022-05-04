import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MainTheme, { colors } from '../themes/MainTheme'
import Users from '../models/users'

import { Overlay } from 'react-native-elements'

// Import Auth Context
import { AuthContext } from './../store/Context'

// Import Firebase Config
import { auth  } from './../firebase/firebase-config'

// Import createUserWithEmailAndPassword form firebase/auth
import { signInWithEmailAndPassword } from "firebase/auth"

const SignInScreen = ({navigation}) => {

  // สร้างตัวแปรแบบ State ไว้รับค่าจากฟอร์ม
  const [data, setData] = useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  })

  // เรียกใช้งาน Context
  const { signIn } = useContext(AuthContext)

  // สร้งตัวแปร State ไว้ซ่อนแสดง modal
  const [visible, setVisible] = useState(false)
  const [formError, setFormError] = useState(false)
  const [signInError, setSignInError] = useState(false)
  const [signInSuccess, setSignInSuccess] = useState(false)

  // สร้างฟังก์ชันสำหรับเช็คการป้อนข้อมูลในช่อง Username
  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      })
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      })
    }
  }

  // สร้างฟังก์ชันสำหรับเช็คการป้อนข้อมูลในช่อง Password
   const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      })
    }
  }

  // สร้างฟังก์ชันสำหรับซ่อนแสดงรหัสผ่าน
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    })
  }

  // สร้างฟังก์ชันสำหรับ handleLogin
  const loginHandle = (userName, password) => {

    // const foundUser = Users.filter(item => {
    //   return userName == item.username && password == item.password
    // })

    if (!data.isValidUser || !data.isValidPassword || (data.username.length == 0 || data.password.length == 0)) {
      // Alert.alert(
      //   'มีข้อผิดพลาด',
      //   'ป้อนข้อมูลผู้ใช้และรหัสผ่านให้ถูกต้องก่อน',
      //   [{ text: 'ตกลง' }],
      // )
      setVisible(true)
      setFormError(true)
      return
    }else{

    // if (foundUser.length == 0) {
    //   // Alert.alert(
    //   //   'มีข้อผิดพลาด', 
    //   //   'ไม่พบชื่อผู้ใช้และรหัสผ่านนี้', 
    //   //   [{ text: 'ตกลง' }])
    //   setVisible(true)
    //   setFormError(false)
    //   setSignInError(true)
    //   return
    // }else{
      
      // Alert.alert(
      //   'สำเร็จ', 
      //   'ข้อมูลเข้าระบบถูกต้อง', 
      //   [{ text: 'ตกลง' }])

      // setVisible(true)
      // setFormError(false)
      // setSignInError(false)
      // setSignInSuccess(true)

      // signIn(foundUser)
      // return

      signInWithEmailAndPassword(auth, data.username, data.password)
      .then(result => {
        // Signed in
        const user = result.user
        console.log(JSON.stringify(user, null, 2))

        setVisible(true)
        setFormError(false)
        setSignInError(false)

        signIn(data.username, user.stsTokenManager.accessToken)
        return

      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
        setVisible(true)
        setFormError(false)
        setSignInError(true)
      })


    }

  }

  return (
    <View style={styles.container}>

      {
        formError ? 
        <Overlay isVisible={visible} onBackdropPress={()=>setVisible(false)}>
          <View style={{padding: 20,}}>
            <Text style={styles.title}>มีข้อผิดพลาด</Text>
            <Text style={styles.subtitle}>ป้อนข้อมูลผู้ใช้และรหัสผ่านให้ถูกต้องก่อน</Text>
          </View>
        </Overlay> : null
      }

      {
        signInError ? 
        <Overlay isVisible={visible} onBackdropPress={()=>setVisible(false)}>
          <View style={{padding: 20,}}>
            <Text style={styles.title}>มีข้อผิดพลาด</Text>
            <Text style={styles.subtitle}>ไม่พบชื่อผู้ใช้และรหัสผ่านนี้</Text>
          </View>
        </Overlay> : null
      }

      {
        signInSuccess ? 
        <Overlay isVisible={visible} onBackdropPress={()=>setVisible(false)}>
          <View style={{padding: 20,}}>
            <Text style={styles.title}>สำเร็จ</Text>
            <Text style={styles.subtitle}>ข้อมูลเข้าระบบถูกต้อง</Text>
          </View>
        </Overlay> : null
      }

      
      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.text_header}>ยินดีต้อนรับ</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        duraton="500"
        style={styles.footer}>

        <Text
          style={styles.text_footer}>
          Username
        </Text>

        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="ป้อนชื่อผู้ใช้"
            placeholderTextColor={colors.textholder}
            style={[
              styles.textInput,
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
          />
          {
            data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
            ): null
          }
        </View>

        {
          data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <Text style={styles.errorMsg}>
                ชื่อผู้ใช้ต้องไม่น้อยกว่า 4 ตัวอักษร
              </Text>
            </Animatable.View>
          )
        }

        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 35,
            },
          ]}>
          Password
        </Text>

        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="ป้อนรหัสผ่าน"
            placeholderTextColor={colors.textholder}
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>

        {
          data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <Text style={styles.errorMsg}>
                รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร
              </Text>
            </Animatable.View>
          )
        }

        <TouchableOpacity>
          <Text style={{ color: colors.background, marginTop: 15 }}>
            ฉันลืมรหัสผ่าน ?
          </Text>
        </TouchableOpacity>

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.username, data.password)
            }}>
            <LinearGradient
              colors={[colors.background1, colors.background]}
              style={styles.signIn}>
              <Text
                style={styles.textSign}>
                เข้าสู่ระบบ
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {
                // borderColor: colors.background,
                // borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textSign,
                {
                  color: colors.background,
                },
              ]}>
              ลงทะเบียน
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: colors.textLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: colors.textLight,
    // fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: colors.background,
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.forground3,
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.background2,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: colors.textDark,
  },
  errorMsg: {
    color: colors.background2,
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: colors.textLight,
  },
  title:{
    fontSize: 20,
    paddingBottom: 20
  },
  subtitle: {
    fontSize: 16
  }
})