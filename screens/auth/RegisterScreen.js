import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setDoc(doc(db, "users", result.user.uid), {
          name: name,
          email: email,
          // uid: result.user.uid,
          // createdAt: new Date().toISOString(),
        })
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={tw`p-5`}>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
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
        <Text>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
