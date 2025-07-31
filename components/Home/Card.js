import React from "react";
import { View, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import { Card, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const MyCard = ({ image, name, description, price, addToCart }) => (
  <View style={styles.container}>
    <Card mode="elevated" style={styles.card}>
      <Card.Cover source={image} />
      <Card.Content style={styles.content}>
        <Text numberOfLines={1} variant="titleSmall">
          {name}
        </Text>
        <Text variant="bodySmall">{description}</Text>
      </Card.Content>
      <Card.Content style={styles.actions}>
        <Text variant="bodySmall" style={styles.price}>
          {`Rs.${price}`}
        </Text>
        <Pressable
          onPress={() => {
            addToCart({
              id: name, // or use a real `id` if passed separately
              image,
              name,
              description,
              price,
            });
            Alert.alert("Added to cart");
          }}
        >
          {({ pressed }) => (
            <Ionicons
              name={pressed ? "cart" : "cart-outline"}
              size={24}
              color={pressed ? "#FFDE59" : "#000"}
            />
          )}
        </Pressable>
      </Card.Content>
    </Card>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    width: width / 2 - 20,
  },
  content: {
    paddingVertical: 10,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MyCard;
