import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  useColorScheme,
} from "react-native";
import { useCart } from "../utils/CartContext";
import { bgThemeObj, textThemeObj, textThemeProp } from "../utils/themes";
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

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.detailsFlex}>
          <Text style={styles.price}>Rs. {item.price}</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity onPress={() => decreaseQty(item.id)}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => increaseQty(item.id)}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const ClearCart = () => {
    return (
      <Pressable style={styles.order} onPress={handlePress}>
        <Text style={styles.orderText}> Place Order</Text>
      </Pressable>
    );
  };

  const handlePress = () => {
    Alert.alert("Order placed successfully");
    clearCart();
  };

  return (
    <View style={bgThemeObj(styles.container, colorScheme)}>
      <Text style={textThemeObj(styles.title, colorScheme)}>Your Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginTop: 10,
              color: textThemeProp(colorScheme),
            }}
          >
            Cart is empty!
          </Text>
        }
      />
      {cartItems.length > 0 && (
        <>
          <View style={styles.totalContainer}>
            <View>
              <Text style={textThemeObj(styles.totalText, colorScheme)}>
                Subtotal: <Text style={styles.textPrice}>Rs. {getTotal()}</Text>
              </Text>
              {getTotal() > 5000 ? (
                <Text style={textThemeObj(styles.shippingText, colorScheme)}>
                  Free Shipping
                </Text>
              ) : (
                <Text style={textThemeObj(styles.shippingText, colorScheme)}>
                  Shipping Fee: <Text style={styles.textPrice}>Rs. 200</Text>
                </Text>
              )}
            </View>
            <Pressable style={styles.order} onPress={handlePress}>
              <Text style={styles.orderText}>Check Out</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  image: { width: 100, height: "120", resizeMode: "contain" },
  details: { flex: 1, marginLeft: 12 },
  detailsFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  name: { fontSize: 16, fontWeight: "500" },
  price: { fontSize: 18, color: "#269dd3" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    fontSize: 15,
    width: 24,
    textAlign: "center",
    backgroundColor: "#eee",
    borderRadius: 4,
    marginHorizontal: 5,
  },
  qtyText: { fontSize: 16, opacity: 0.6 },
  remove: { color: "red", marginTop: 5 },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 12,
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 16,
  },
  textPrice: {
    color: "#269dd3",
    fontWeight: "700",
  },
  shippingText: {
    opacity: 0.6,
    fontSize: 13,
    textAlign: "center",
  },
  order: {
    backgroundColor: "#269dd3",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  orderText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
