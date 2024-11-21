import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./screens/auth/LandingScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";

import { SafeAreaView, Text, View } from "react-native";
import LoginScreen from "./screens/auth/LoginScreen";
import tw from "twrnc";
import { auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import MainScreen from "./screens/MainScreen";
import AddScreen from "./screens/main/AddScreen";
import SaveScreen from "./screens/main/SaveScreen";

export default function App() {
  const Stack = createStackNavigator();
  const Store = configureStore({
    reducer: rootReducer,
  });

  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!loaded) {
    return (
      <SafeAreaView style={tw`p-5`}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            // options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Save"
            component={SaveScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
