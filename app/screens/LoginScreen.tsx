import React from "react";
import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
      className='flex-1 bg-blue-600'
    >
      <View className='w-full h-[40%]'>
        <Image
          source={require("../../assets/images/signup.png")}
          style={{ width: 270, height: 270 }}
          className='bg-contain size-auto mx-auto'
        />
      </View>
      <View className='bg-white h-[60%] rounded-t-[50px]'>
        <View className='p-4 my-5 flex flex-col gap-y-4'>
          <View>
            <Text className='text-gray-700 mb-2'>Email Address</Text>
            <TextInput
              keyboardType='email-address'
              placeholder='Enter email address'
              className='bg-gray-100 text-gray-700 rounded-2xl p-4'
              id='email'
            />
          </View>
          <View>
            <Text className='text-gray-700 mb-2'>Password</Text>
            <TextInput
              keyboardType='default'
              secureTextEntry
              placeholder='Enter Password'
              className='bg-gray-100 text-gray-700 rounded-2xl p-4'
              id='password'
            />
          </View>
          <View className='flex items-end'>
            <Text className='text-end text-gray-600'>Forget Password?</Text>
          </View>
          <View className='mt-4'>
            <TouchableOpacity className='bg-yellow-400 p-4 rounded-lg'>
              <Text className='text-center text-xl font-bold'>Login</Text>
            </TouchableOpacity>
          </View>
          <Text className='text-center'>Or</Text>
          <View className=' mt-3 flex flex-row items-center justify-between'>
            <Image
              source={require("../../assets/images/google.png")}
              className='bg-contain w-10 h-10 mx-auto'
              alt='Google'
            />
            <Image
              source={require("../../assets/images/apple.png")}
              className='bg-contain w-10 h-10 mx-auto'
              alt='Apple'
            />
            <Image
              source={require("../../assets/images/facebook.png")}
              alt='Facebook'
              className='bg-contain w-12 h-12 mx-auto'
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
