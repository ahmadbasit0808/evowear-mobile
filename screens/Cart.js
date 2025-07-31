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
import { useCart } from "../utils/CardContext";
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

        <Text style={styles.subtotal}>
          Subtotal: Rs. {item.price * item.quantity}
        </Text>

        <TouchableOpacity onPress={() => removeFromCart(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

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
        <View style={styles.totalContainer}>
          <Text style={textThemeObj(styles.totalText, colorScheme)}>
            Total: Rs. {getTotal()}
          </Text>
          <Pressable style={styles.order} onPress={handlePress}>
            <Text style={styles.orderText}> Place Order</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
  },
  image: { width: 100, height: "auto", borderRadius: 6 },
  details: { flex: 1, marginLeft: 12 },
  name: { fontSize: 18, fontWeight: "500" },
  price: { fontSize: 16, color: "#333" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  qtyBtn: {
    fontSize: 20,
    width: 32,
    textAlign: "center",
    backgroundColor: "#ddd",
    borderRadius: 4,
    marginHorizontal: 5,
  },
  qtyText: { fontSize: 16, fontWeight: "bold" },
  subtotal: { fontSize: 14, color: "#444", marginTop: 5 },
  remove: { color: "red", marginTop: 8 },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingTop: 12,
    marginTop: "auto",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
  order: {
    backgroundColor: "#269dd3",
    alignSelf: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
  },
  orderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
