import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import Home from "../screens/Home";
import Messages from "../screens/Messages";
import Cart from "../screens/Cart";
import Account from "../screens/Account";
import Deals from "../screens/Deal";
import { useCart } from "../utils/CartContext";
import { COLORS } from "../utils/themes";

const Tab = createBottomTabNavigator();

const CartIcon = ({ color, size, focused }) => {
  const { cartItems } = useCart();
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <View>
      <Ionicons name={focused ? "cart" : "cart-outline"} color={color} size={size} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
        </View>
      )}
    </View>
  );
};

export default function RootNavigator() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: isDark ? "#1a1a2e" : "#fff" },
        headerTintColor: isDark ? "#f0f0f0" : "#111",
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: isDark ? "#888" : "#aaa",
        tabBarStyle: {
          backgroundColor: isDark ? "#1a1a2e" : "#fff",
          borderTopColor: isDark ? "#333" : "#eee",
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarIcon: ({ focused, size, color }) => {
          if (route.name === "Cart") return <CartIcon color={color} size={size} focused={focused} />;
          const icons = {
            Home: focused ? "home" : "home-outline",
            Message: focused ? "chatbox" : "chatbox-outline",
            Account: focused ? "person" : "person-outline",
            Deals: focused ? "pricetag" : "pricetag-outline",
          };
          return <Ionicons name={icons[route.name] || "ellipse-outline"} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Deals" component={Deals} options={{ headerShown: false }} />
      <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
      <Tab.Screen name="Message" component={Messages} options={{ title: "Support" }} />
      <Tab.Screen name="Account" component={Account} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: COLORS.danger,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: { color: "#fff", fontSize: 9, fontWeight: "800" },
});
