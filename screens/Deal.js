import React from "react";
import { FlatList, Text, View, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { bgThemeObj, textThemeObj, COLORS } from "../utils/themes";
import MyCard from "../components/Home/Card";
import { useCart } from "../utils/CartContext";
import { Data } from "../utils/product";

const dealsData = Data.filter((item) => item.price > 3000);

const ListHeader = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.banner}>
      <View style={styles.bannerInner}>
        <Ionicons name="pricetag" size={22} color={COLORS.white} />
        <View style={styles.bannerText}>
          <Text style={styles.bannerTitle}>Flash Sale — 20% Off</Text>
          <Text style={styles.bannerSub}>On selected items above Rs. 3000</Text>
        </View>
      </View>
    </View>
  );
};

export default function Deals() {
  const colorScheme = useColorScheme();
  const { addToCart } = useCart();

  const renderItem = ({ item }) => (
    <MyCard
      id={item.id}
      image={item.image}
      name={item.name}
      description={item.description}
      price={item.price * 0.8}
      originalPrice={item.price}
      addToCart={addToCart}
    />
  );

  return (
    <SafeAreaView style={bgThemeObj(styles.safeArea, colorScheme)}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={dealsData}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: "space-evenly", paddingHorizontal: 8 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  banner: {
    margin: 16,
    borderRadius: 14,
    backgroundColor: COLORS.accent,
    padding: 16,
  },
  bannerInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bannerText: { flex: 1 },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
  },
  bannerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },
});
