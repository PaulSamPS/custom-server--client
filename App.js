import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    async function checkForUpdates() {
      try {
        console.log("Проверка наличия обновлений...");
        const update = await Updates.checkForUpdateAsync();
        setText(
          update.isAvailable
            ? `update есть: ${update.isAvailable}`
            : `Обновления не найдены: ${update.manifest}`,
        );
        if (update.isAvailable) {
          setText("обновление есть");
          console.log("Доступно новое обновление, загрузка...");
          await Updates.fetchUpdateAsync();
          console.log("Обновление загружено, перезагрузка...");
          await Updates.reloadAsync(); // Эта строка перезагружает приложение с новым обновлением
        } else {
          console.log("Обновления не найдены.");
        }
      } catch (e) {
        setText(`Ошибка при проверке обновлений: ${e.toString()}`);
        console.error("Ошибка при проверке обновлений:", e);
      }
    }

    checkForUpdates();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Updated!</Text>
      <Text>{text}</Text>
      <ActivityIndicator />
    </View>
  );
}
