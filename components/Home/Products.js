import React from "react";
import { FlatList } from "react-native";
import HomeCarousel from "./Carousel";
import MyCard from "./Card";
import { useCart } from "../../utils/CartContext";
import { Data } from "../../utils/product";

export default function Products() {
  const { addToCart } = useCart();
  const renderItem = ({ item }) => (
    <MyCard
      image={item.image}
      name={item.name}
      description={item.description}
      price={item.price < 3000 ? item.price : item.price * 0.8}
      addToCart={addToCart}
    />
  );

  return (
    <FlatList
      ListHeaderComponent={HomeCarousel}
      data={Data}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
      contentContainerStyle={{ gap: 20, paddingBottom: 20 }}
      keyExtractor={(item) => item.id}
    />
  );
}
