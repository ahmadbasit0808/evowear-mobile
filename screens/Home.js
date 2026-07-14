import { useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Home/Header";
import Products from "../components/Home/Products";
import { COLORS } from "../utils/themes";

export default function Home() {
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === "dark" ? COLORS.darkBg : COLORS.white }}>
      <Header search={search} onSearchChange={setSearch} />
      <Products search={search} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
    </SafeAreaView>
  );
}
