import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

// Theme
import { colors } from '../themes/MainTheme'

function AppTextInput({ icon, width = '100%', ...otherProps }) {
  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.inputField}
        placeholderTextColor={colors.medium}
        {...otherProps}
      />
    </View>
  )
}

export default AppTextInput

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cfd8dc',
    borderRadius: 10,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingLeft: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  inputField: {
    width: '100%',
    fontSize: 18,
    fontFamily: "NotoSansThai-Regular"
  }
})


