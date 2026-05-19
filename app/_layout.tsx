import { Stack } from "expo-router";
import { LanguageProvider } from "../LanguageContext";

import { db } from "../firebaseConfig";
console.log("Firebase is connected!", db.app.name);

export default function RootLayout() {
  return (
    <LanguageProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </LanguageProvider>
  );
}
