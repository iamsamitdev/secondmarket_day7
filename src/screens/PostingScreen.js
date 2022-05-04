import React from "react"
import { StyleSheet, ScrollView, Alert } from "react-native"
import * as Yup from "yup"

import {
  Form,
  FormField,
  SubmitButton,
} from "../components/forms"
import Screen from "../components/Screen"
import FormImagePicker from "../components/forms/FormImagePicker"

// Firebase
import { db, storage } from './../firebase/firebase-config'
import { collection, doc, addDoc } from 'firebase/firestore/lite'
import { ref, uploadBytes } from "firebase/storage"

const validationSchema = Yup.object().shape({
  title: Yup.string().required('ป้อนชื่อสินค้าก่อน').min(1).label("Title"),
  location: Yup.string().required('ป้อนสถานที่ก่อน').min(1).label("Location"),
  price: Yup.number().required('ป้อนราคาก่อน').min(1, 'ราคาต้องมากกว่า 0').max(1000000).label("Price"),
  description: Yup.string().required('ป้อนราคาก่อน').min(1).label("Description"),
  images: Yup.array().min(1, "เลือกรูปสินค้าอย่างน้อย 1 รูปก่อน"),
})

// สร้างฟังก์ชันสำหรับอ่าน path รูปแล้วแปลงเป็น Blob
const getPictureBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
}

const PostingScreen = ({ navigation }) => {

  // สร้างฟังก์ชันสำหรับ SubmitForm ส่งข้อมูลเข้า FireStore
  const handleSubmit = async (productData) => {

    // การอัพโหลดไฟล์เข้าสู่ firebase storage
    const fileURL = productData.images[0]
    const file = await getPictureBlob(fileURL)
    const filename = fileURL.substring(fileURL.lastIndexOf('/') + 1) // การตัดชื่อไฟล์ออกมา
    const fileRef = ref(storage, filename)

    uploadBytes(fileRef, file).then( async(snapshot) => {
      console.log('Uploaded image success');
      console.log(JSON.stringify(snapshot, null, 2))

      // Path Image Storage
      productData.images[0] = 'https://firebasestorage.googleapis.com/v0/b/'+snapshot.ref._location.bucket+'/o/'+snapshot.ref._location.path_+'?alt=media'

      // console.log(JSON.stringify(productData, null, 2))
      // ทดสอบบันทึกข้อมูลไปยัง firestore
      const docRef = await addDoc(collection(db, 'products'),productData)
      // console.log("Document written with ID: ", docRef.id)

      Alert.alert(
        'สำเร็จ', 
        'ลงประกาศสินค้าเรียบร้อยแล้ว', 
        [
          {
            text: "ตกลง",
            onPress: () => navigation.navigate("Feed", {screen: 'Listings'}),
          },
        ]
      )

    })

  }

  return (
    <Screen style={styles.container}>
      <ScrollView>
        <Form
          initialValues={{
            id: Math.floor(100000 + Math.random() * 900000),
            title: "",
            location: "",
            price: "",
            description: "",
            images: [],
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}
        >
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="ชื่อสินค้า"/>
          <FormField maxLength={128} name="location" placeholder="สถานที่"/>
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="ราคา"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="รายละเอียดสินค้า"
          />
          <SubmitButton title="ลงประกาศ" />
        </Form>
      </ScrollView>
    </Screen>
  )
}

export default PostingScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})