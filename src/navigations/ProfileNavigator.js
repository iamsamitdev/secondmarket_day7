import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from './../screens/ProfileScreen';
import MyListingsScreen from './../screens/MyListingsScreen';
import FavoriteScreen from './../screens/FavoriteScreen';
import NotificationScreen from './../screens/NotificationScreen';
import HelpScreen from './../screens/HelpScreen';
import SettingScreen from './../screens/SettingScreen';

const Stack = createStackNavigator();

const ProfileNavigator = () => (

  <Stack.Navigator screenOptions={{ 
    headerShown: true,
    headerTitleStyle: {
      fontFamily: 'NotoSansThai-Regular'
    },
  }}>
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen 
      name="MyListings" 
      component={MyListingsScreen} 
      options={{
        headerTitle: 'ประกาศขายของฉัน'
      }}
    />
    <Stack.Screen 
      name="Favorite" 
      component={FavoriteScreen} 
      options={{
        headerTitle: 'รายการโปรด'
      }}
    />
    <Stack.Screen 
      name="Notification" 
      component={NotificationScreen} 
      options={{
        headerTitle: 'แจ้งเตือนถึงฉัน'
      }}
    />
    <Stack.Screen 
      name="Help" 
      component={HelpScreen} 
      options={{
        headerTitle: 'ช่วยเหลือ'
      }}
    />
    <Stack.Screen 
      name="Setting" 
      component={SettingScreen} 
      options={{
        headerTitle: 'ตั้งค่าระบบ'
      }}
    />
  </Stack.Navigator>
)

export default ProfileNavigator