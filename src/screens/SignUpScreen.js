import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import MainTheme, { colors } from '../themes/MainTheme'
import { Overlay } from 'react-native-elements'

import { AuthContext } from './../store/Context'

import { auth } from './../firebase/firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth"

const SignUpScreen = ({ navigation }) => {

  // สร้างตัวแปรรับค่าจากฟอร์ม
  const [data, setData] = useState({
    email: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
    isValidPasswordMatch: true
  })

  const [visible, setVisible] = useState(false)
  const [formError, setFormError] = useState(false)
  const [signUpError, setSignUpError] = useState(false)
  const [signUpSuccess, setSignUpSuccess] = useState(false)

  // เรียกใช้งาน Context
  const { signUp } = useContext(AuthContext)

  const textEmailChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      })
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      })
    }
  }

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

  const handleConfirmPasswordChange = val => {
    if (val.trim().length >= 8) {
      if(val != data.password){
        setData({
          ...data,
          confirm_password: val,
          isValidConfirmPassword: true,
          isValidPasswordMatch: false
        })
      }else{
        setData({
          ...data,
          confirm_password: val,
          isValidConfirmPassword: true,
          isValidPasswordMatch: true
        })
      }
    } else {
      setData({
        ...data,
        confirm_password: val,
        isValidConfirmPassword: false,
        isValidPasswordMatch: true
      })
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    })
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    })
  }

  const registerHandle = (email, password) => {
    if (!data.isValidEmail || !data.isValidPassword || (data.email.length == 0 || data.password.length == 0 || data.confirm_password == 0 || data.password != data.confirm_password)) {
      setVisible(true)
      setFormError(true)
      return
    }else{
      console.log(data.email+ data.password)
      createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(JSON.stringify(user, null, 2))
        setVisible(true)
        setFormError(false)
        setSignUpError(false)
        setSignUpSuccess(true)

        // Register Success เรียก method signup
        signUp(data.email, user.stsTokenManager.accessToken)

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        setVisible(true)
        setFormError(false)
        setSignUpError(true)
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
            <Text style={styles.subtitle}>ป้อนอีเมล์และรหัสผ่านให้ถูกต้องก่อน</Text>
          </View>
        </Overlay> : null
      }

      {
        signUpError ? 
        <Overlay isVisible={visible} onBackdropPress={()=>setVisible(false)}>
          <View style={{padding: 20,}}>
            <Text style={styles.title}>มีข้อผิดพลาด</Text>
            <Text style={styles.subtitle}>ไม่สามารถลงทะเบียนได้</Text>
          </View>
        </Overlay> : null
      }

      {
        signUpSuccess ? 
        <Overlay isVisible={visible} onBackdropPress={()=>setVisible(false)}>
          <View style={{padding: 20,}}>
            <Text style={styles.title}>สำเร็จ</Text>
            <Text style={styles.subtitle}>ลงทะเบียนเรียบร้อยแล้ว</Text>
          </View>
        </Overlay> : null
      }

      <StatusBar backgroundColor={colors.background} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>ลงทะเบียนฟรี!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>อีเมล์</Text>

          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder="ป้อนอีเมล์"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textEmailChange(val)}
            />

            {
              data.check_textInputChange ? 
              <Animatable.View animation="bounceIn">
                  <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                  />
              </Animatable.View>
              : null
            }

          </View>

          {
          data.isValidEmail ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
            <Text style={styles.errorMsg}>
              อีเมล์ต้องไม่น้อยกว่า 4 ตัวอักษร
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
            รหัสผ่าน
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.textDark} size={20} />
            <TextInput
              placeholder="ป้อนรหัสผ่าน"
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

          {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeftBig" duration={500}>
            <Text style={styles.errorMsg}>
              รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร
            </Text>
          </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}>
            ยืนยันรหัสผ่าน
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.textDark} size={20} />
            <TextInput
              placeholder="ป้อนยืนยันรหัสผ่าน"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
            </TouchableOpacity>
          </View>

          {
            data.isValidConfirmPassword ? null : (
            <Animatable.View animation="fadeInLeftBig" duration={500}>
              <Text style={styles.errorMsg}>
                รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร
              </Text>
            </Animatable.View>
            )
          }

          {
          data.isValidPasswordMatch ? null : (
          <Animatable.View animation="fadeInLeftBig" duration={500}>
            <Text style={styles.errorMsg}>
              ต้องป้อนรหัสผ่านยืนยันให้ตรงกัน
            </Text>
          </Animatable.View>
          )
          }
          

          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>ท่านรับทราบและยอมรับ</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              เงื่อนไข
            </Text>
            <Text style={styles.color_textPrivate}> และ</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>
              {' '}
              นโนบายการใช้งาน
            </Text>
          </View>
          <View style={styles.button}>

            <TouchableOpacity 
              style={styles.signIn} 
              onPress={() => {
                registerHandle(data.email, data.password)
              }}>
              <LinearGradient
                colors={[colors.background1, colors.background]}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: colors.textLight,
                    },
                  ]}>
                  ลงทะเบียน
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              // onPress={() => navigation.goBack()}
              onPress={() => navigation.navigate('SignInScreen')}
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
                เข้าสู่ระบบ
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  )
}

export default SignUpScreen

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
    flex: Platform.OS === 'ios' ? 3 : 5,
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
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: colors.background,
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
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  title:{
    fontSize: 20,
    paddingBottom: 20
  },
  subtitle: {
    fontSize: 16
  }
})
