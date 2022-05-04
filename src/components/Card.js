import React from 'react'
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native'
import { colors } from '../themes/MainTheme'

function Card({ title, location, price, image, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image style={styles.image} source={{uri:image}} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.location} numberOfLines={1}>
            {location}
          </Text>
          <Text style={styles.price} numberOfLines={1}>
            {price}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    // width: '45%',
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    overflow: 'hidden',
  },
  detailsContainer: {
    padding: 15,
  },
  image: {
    width: '100%',
    height: 200,
  },
  location: {
    fontSize: 14,
    color: colors.textholder,
  },
  price: {
    fontSize: 20,
    color: colors.textDark,
    fontWeight: 'bold',
    marginTop: 10
  },
  title: {
    fontSize: 16,
    marginBottom: 0,
  },
})

export default Card
