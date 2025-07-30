import React from "react";
import { FlatList } from "react-native";
import HomeCarousel from "./Carousel";
import MyCard from "./Card";

const Data = [
  {
    id: "product1",
    image: require("../../images/products (1).webp"),
    text1: "Turtle Neck T-shirt",
    text2: "2 Colors | Regular Fit",
    price: "PKR 2,090",
  },
  {
    id: "product2",
    image: require("../../images/products (2).webp"),
    text1: "Textured Striped T-Shirt",
    text2: "2 Colors Regular Fit",
    price: "PKR 4,490",
  },
  {
    id: "product3",
    image: require("../../images/products (3).webp"),
    text1: "Basic V Neck T-shirt",
    text2: "5 Colors | Regular Fit",
    price: "PKR 2,490",
  },
  {
    id: "product4",
    image: require("../../images/products (4).webp"),
    text1: "Basic V Neck T-shirt",
    text2: "5 Colors | Regular Fit",
    price: "PKR 2,090",
  },
  {
    id: "product5",
    image: require("../../images/products (5).webp"),
    text1: "Basic Round Neck T-shirt",
    text2: "2 Colors | Regular Fit",
    price: "PKR 2,490",
  },
  {
    id: "product6",
    image: require("../../images/products (6).webp"),
    text1: "Turtle Neck T-shirt",
    text2: "2 Colors | Regular Fit",
    price: "PKR 2,890",
  },
  {
    id: "product7",
    image: require("../../images/products (7).webp"),
    text1: "Sleeved Neck shirt",
    text2: "2 Colors | Relaxed Fit",
    price: "PKR 3,090",
  },
  {
    id: "product8",
    image: require("../../images/products (8).webp"),
    text1: "Printed Neck T-shirt",
    text2: "2 Colors | Regular Fit",
    price: "PKR 3,090",
  },
  {
    id: "product9",
    image: require("../../images/products (9).webp"),
    text1: "Mock Neck Sleeveless Dress",
    text2: "2 Colors | Regular Fit",
    price: "PKR 3,690",
  },
  {
    id: "product10",
    image: require("../../images/products (10).webp"),
    text1: "Basic Fleece Sweatshirt",
    text2: "3 Colors | Relaxed Fit",
    price: "PKR 3,690",
  },
  {
    id: "product11",
    image: require("../../images/products (11).webp"),
    text1: "Mock Neck Fleece Sweatshirt",
    text2: "3 Colors | Regular Fit",
    price: "PKR 3,990",
  },
  {
    id: "product12",
    image: require("../../images/products (12).webp"),
    text1: "Jacket with Double Flap Front Pocket ",
    text2: "1 Color | Regular Fit",
    price: "PKR 7,490",
  },
  {
    id: "product13",
    image: require("../../images/products (13).webp"),
    text1: "Basic Wide Leg Pants ",
    text2: "2 Colors | Wide Fit",
    price: "PKR 3,990",
  },
  {
    id: "product14",
    image: require("../../images/products (14).webp"),
    text1: "Jeans Wide Pants",
    text2: "2 Colors | Regular Fit",
    price: "PKR 4,090",
  },
];

export default function Products() {
  const renderItem = ({ item }) => (
    <MyCard
      image={item.image}
      text1={item.text1}
      text2={item.text2}
      price={item.price}
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
