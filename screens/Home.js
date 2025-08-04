import { SafeAreaView, useColorScheme } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Home/Header";
import Products from "../components/Home/Products";

export default function Home() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top + 10,
        backgroundColor: colorScheme === "light" ? "#fff" : "#333",
      }}
    >
      <Header />
      <Products />
    </SafeAreaView>
  );
}
