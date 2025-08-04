import React from "react";
import {
  FlatList,
  Text,
  useColorScheme,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { bgThemeObj } from "../utils/themes";
import MyCard from "../components/Home/Card";
import { useCart } from "../utils/CartContext";
import { Data } from "../utils/product";
import { textThemeObj } from "../utils/themes";
const dealsData = Data.filter((item) => {
  return item.price > 3000;
});
const ListHeader = () => {
  const colorScheme = useColorScheme();
  return (
    <Text style={textThemeObj(styles.title, colorScheme)}>Flat 20% off</Text>
  );
};

export default function Deals() {
  const colorScheme = useColorScheme();
  const { addToCart } = useCart();
  const renderItem = ({ item }) => (
    <MyCard
      image={item.image}
      name={item.name}
      description={item.description}
      price={item.price * 0.8}
      addToCart={addToCart}
    />
  );

  return (
    <SafeAreaView style={bgThemeObj(styles.safeArea, colorScheme)}>
      <FlatList
        ListHeaderComponent={ListHeader}
        data={dealsData}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: "space-evenly" }}
        contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
  },
});
