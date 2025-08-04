import React from "react";
import { View, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import { Card, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
const { width } = Dimensions.get("window");

const MyCard = ({ image, name, description, price, addToCart }) => (
  <View style={styles.container}>
    <Card mode="elevated" style={styles.card}>
      <Card.Cover source={image} style={styles.image} />
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
              id: name,
              image,
              name,
              description,
              price,
            });
            Alert.alert(
              `Item added successfully`,
              `${name} has been added to your cart. `
            );
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
  container: {},
  card: {
    width: width / 2 - 20,
  },
  image: {
    height: width / 1.6,
    resizeMode: "contain",
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
