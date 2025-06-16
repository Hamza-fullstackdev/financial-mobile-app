import AssistantScreen from "@/app/screens/dashboard/AssistantScreen";
import DashboardScreen from "@/app/screens/dashboard/DashboardScreen";
import ProfileScreen from "@/app/screens/dashboard/ProfileScreen";
import SettingScreen from "@/app/screens/dashboard/SettingScreen";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import React from "react";

const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#0D47A1", height: 60 },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ccc",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Assistant") {
            iconName = focused ? "chatbubble-ellipses" : "chatbubble-outline";
          } else {
            iconName = "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name='Dashboard' component={DashboardScreen} />
      <Tab.Screen name='Assistant' component={AssistantScreen} />
      <Tab.Screen name='Profile' component={ProfileScreen} />
      <Tab.Screen name='Setting' component={SettingScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
