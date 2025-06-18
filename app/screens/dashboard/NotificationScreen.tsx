import React, { useEffect } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";

type NotificationNavigationProp = {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
};
const NotificationScreen = () => {
  const [notifications, setNotifications] = React.useState<
    NotificationNavigationProp[]
  >([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const getNotifications = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://ai-powered-financial-and-investment-advisory-system.vercel.app/api/user/notifications",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setLoading(false);
        setNotifications(data.notifications);
      } catch (error) {
        Alert.alert("Error", "Something went wrong");
      }
    };
    getNotifications();
  }, []);
  return (
    <ScrollView>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        className='flex-1 p-4'
      >
        <Text className='text-2xl font-semibold'>Notifications</Text>
        <View className='mt-4 flex-1 flex-col gap-y-3'>
          {loading && (
            <View className='flex-1 items-center justify-center'>
              <View className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
              <Text>Loading...</Text>
            </View>
          )}
          {notifications.map((notification) => (
            <View key={notification?._id} className='bg-white p-4 rounded-lg'>
              <View className='flex-row justify-between items-center'>
                <Text className='text-lg font-semibold'>
                  {notification?.title}
                </Text>
                <View>
                  <Text className='text-gray-500 text-sm'>
                    {new Date(notification?.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}
                  </Text>
                </View>
              </View>
              <Text className='mt-1 text-gray-600'>
                {notification?.message} (
                {new Date(notification?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                )
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default NotificationScreen;
