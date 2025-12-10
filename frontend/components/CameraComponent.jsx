import { CameraView,useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import { View, Button, StyleSheet } from "react-native";

export default function CameraComponent({setbookUrl ,onCapture, onCancel }) {
  const camera= useCameraPermissions();
  const cameraRef = useRef(null);


  const permission = camera[0]
  const requestPermission = camera[1]
  if (!permission) return null;


  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Button title="Grant Camera Permission" onPress={requestPermission} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    );
  }

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.3,
        base64 : true
      });
      
      const dataBase64 = `data:image/jpg;base64,${photo.base64}`
 
      
      const data = {
        file : dataBase64,
        upload_preset: "mobile_unsigned"

      }

      

      const imgUrl =await fetch(`https://api.cloudinary.com/v1_1/dnkfrbwde/image/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const imageUrldata = await imgUrl.json();

      const cloudUrl = imageUrldata.secure_url
    
      setbookUrl(cloudUrl)
    
      onCapture(photo.uri);
    } catch (err) {
      console.log("Photo capture error:", err);
    }
  };

  return (
    <View style={styles.container}>
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
