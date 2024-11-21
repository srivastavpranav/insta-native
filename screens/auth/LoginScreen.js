import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .then((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={tw`p-5`}>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(pass) => setPassword(pass)}
      />
      <TouchableOpacity
        onPress={() => {
          signup();
        }}
      >
        <Text>Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
