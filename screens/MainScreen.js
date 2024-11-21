import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";
import tw from "twrnc";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FeedScreen from "./main/FeedScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "./main/ProfileScreen";
import EmptyScreen from "./main/EmptyScreen";

const MainScreen = (props) => {
  useEffect(() => {
    props.fetchUser();
  }, []);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Feed">
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Create"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={size} />
          ),
          // headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
          // headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

const mapDispatchProps = (dispatch) => {
  return bindActionCreators({ fetchUser }, dispatch);
};

export default connect(mapStateToProps, mapDispatchProps)(MainScreen);
