import { RootState } from "@/lib/store";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Markdown from "react-native-markdown-display";
import { useSelector } from "react-redux";
interface Conversation {
  _id: string;
  conservation: Array<{
    prompt: string;
    response: string;
  }>;
  createdAt: string;
}
const AssistantScreen = () => {
  const [inilialLoading, setInilialLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conservations, setConversations] = useState({} as Conversation);
  const user = useSelector((state: RootState) => state?.user);
  const [prompt, setPrompt] = React.useState<string>("");
  const [directConversation, setDirectConversation] = React.useState<
    { prompt: string; response: string; loading?: boolean }[]
  >([]);

  useEffect(() => {
    const getUserConservation = async () => {
      try {
        setInilialLoading(true);
        const res = await fetch(
          "https://ai-powered-financial-and-investment-advisory-system.vercel.app/api/ai/ai-assistant",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setInilialLoading(false);
        if (res.ok) {
          setConversations(data.conservation);
          setInilialLoading(false);
        } else {
          setInilialLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserConservation();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        "https://ai-powered-financial-and-investment-advisory-system.vercel.app/api/ai/ai-assistant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt, userId: user?._id }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setDirectConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            response: data.aiResponse,
            loading: false,
          };
          return updated;
        });
      } else {
        setDirectConversation((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            ...updated[updated.length - 1],
            response:
              "I'm only here to assist with finance and investment-related topics.",
            loading: false,
          };
          return updated;
        });
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
      className='bg-white'
    >
      <ScrollView>
        <View className='px-4 mt-3'>
          <Text className='font-bold text-3xl text-center leading-tight'>
            <Text className='text-green-600'>{user?.fname}&apos;s</Text> AI
            Assistant is live!{"\n"} Ask now to get expert{" "}
            <Text className='text-green-600'>AI suggestions</Text>
          </Text>
        </View>
        {inilialLoading && (
          <View className='flex-1 items-center justify-center'>
            <View className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
            <Text>Loading...</Text>
          </View>
        )}
        {conservations?.conservation?.map((item, index) => (
          <View key={index} className='flex flex-col gap-y-4 px-4 mt-5'>
            <View className='flex items-end'>
              <Text className='bg-green-200 w-3/4 px-4 py-2 rounded-tl-2xl rounded-br-2xl'>
                {item.prompt}
              </Text>
            </View>
            <View className='px-3 border-l-2 border-t-2 border-gray-600 rounded-l-lg'>
              <Markdown
                style={{
                  body: { color: "#1f2937", fontSize: 16 },
                  heading1: {
                    color: "#15803d",
                    fontSize: 24,
                    fontWeight: "bold",
                  },
                  heading2: {
                    color: "#16a34a",
                    fontSize: 20,
                    fontWeight: "600",
                  },
                  paragraph: { marginBottom: 8 },
                  listUnordered: { paddingLeft: 20 },
                  listItem: { marginBottom: 4 },
                  strong: { color: "#15803d", fontWeight: "600" },
                  em: { fontStyle: "italic", color: "#4b5563" },
                }}
              >
                {item?.response}
              </Markdown>
            </View>
          </View>
        ))}

        {directConversation.map((item, index) => (
          <View key={index} className='flex flex-col gap-y-4 px-4 mt-5'>
            <View className='flex items-end'>
              <Text className='bg-green-200 w-3/4 px-4 py-2 rounded-tl-2xl rounded-br-2xl'>
                {item?.prompt}
              </Text>
            </View>
            {item.loading ? (
              <>
                <View className='px-4 mt-4 space-y-4'>
                  <View className='w-full h-[30px] rounded-md bg-gray-300 animate-pulse' />
                  <View className='w-full h-[500px] rounded-lg bg-gray-300 animate-pulse' />
                </View>
              </>
            ) : (
              <View className='px-3 border-l-2 border-t-2 border-gray-600 rounded-l-lg'>
                <Markdown
                  style={{
                    body: { color: "#1f2937", fontSize: 16 },
                    heading1: {
                      color: "#15803d",
                      fontSize: 24,
                      fontWeight: "bold",
                    },
                    heading2: {
                      color: "#16a34a",
                      fontSize: 20,
                      fontWeight: "600",
                    },
                    paragraph: { marginBottom: 8 },
                    listUnordered: { paddingLeft: 20 },
                    listItem: { marginBottom: 4 },
                    strong: { color: "#15803d", fontWeight: "600" },
                    em: { fontStyle: "italic", color: "#4b5563" },
                  }}
                >
                  {item?.response}
                </Markdown>
              </View>
            )}
          </View>
        ))}
        {loading && (
          <View className='flex-1 items-center justify-center'>
            <View className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
            <Text>Loading...</Text>
          </View>
        )}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className='relative px-3 py-3'>
            <TextInput
              keyboardType='default'
              value={prompt}
              onChangeText={(text) => setPrompt(text)}
              className='border border-gray-300 rounded-full px-4 py-3'
              placeholder='Ask finance related questions...'
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={!prompt || loading}
              className='absolute right-4 bottom-4'
            >
              <View className='bg-black w-10 h-10 rounded-full flex items-center justify-center mt-2'>
                <Ionicons name='arrow-up' size={18} color='white' />
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AssistantScreen;
