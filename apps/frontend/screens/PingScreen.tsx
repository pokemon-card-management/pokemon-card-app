import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Constants from "expo-constants";

export default function PingScreen() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const API_BASE_URL = Constants.expoConfig?.extra?.API_BASE_URL;
    console.log("API_BASE_URL:", API_BASE_URL); // APIのURL確認

    if (!API_BASE_URL) {
      setMessage("API URL not found");
      return;
    }

    const url = `${API_BASE_URL}/ping`;
    console.log("Fetching:", url);

    fetch(url)
      .then((res) => {
        console.log("API Response Status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("API Response Data:", data);
        setMessage(data.message || "No message");
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setMessage("Error fetching API");
      });
  }, []);

  return (
    <View>
      <Text>{message}</Text>
    </View>
  );
}
