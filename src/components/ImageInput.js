import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'react-native-image-picker'

// Theme
import { colors } from '../themes/MainTheme'

function ImageInput({ imageUri, onChangeImage }) {

  useEffect(() => {
    // requestPermission()
  }, [])

  // const requestPermission = async () => {
  //   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  //   if(granted === PermissionsAndroid.RESULTS.GRANTED) {
  //     // if get here, the user has accepted the permissions
  //     selectImage()
  //   } else {
  //     // if get here, the user did NOT accepted the permissions
  //     alert("You need to enable permission to access the library.")
  //   }
  // }

  // const requestPermission = async () => {
  //   const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
  //   if (!granted) alert('You need to enable permission to access the library.')
  // }

  const handlePress = () => {
    if (!imageUri) selectImage()
    else
      Alert.alert('ลบรายการ', 'ต้องการลบภาพนี้หรือไม่ ?', [
        { text: 'ใช่ลบเลย', onPress: () => onChangeImage(null) },
        { text: 'ไม่เก็บไว้' },
      ])
  }

  const selectImage = async () => {
    try {

      const result = await ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 800,
          maxWidth: 800,
        },
        (res) => {
          console.log(res)
          if (!res.didCancel) {
            onChangeImage(res.uri)
          }
        },
      )
      
    } catch (error) {
      console.log('Error reading an image', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialIcons color={colors.medium} name="camera" size={40} />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#cfd8dc',
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    marginVertical: 10,
    overflow: 'hidden',
    width: 100,
  },
  image: {
    height: '100%',
    width: '100%',
  },
})

export default ImageInput