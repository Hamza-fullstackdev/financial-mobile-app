import { useNavigation } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SignUpScreenNavigationProp = {
  navigate: (value: string) => void;
};
const WelcomeScreen = () => {
  const router = useNavigation<SignUpScreenNavigationProp>();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className='flex-1 bg-blue-600'
    >
      <View className='flex-1 flex justify-around my-10 px-8'>
        <View>
          <Text className='text-4xl font-bold text-white text-center'>
            Let's Get Started!
          </Text>
        </View>
        <View className='mx-auto'>
          <Image
            source={require("../../assets/images/happy-family.png")}
            style={{ width: 270, height: 340 }}
            className='bg-contain size-auto mx-auto'
          />
        </View>
        <View className='w-full'>
          <TouchableOpacity
            onPress={() => router.navigate("SignUp")}
            className='bg-yellow-400 p-4 rounded-lg'
          >
            <Text className='text-center text-xl font-bold'>Sign Up</Text>
          </TouchableOpacity>
          <View className='mt-4 flex-row justify-center items-center'>
            <Text className='text-center text-white'>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.navigate("SignUp")}>
              <Text className='text-yellow-400 font-semibold'>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
