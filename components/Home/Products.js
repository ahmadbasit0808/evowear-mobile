import React from "react";
import { FlatList } from "react-native";
import HomeCarousel from "./Carousel";
import MyCard from "./Card";
import { useCart } from "../../utils/CardContext";
const Data = [
  {
    id: "product1",
    image: require("../../images/products (1).webp"),
    name: "Turtle Neck T-shirt",
    description: "2 Colors | Regular Fit",
    price: 2090,
  },
  {
    id: "product2",
    image: require("../../images/products (2).webp"),
    name: "Textured Striped T-Shirt",
    description: "2 Colors Regular Fit",
    price: 4090,
  },
  {
    id: "product3",
    image: require("../../images/products (3).webp"),
    name: "Basic V Neck T-shirt",
    description: "5 Colors | Regular Fit",
    price: 2490,
  },
  {
    id: "product4",
    image: require("../../images/products (4).webp"),
    name: "Basic V Neck T-shirt",
    description: "5 Colors | Regular Fit",
    price: 2090,
  },
  {
    id: "product5",
    image: require("../../images/products (5).webp"),
    name: "Basic Round Neck T-shirt",
    description: "2 Colors | Regular Fit",
    price: 2490,
  },
  {
    id: "product6",
    image: require("../../images/products (6).webp"),
    name: "Turtle Neck T-shirt",
    description: "2 Colors | Regular Fit",
    price: 2890,
  },
  {
    id: "product7",
    image: require("../../images/products (7).webp"),
    name: "Sleeved Neck shirt",
    description: "2 Colors | Relaxed Fit",
    price: 3090,
  },
  {
    id: "product8",
    image: require("../../images/products (8).webp"),
    name: "Printed Neck T-shirt",
    description: "2 Colors | Regular Fit",
    price: 3090,
  },
  {
    id: "product9",
    image: require("../../images/products (9).webp"),
    name: "Mock Neck Sleeveless Dress",
    description: "2 Colors | Regular Fit",
    price: 3690,
  },
  {
    id: "product10",
    image: require("../../images/products (10).webp"),
    name: "Basic Fleece Sweatshirt",
    description: "3 Colors | Relaxed Fit",
    price: 3690,
  },
  {
    id: "product11",
    image: require("../../images/products (11).webp"),
    name: "Mock Neck Fleece Sweatshirt",
    description: "3 Colors | Regular Fit",
    price: 3990,
  },
  {
    id: "product12",
    image: require("../../images/products (12).webp"),
    name: "Jacket with Double Flap Front Pocket ",
    description: "1 Color | Regular Fit",
    price: 7490,
  },
  {
    id: "product13",
    image: require("../../images/products (13).webp"),
    name: "Basic Wide Leg Pants ",
    description: "2 Colors | Wide Fit",
    price: 3990,
  },
  {
    id: "product14",
    image: require("../../images/products (14).webp"),
    name: "Jeans Wide Pants",
    description: "2 Colors | Regular Fit",
    price: 4090,
  },
];

export default function Products() {
  const { addToCart } = useCart();
  const renderItem = ({ item }) => (
    <MyCard
      image={item.image}
      name={item.name}
      description={item.description}
      price={item.price}
      addToCart={addToCart}
    />
  );

  return (
    <FlatList
      ListHeaderComponent={HomeCarousel}
      data={Data}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(item) => item.id}
    />
  );
}
