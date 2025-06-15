import React from "react";
import { Image, Platform, SafeAreaView, StatusBar, View } from "react-native";

const SignupScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className='flex-1 bg-blue-600'
    >
      <View className='w-full h-2/5'>
        <Image
          source={require("../../assets/images/signup.png")}
          style={{ width: 270, height: 270 }}
          className='bg-contain size-auto mx-auto'
        />
      </View>
      <View className='bg-white h-3/5 rounded-t-[50px]'></View>
    </SafeAreaView>
  );
};

export default SignupScreen;
