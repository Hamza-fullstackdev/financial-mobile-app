import React from "react";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";

const ProfileScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className='flex-1 bg-blue-600'
    >
      <View>
        <Text>ProfileScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
