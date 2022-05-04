import React from "react";
import { StyleSheet, SafeAreaView, View, NativeModules, Platform } from "react-native"

// const { StatusBarManager } = NativeModules;

function Screen({ children, style }) {
  
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

export default Screen

const styles = StyleSheet.create({
  screen: {
    // paddingTop: Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT,
    flex: 1,
  },
  view: {
    flex: 1,
  },
})