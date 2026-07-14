import React, { useState } from "react";
import {
  View, Text, Image, StyleSheet, Pressable,
  ScrollView, useColorScheme, Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { showMessage } from "react-native-flash-message";
import { useCart } from "../utils/CartContext";
import { COLORS, bgThemeProp, textThemeProp, subTextThemeProp } from "../utils/themes";

const { width } = Dimensions.get("window");

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  const discountPct = isOnSale ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = () => {
    if (!selectedSize) {
      showMessage({ message: "Select a size", type: "warning", icon: "warning", duration: 1500 });
      return;
    }
    addToCart({ ...product, size: selectedSize });
    showMessage({ message: "Added to Cart", description: `${product.name} — ${selectedSize}`, type: "success", icon: "success", duration: 1800 });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgThemeProp(colorScheme) }} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageWrapper}>
          <Image source={product.image} style={styles.image} resizeMode="cover" />
          {isOnSale && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleBadgeText}>-{discountPct}%</Text>
            </View>
          )}
        </View>

        <View style={[styles.body, { backgroundColor: bgThemeProp(colorScheme) }]}>
          {/* Category tag */}
          <Text style={[styles.category, { color: COLORS.accent }]}>{product.category}</Text>

          {/* Name */}
          <Text style={[styles.name, { color: textThemeProp(colorScheme) }]}>{product.name}</Text>

          {/* Description */}
          <Text style={[styles.description, { color: subTextThemeProp(colorScheme) }]}>{product.description}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>Rs. {Math.round(product.price)}</Text>
            {isOnSale && (
              <Text style={[styles.originalPrice, { color: subTextThemeProp(colorScheme) }]}>
                Rs. {product.originalPrice}
              </Text>
            )}
            {isOnSale && (
              <View style={styles.saveBadge}>
                <Text style={styles.saveBadgeText}>Save {discountPct}%</Text>
              </View>
            )}
          </View>

          {/* Size selector */}
          <Text style={[styles.sectionLabel, { color: textThemeProp(colorScheme) }]}>
            Select Size
          </Text>
          <View style={styles.sizesRow}>
            {SIZES.map((size) => {
              const isActive = selectedSize === size;
              return (
                <Pressable
                  key={size}
                  onPress={() => setSelectedSize(size)}
                  style={[
                    styles.sizeBtn,
                    { borderColor: isDark ? COLORS.darkBorder : COLORS.lightBorder },
                    isActive && styles.sizeBtnActive,
                  ]}
                >
                  <Text style={[styles.sizeBtnText, { color: isActive ? COLORS.white : textThemeProp(colorScheme) }]}>
                    {size}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Shipping info */}
          <View style={[styles.infoRow, { borderColor: isDark ? COLORS.darkBorder : "#f0f0f0" }]}>
            <Ionicons name="car-outline" size={18} color={COLORS.accent} />
            <Text style={[styles.infoText, { color: subTextThemeProp(colorScheme) }]}>
              Free shipping on orders over Rs. 5000
            </Text>
          </View>
          <View style={[styles.infoRow, { borderColor: isDark ? COLORS.darkBorder : "#f0f0f0" }]}>
            <Ionicons name="refresh-outline" size={18} color={COLORS.accent} />
            <Text style={[styles.infoText, { color: subTextThemeProp(colorScheme) }]}>
              15-day easy returns
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.footer, { backgroundColor: bgThemeProp(colorScheme), borderTopColor: isDark ? COLORS.darkBorder : "#eee" }]}>
        <View>
          <Text style={[styles.footerLabel, { color: subTextThemeProp(colorScheme) }]}>Total Price</Text>
          <Text style={styles.footerPrice}>Rs. {Math.round(product.price)}</Text>
        </View>
        <Pressable style={styles.addBtn} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color={COLORS.white} />
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageWrapper: { width, height: width * 1.1 },
  image: { width: "100%", height: "100%" },
  saleBadge: {
    position: "absolute", top: 16, left: 16,
    backgroundColor: COLORS.danger,
    borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4,
  },
  saleBadgeText: { color: COLORS.white, fontWeight: "800", fontSize: 13 },
  body: { padding: 20, paddingBottom: 8 },
  category: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 },
  name: { fontSize: 22, fontWeight: "800", marginBottom: 6 },
  description: { fontSize: 14, marginBottom: 14 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 20 },
  price: { fontSize: 24, fontWeight: "800", color: COLORS.accent },
  originalPrice: { fontSize: 16, textDecorationLine: "line-through" },
  saveBadge: { backgroundColor: "#e8f8f0", borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  saveBadgeText: { color: "green", fontWeight: "700", fontSize: 12 },
  sectionLabel: { fontSize: 14, fontWeight: "700", marginBottom: 10 },
  sizesRow: { flexDirection: "row", gap: 10, flexWrap: "wrap", marginBottom: 20 },
  sizeBtn: {
    width: 48, height: 48, borderRadius: 12, borderWidth: 1,
    alignItems: "center", justifyContent: "center",
  },
  sizeBtnActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  sizeBtnText: { fontWeight: "700", fontSize: 13 },
  infoRow: {
    flexDirection: "row", alignItems: "center", gap: 10,
    paddingVertical: 12, borderTopWidth: 1,
  },
  infoText: { fontSize: 13 },
  footer: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    padding: 16, borderTopWidth: 1,
  },
  footerLabel: { fontSize: 12, marginBottom: 2 },
  footerPrice: { fontSize: 20, fontWeight: "800", color: COLORS.accent },
  addBtn: {
    flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: COLORS.accent,
    paddingHorizontal: 28, paddingVertical: 14,
    borderRadius: 14,
  },
  addBtnText: { color: COLORS.white, fontWeight: "800", fontSize: 15 },
});
