import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import StarterScreen from "./screens/StarterScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
const stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <stack.Navigator initialRouteName='Home'>
      <stack.Screen
        name='Home'
        options={{ headerShown: false }}
        component={StarterScreen}
      />
      <stack.Screen
        name='Welcome'
        options={{ headerShown: false }}
        component={WelcomeScreen}
      />
      <stack.Screen
        name='SignUp'
        options={{ headerShown: false }}
        component={SignupScreen}
      />
      <stack.Screen
        name='Login'
        options={{ headerShown: false }}
        component={LoginScreen}
      />
    </stack.Navigator>
  );
}
