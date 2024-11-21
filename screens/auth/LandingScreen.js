import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const LandingScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 justify-center items-center p-5`}>
      <TouchableOpacity
        style={tw`flex justify-center items-center py-3 px-10 rounded-md`}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={tw`text-blue-500 text-lg font-semibold`}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={tw`flex justify-center items-center bg-blue-500 py-3 px-10 rounded-md`}
      >
        <Text style={tw`text-white font-semibold text-lg`}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LandingScreen;
