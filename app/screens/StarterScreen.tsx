import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from "react-native";

type RootStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  Starter: undefined;
};
type StarterlcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Starter"
>;

const StarterScreen = () => {
  const navigation = useNavigation<StarterlcomeScreenNavigationProp>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);
  }, [navigation]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className='flex items-center justify-center bg-blue-700'
    >
      <View>
        <Image
          source={require("../../assets/images/logo.png")}
          style={{ width: 270, height: 270 }}
          className='bg-contain size-auto mx-auto'
        />
        <View>
          <Text className='mt-2 text-xl font-semibold text-white text-center'>
            Welcome to Finance Tracking App
          </Text>
          <Text className='mt-1 text-lg text-white text-center'>
            Version 1.0
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StarterScreen;
