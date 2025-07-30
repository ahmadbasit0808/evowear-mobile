import React from "react";
import { View, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import { Card, Text } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";

const { width } = Dimensions.get("window");

const MyCard = ({ image, text1, text2, price }) => (
  <View style={styles.container}>
    <Card mode="elevated" style={styles.card}>
      <Card.Cover source={image} />
      <Card.Content style={styles.content}>
        <Text variant="titleSmall">{text1}</Text>
        <Text variant="bodySmall">{text2}</Text>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Text variant="bodySmall" style={styles.price}>
          {price}
        </Text>
        <Pressable
          onPress={() => {
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
      </Card.Actions>
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
    minHeight: 80,
  },
  actions: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  price: {
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default MyCard;
