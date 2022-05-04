import React, { useContext } from 'react'
import { StyleSheet, View, FlatList, Text, Button } from 'react-native'

// Import Auth Context
import { AuthContext } from './../store/Context'

// Theme
import { colors } from '../themes/MainTheme'

// Component
import { ListItem, ListItemSeparator } from "../components/lists"
import Icon from '../components/Icon'
import Screen from '../components/Screen'

const menuItems = [
  {
    title: 'ประกาศขายของฉัน',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.primary,
    },
    targetScreen: 'MyListings',
  },
  {
    title: 'รายการโปรด',
    icon: {
      name: 'favorite',
      backgroundColor: colors.primary,
    },
    targetScreen: 'Favorite',
  },
  {
    title: 'แจ้งเตือนถึงฉัน',
    icon: {
      name: 'notifications',
      backgroundColor: colors.primary,
    },
    targetScreen: 'Notification',
  },
  {
    title: 'ช่วยเหลือ',
    icon: {
      name: 'help',
      backgroundColor: colors.primary,
    },
    targetScreen: 'Help',
  },
  {
    title: 'ตั้งค่าระบบ',
    icon: {
      name: 'settings',
      backgroundColor: colors.primary,
    },
    targetScreen: 'Setting',
  },
]

const ProfileScreen = ({ navigation }) => {

  // เรียกใช้งาน Context
  const { signOut } = useContext(AuthContext)

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title="Samit Koyom"
          subTitle1="samitkoyom@gmail.com"
          image={require('../assets/images/samit.jpg')}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="ออกจากระบบ"
        IconComponent={<Icon name="logout" backgroundColor={colors.forground2} />}
        onPress={() => signOut()}
      />
    </Screen>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 10,
  },
})
