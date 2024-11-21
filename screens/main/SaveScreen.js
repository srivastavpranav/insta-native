import { View, Text } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../config/supabase";
import { FileObject } from "@supabase/storage-js";

const SaveScreen = (props) => {
  console.log("props: ", props.route.params.image);
  return (
    <View>
      <Text>SaveScreen</Text>
    </View>
  );
};

export default SaveScreen;
