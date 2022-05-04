import React from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Swipeable from "react-native-gesture-handler/Swipeable";

// Theme
import { colors } from './../../themes/MainTheme'

function ListItem({
  title,
  subTitle1,
  subTitle2,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {
            subTitle1 && (
              <Text style={styles.subTitle1} numberOfLines={2}>
                {subTitle1}
              </Text>
            )
            }
            {
            subTitle2 && (
              <Text style={styles.subTitle2} numberOfLines={2}>
                {subTitle2}
              </Text>
            )
            }
          </View>
          <MaterialIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle1: {
    color: colors.medium,
  },
  subTitle2: {
    color: colors.medium,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ListItem
