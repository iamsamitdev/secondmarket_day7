import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
// Theme
import { colors } from '../themes/MainTheme'

function AppButton({ title, onPress, color = 'background' }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    textTransform: 'uppercase',
    // fontWeight: 'bold',
  },
})

export default AppButton
