import { loginUser } from "@/lib/features/user/UserSlice";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

type LoginNavigationProp = {
  navigate: (value: string) => void;
};
const LoginScreen = () => {
  const [formData, setFormData] = useState<any>({});
  const router = useNavigation<LoginNavigationProp>();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFormData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://ai-powered-financial-and-investment-advisory-system.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        dispatch(loginUser(data.user));
        router.navigate("Dashboard");
      } else {
        Alert.alert("Error", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };
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
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>
          <View>
            <Text className='text-gray-700 mb-2'>Password</Text>
            <TextInput
              keyboardType='default'
              secureTextEntry
              placeholder='Enter Password'
              className='bg-gray-100 text-gray-700 rounded-2xl p-4'
              onChangeText={(value) => handleChange("password", value)}
            />
          </View>
          <View className='flex items-end'>
            <Text className='text-end text-gray-600'>Forget Password?</Text>
          </View>
          <View className='mt-4'>
            <TouchableOpacity
              disabled={loading}
              onPress={handleFormData}
              className='bg-yellow-400 p-4 rounded-lg'
            >
              <Text className='text-center text-xl font-bold'>Login</Text>
            </TouchableOpacity>
          </View>
          <Text className='text-center'>Or</Text>
          <View className='w-full'>
            <TouchableOpacity className='bg-white border border-gray-300 p-2 rounded-full flex items-center justify-center'>
              <View className='flex flex-row items-center gap-x-2'>
                <Image
                  source={require("../../assets/images/google.png")}
                  className='bg-contain w-8 h-8 mx-auto'
                  alt='Google'
                />
                <Text>Login with Google</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
