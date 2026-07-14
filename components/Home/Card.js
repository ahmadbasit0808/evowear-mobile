import React from "react";
import { View, StyleSheet, Pressable, Dimensions, Text } from "react-native";
import { Card } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { showMessage } from "react-native-flash-message";
import { COLORS } from "../../utils/themes";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;

const MyCard = ({
  id,
  image,
  name,
  description,
  price,
  originalPrice,
  addToCart,
  onPress,
}) => {
  const isOnSale = originalPrice && originalPrice > price;
  const discountPct = isOnSale
    ? Math.round((1 - price / originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart({ id: id || name, image, name, description, price });
    showMessage({
      message: "Added to Cart",
      description: name,
      type: "success",
      icon: "success",
      duration: 1800,
    });
  };

  return (
    <View style={styles.container}>
      <Card mode="elevated" style={styles.card}>
        <Pressable onPress={onPress}>
          <View>
            <View>
              <Card.Cover source={image} style={styles.image} />
              {isOnSale && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>-{discountPct}%</Text>
                </View>
              )}
            </View>
            <Card.Content style={styles.content}>
              <Text numberOfLines={1} style={styles.name}>
                {name}
              </Text>
              <Text numberOfLines={1} style={styles.description}>
                {description}
              </Text>
            </Card.Content>
          </View>
        </Pressable>

        <Card.Content style={styles.actions}>
          <View>
            <Text style={styles.price}>Rs. {Math.round(price)}</Text>
            {isOnSale && (
              <Text style={styles.originalPrice}>Rs. {originalPrice}</Text>
            )}
          </View>

          <Pressable
            onPress={handleAddToCart}
            style={({ pressed }) => [
              styles.cartBtn,
              pressed && styles.cartBtnPressed,
            ]}
          >
            {({ pressed }) => (
              <Ionicons
                name={pressed ? "cart" : "cart-outline"}
                size={22}
                color={pressed ? COLORS.primary : COLORS.accent}
              />
            )}
          </Pressable>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 4,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: COLORS.darkCard,
  },
  image: {
    height: CARD_WIDTH * 1.2,
    resizeMode: "cover",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: COLORS.danger,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },
  content: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: "#eee",
  },
  description: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 4,
  },
  price: {
    fontWeight: "700",
    fontSize: 14,
    color: COLORS.accent,
  },
  originalPrice: {
    fontSize: 11,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  cartBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#f0f8ff",
  },
  cartBtnPressed: {
    backgroundColor: "#fff8e1",
  },
});

export default MyCard;
