import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { View, Button, StyleSheet, ActivityIndicator } from "react-native";

export default function CameraComponent({ setbookUrl, onCapture, onCancel }) {
  const camera = useCameraPermissions();
  const cameraRef = useRef(null);

  const [isloading, setisloading] = useState(false)
  const permission = camera[0]
  const requestPermission = camera[1]
  if (!permission) return null;


  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Button  title="Grant Camera Permission" onPress={requestPermission} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    );
  }

  const takePhoto = async () => {
    try {

      setisloading(true)
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.3,
      });



      const formdata = new FormData()

      formdata.append("image", {
        uri: photo?.uri,
        name: "photo.jpg",
        type: "image/jpeg"
      }

      )

      formdata.append("upload_preset", "mobile_unsigned")



      const imgUrl = await fetch(`https://api.cloudinary.com/v1_1/dnkfrbwde/raw/upload`, {
        method: "POST",
        body: formdata,
      });

      const imageUrldata = await imgUrl.json();

      const cloudUrl = imageUrldata.secure_url

      setbookUrl(cloudUrl)

      onCapture(photo.uri);
      setisloading(false)
    } catch (err) {
      console.log("Photo capture error:", err);
    }
  };
  console.log(isloading)

  return (
    <View style={styles.container}>
        {(isloading) && <ActivityIndicator  size={"large"}></ActivityIndicator> }
        <CameraView ref={cameraRef} style={styles.camera} />

        <View style={styles.controls}>
          <Button title="Capture" onPress={takePhoto} />
          <Button title="Cancel" onPress={onCancel} />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: {
    position: "absolute",
    bottom: 30,
    right : 0,
    left : 0,
    justifyContent : "space-around",
    flexDirection: "row",

    
  },
  center: {
backgroundColor : "white",
    justifyContent : "center",
    gap : 10,
    alignItems: "center",
  },
});
