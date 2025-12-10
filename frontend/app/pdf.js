import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native";
import WebView from "react-native-webview"

export default function Pdfview() {
    const { url } = useLocalSearchParams()

    if(!url){
      return <Text>No pdf available</Text>
    }
    const viewerUrl =
  `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
    return (

        < WebView source={{ uri: viewerUrl }}
            style={{ flex: 1 }}></WebView>
    )
}
