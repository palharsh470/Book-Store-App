
import { WebView } from 'react-native-webview';
export default function Pdfview({ url }) {
    return (
        <WebView source={{ uri: url }}
            style={{ flex: 1 }}></WebView>
    )
}