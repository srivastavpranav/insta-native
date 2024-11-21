import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import ImagePickerExample from "./ImagePickerExample";
import { useNavigation } from "@react-navigation/native";

const AddScreen = () => {
  const [facing, setFacing] = useState("front");
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();

  const updateImage = (uri) => {
    setImage(uri);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (!camera) {
      return;
    }

    const photo = await camera.takePictureAsync();
    setImage(photo.uri);
  };

  return (
    <View style={tw`flex-1`}>
      <CameraView
        ref={(ref) => setCamera(ref)}
        style={tw`flex-0.5`}
        facing={facing}
      >
        <View style={tw`flex-1 flex-row items-end my-10  bg-transparent`}>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={tw`flex-1 bg-red-900`}
          >
            <Text style={tw`text-lg font-semibold text-white text-center`}>
              Flip Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePicture}
            style={tw`flex-1 bg-green-900`}
          >
            <Text style={tw`text-lg font-semibold text-white text-center`}>
              Click
            </Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <ImagePickerExample update={updateImage} />
      {image && <Image source={{ uri: image }} style={{ flex: 0.5 }} />}
      {image && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Save", { image });
          }}
          style={tw`bg-green-900`}
        >
          <Text style={tw`text-lg font-semibold text-white text-center`}>
            Save
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: "row",
    backgroundColor: "transparent",
    // margin: 64,
  },
  button: {
    flex: 1,
    // alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default AddScreen;
