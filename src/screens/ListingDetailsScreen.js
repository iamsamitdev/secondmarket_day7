import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { SliderBox } from "react-native-image-slider-box"

// Theme
import { colors } from '../themes/MainTheme'

// Component
import ListItem from './../components/lists/ListItem'

const ListingDetailsScreen = ({ navigation, route }) => {

  // รับค่า params
  const listing = route.params

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        
        <TouchableOpacity
          onPress={() => navigation.pop()}
          style={styles.closebtn}>
          <MaterialIcons name="cancel" size={30} color={colors.medium} />
        </TouchableOpacity>
        
        {/* <Image style={styles.image} source={listing.image} /> */}

        <SliderBox
          images={listing.images}
          sliderBoxHeight={300}
          onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        />
        
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.location}>{listing.location}</Text>
          <Text style={styles.price}>{'฿' + listing.price}</Text>

          <Text style={styles.titledesc}>รายละเอียดสินค้า</Text>
          <Text style={styles.detail}>{listing.description}</Text>

          <Text style={styles.titledesc}>ข้อมูลผู้ขาย</Text>
          <View style={styles.userContainer}>
            <ListItem
              image={require('../assets/images/samit.jpg')}
              title="Samit Koyom"
              subTitle1="เลขที่สมาชิก: 87459654"
              subTitle2="เป็นสมาชิกมาแล้ว: 4 ปี 0 เดือน 17 วัน"
            />
          </View>
        </View>

      </View>
    </ScrollView>
  )
}

export default ListingDetailsScreen

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  location: {
    fontSize: 18,
    color: colors.textholder,
  },
  price: {
    fontSize: 24,
    color: colors.textDark,
    fontWeight: 'bold',
    marginTop: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 10,
  },
  titledesc: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
  },
  closebtn: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 999,
  }
})
