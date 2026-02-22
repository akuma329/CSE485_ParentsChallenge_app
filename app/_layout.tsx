import { Stack } from "expo-router";

import { db } from '../firebaseConfig';
console.log("Firebase is connected!", db.app.name);

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"/>
    </Stack>
  );
}
