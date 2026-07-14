import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { showMessage } from "react-native-flash-message";
import { useCart } from "../utils/CartContext";
import {
  COLORS,
  bgThemeObj,
  textThemeObj,
  textThemeProp,
  cardThemeObj,
  subTextThemeProp,
} from "../utils/themes";

const SHIPPING_FEE = 200;
const FREE_SHIPPING_THRESHOLD = 5000;

export default function Cart() {
  const colorScheme = useColorScheme();
  const {
    cartItems,
    clearCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotal,
  } = useCart();
  const total = getTotal();
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const grandTotal = total + shipping;

  const handleCheckout = () => {
    showMessage({
      message: "Order Placed!",
      description: "Your order is on its way.",
      type: "success",
      icon: "success",
      duration: 2500,
    });
    clearCart();
  };

  const renderItem = ({ item }) => (
    <View style={cardThemeObj(styles.itemCard, colorScheme)}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={textThemeObj(styles.name, colorScheme)} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.price]}>Rs. {Math.round(item.price)}</Text>
        <View style={styles.qtyRow}>
          <Pressable style={styles.qtyBtn} onPress={() => decreaseQty(item.id)}>
            <Ionicons name="remove" size={16} color={COLORS.accent} />
          </Pressable>
          <Text style={[styles.qtyText, { color: textThemeProp(colorScheme) }]}>
            {item.quantity}
          </Text>
          <Pressable style={styles.qtyBtn} onPress={() => increaseQty(item.id)}>
            <Ionicons name="add" size={16} color={COLORS.accent} />
          </Pressable>
          <Pressable
            style={styles.removeBtn}
            onPress={() => removeFromCart(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
          </Pressable>
        </View>
      </View>
      <Text style={styles.itemTotal}>
        Rs. {Math.round(item.price * item.quantity)}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={bgThemeObj(styles.container, colorScheme)}>
      <Text style={textThemeObj(styles.title, colorScheme)}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="cart-outline"
              size={80}
              color={subTextThemeProp(colorScheme)}
            />
            <Text
              style={[
                styles.emptyText,
                { color: subTextThemeProp(colorScheme) },
              ]}
            >
              Your cart is empty
            </Text>
            <Text
              style={[
                styles.emptySubText,
                { color: subTextThemeProp(colorScheme) },
              ]}
            >
              Add items from the Home or Deals tab
            </Text>
          </View>
        }
      />
      {cartItems.length > 0 && (
        <View
          style={[
            styles.summary,
            {
              borderTopColor:
                colorScheme === "dark" ? COLORS.darkBorder : COLORS.lightBorder,
            },
          ]}
        >
          <View style={styles.summaryRow}>
            <Text style={{ color: subTextThemeProp(colorScheme) }}>
              Subtotal
            </Text>
            <Text
              style={{ color: textThemeProp(colorScheme), fontWeight: "600" }}
            >
              Rs. {Math.round(total)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ color: subTextThemeProp(colorScheme) }}>
              Shipping
            </Text>
            {shipping === 0 ? (
              <Text style={styles.freeShipping}>FREE</Text>
            ) : (
              <Text
                style={{ color: textThemeProp(colorScheme), fontWeight: "600" }}
              >
                Rs. {shipping}
              </Text>
            )}
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={textThemeObj(styles.totalLabel, colorScheme)}>
              Total
            </Text>
            <Text style={styles.totalValue}>Rs. {Math.round(grandTotal)}</Text>
          </View>
          {total < FREE_SHIPPING_THRESHOLD && (
            <Text style={styles.shippingHint}>
              Add Rs. {FREE_SHIPPING_THRESHOLD - Math.round(total)} more for
              free shipping
            </Text>
          )}
          <Pressable style={styles.checkoutBtn} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  title: {
    fontSize: 22,
    fontWeight: "800",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: { paddingHorizontal: 16, paddingBottom: 8, flexGrow: 1 },
  itemCard: {
    flexDirection: "row",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  image: { width: 80, height: 100, resizeMode: "contain", borderRadius: 8 },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: "600", marginBottom: 4 },
  price: { fontSize: 15, color: COLORS.accent, fontWeight: "700" },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 8, gap: 8 },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#e8f4fd",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 15,
    fontWeight: "600",
    minWidth: 20,
    textAlign: "center",
  },
  removeBtn: { marginLeft: 8 },
  itemTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.accent,
    alignSelf: "flex-start",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyText: { fontSize: 20, fontWeight: "700", marginTop: 16 },
  emptySubText: { fontSize: 14, marginTop: 6 },
  summary: {
    borderTopWidth: 1,
    padding: 16,
    gap: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: { fontSize: 16, fontWeight: "700" },
  totalValue: { fontSize: 18, fontWeight: "800", color: COLORS.accent },
  freeShipping: { color: "green", fontWeight: "700" },
  shippingHint: { fontSize: 12, color: COLORS.accent, textAlign: "center" },
  checkoutBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 4,
  },
  checkoutText: { color: COLORS.white, fontSize: 16, fontWeight: "800" },
});
