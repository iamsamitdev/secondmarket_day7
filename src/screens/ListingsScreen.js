import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList} from 'react-native'

// Theme
import { colors } from '../themes/MainTheme'

// Component
import Screen from './../components/Screen'
import Card from './../components/Card'

// Firebase
import { db } from './../firebase/firebase-config'
import { collection, getDocs, doc, setDoc  } from 'firebase/firestore/lite'

/*
const listings = [
  {
    id: 1,
    title: 'React Naitve cookbook',
    location: 'เมืองสมุทรปราการ',
    price: '285.00',
    detail: 'This preliminary version of the book focuses on the basic knowledge of Docker. It starts by briefly explaining the infrastructure of the solution, through its architecture, installation, basic commands, understanding and construction of images and containers, use of advanced commands, even manipulation of cloud environments',
    images: [
      require('../assets/images/react_native.jpg'),
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree"
    ]
  },
  {
    id: 2,
    title: 'Flutter for beginner',
    location: 'เมืองระยอง',
    price: '185.00',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum exercitationem doloribus aliquam totam ex itaque placeat blanditiis rem perspiciatis quidem, excepturi maxime possimus ad, quis esse ratione commodi numquam nihil fuga vero laudantium facere! Voluptate cupiditate et error inventore impedit eum? Consequuntur in quis consectetur quisquam, laboriosam rerum eum illo maiores quos voluptas tenetur deserunt adipisci velit quia nulla doloribus aliquid consequatur minus porro tempore aut enim! Veniam dolore quidem, eaque deleniti rem reiciendis eveniet ratione quasi fugiat necessitatibus eligendi ad assumenda praesentium laborum exercitationem unde blanditiis, quas adipisci veritatis libero mollitia accusamus sunt? Mollitia vero molestiae optio exercitationem ad',
    images: [
      require('../assets/images/flutter-apprentice.png'),
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree"
    ]
  },
  {
    id: 3,
    title: 'Mastering Node.JS',
    location: 'อ.ดอนตูม ขอนแก่น',
    price: '405.00',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum exercitationem doloribus aliquam totam ex itaque placeat blanditiis rem perspiciatis quidem, excepturi maxime possimus ad, quis esse ratione commodi numquam nihil fuga vero laudantium facere! Voluptate cupiditate et error inventore impedit eum? Consequuntur in quis consectetur quisquam, laboriosam rerum eum illo maiores quos voluptas tenetur deserunt',
    images: [
      require('../assets/images/master_nodejs.jpg'),
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree"
    ]
  },
  {
    id: 4,
    title: 'Expert Angular',
    location: 'หาดใหญ่ สงขลา',
    price: '220.00',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum exercitationem doloribus aliquam totam ex itaque placeat blanditiis rem perspiciatis quidem, excepturi maxime possimus ad, quis esse ratione commodi numquam nihil fuga vero laudantium facere! Voluptate cupiditate et error inventore impedit eum? Consequuntur in quis consectetur quisquam, laboriosam rerum eum illo maiores quos voluptas tenetur deserunt',
    images: [
      require('../assets/images/angular.jpg'),
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree"
    ]
  },
  {
    id: 5,
    title: 'Vue JS 2',
    location: 'ลาดพร้าว กรุงเทพฯ',
    price: '249.00',
    detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum exercitationem doloribus aliquam totam ex itaque placeat blanditiis rem perspiciatis quidem, excepturi maxime possimus ad, quis esse ratione commodi numquam nihil fuga vero laudantium facere! Voluptate cupiditate',
    images: [
      require('../assets/images/vuejs.jpg'),
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree"
    ]
  },
  {
    id: 6,
    title: 'Docker for developers',
    location: 'เมืองเชียงใหม่',
    price: '380.00',
    detail: 'This preliminary version of the book focuses on the basic knowledge of Docker. It starts by briefly explaining the infrastructure of the solution, through its architecture, installation, basic commands, understanding and construction of images and containers, use of advanced commands, even manipulation of cloud environments',
    images: [
      require('../assets/images/docker_developer.png'),
      "https://source.unsplash.com/1024x768/?nature",
      "https://source.unsplash.com/1024x768/?water",
      "https://source.unsplash.com/1024x768/?girl",
      "https://source.unsplash.com/1024x768/?tree"
    ]
  },
]
*/

const ListingsScreen = ({ navigation }) => {

  // สร้างตัวแปรแบบ State ไว้เก็บข้อมูลสินค้าที่ได้จาก Firebase
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProduct()
  }, [])

  // Get Product
  const getProduct = async () => {

    const productCollection = collection(db, 'products')
    const productSnapshot = await getDocs(productCollection)
    const productList = productSnapshot.docs.map(doc => doc.data())

    // console.log(JSON.stringify(productList, null, 2))
    setProducts(productList)

  }
  
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={products}
        keyExtractor={product => product.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            location={item.location}
            price={'฿' + item.price}
            image={item.images[0]}
            onPress={() => navigation.navigate('ListingDetails', item)}
          />
        )}
      />
    </Screen>
  )
}

export default ListingsScreen

const styles = StyleSheet.create({
  screen: {
    padding: 0,
    backgroundColor: colors.light,
  },
})
