import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
       name = "index"
       options={{
        headerTitle: "Home Page",
        title: "Home Page"
       }} 
      />
      <Tabs.Screen
       name = "parents"
       options={{
        headerTitle: "Parents Page",
        title: "Parents Page"
       }}
      />
      <Tabs.Screen
       name = "schools"
       options={{
        headerTitle: "Schools Page",
        title: "Schools Page"
       }}
       />
    </Tabs>
  );
}
