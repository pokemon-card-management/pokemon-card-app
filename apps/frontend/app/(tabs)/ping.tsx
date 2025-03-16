import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";

export default function PingScreen() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const API_BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;
    
    fetch(`${API_BASE_URL}/ping`)
      .then((res) => res.json())
      .then((data) => setMessage(data.status)) // 例: { status: "ok" }
      .catch((err) => setMessage("Error fetching API"));
  }, []);

  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}
