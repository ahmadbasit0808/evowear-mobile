import {
  View, Text, Pressable, Image, StyleSheet, useColorScheme, ScrollView,
} from "react-native";
import Guest from "../../images/guest.png";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../utils/UserContext";
import { Badge } from "react-native-paper";
import { bgThemeObj, textThemeObj, subTextThemeProp, COLORS } from "../../utils/themes";
import { showMessage } from "react-native-flash-message";

const ORDER_ITEMS = [
  { id: "1", name: "card-outline", text: "To Pay", key: "pay" },
  { id: "2", name: "cube-outline", text: "To Ship", key: "ship" },
  { id: "3", name: "checkmark-done", text: "Delivered", key: "deliver" },
  { id: "4", name: "create-outline", text: "To Review", key: "review" },
  { id: "5", name: "close-circle-outline", text: "Cancelled", key: "cancel" },
];

const MENU_ITEMS = [
  { icon: "location-outline", label: "My Addresses" },
  { icon: "card-outline", label: "Payment Methods" },
  { icon: "notifications-outline", label: "Notifications" },
  { icon: "help-circle-outline", label: "Help & Support" },
  { icon: "shield-checkmark-outline", label: "Privacy Policy" },
];

export default function UserPage() {
  const { user, logout } = useUser();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const borderColor = isDark ? COLORS.darkBorder : COLORS.lightBorder;

  const handleLogout = () => {
    logout();
    showMessage({ message: "Signed out", type: "info", icon: "info", duration: 1800 });
  };

  return (
    <ScrollView style={bgThemeObj(styles.container, colorScheme)} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <Image
          source={user?.image ? (typeof user.image === "string" ? { uri: user.image } : user.image) : Guest}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={textThemeObj(styles.name, colorScheme)}>{user?.name}</Text>
          <Text style={[styles.email, { color: subTextThemeProp(colorScheme) }]}>{user?.email}</Text>
        </View>
      </View>

      {/* My Orders */}
      <View style={[styles.section, { borderColor }]}>
        <View style={styles.sectionHeader}>
          <Text style={textThemeObj(styles.sectionTitle, colorScheme)}>My Orders</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <View style={styles.orderRow}>
          {ORDER_ITEMS.map((item) => {
            const count = user?.[item.key] ?? 0;
            return (
              <Pressable key={item.id} style={styles.orderItem}>
                <View>
                  <Ionicons size={26} color={COLORS.accent} name={item.name} />
                  {count > 0 && <Badge style={styles.badge}>{count}</Badge>}
                </View>
                <Text style={[styles.orderLabel, { color: subTextThemeProp(colorScheme) }]}>{item.text}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.section, { borderColor }]}>
        {MENU_ITEMS.map((item, i) => (
          <Pressable
            key={i}
            style={[styles.menuItem, { borderBottomColor: isDark ? COLORS.darkBorder : "#f0f0f0" }]}
          >
            <Ionicons name={item.icon} size={22} color={COLORS.accent} />
            <Text style={[textThemeObj(styles.menuLabel, colorScheme), { flex: 1 }]}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={subTextThemeProp(colorScheme)} />
          </Pressable>
        ))}
      </View>

      {/* Sign Out */}
      <Pressable style={styles.signOutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color={COLORS.danger} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 14,
  },
  avatar: {
    height: 70, width: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  profileInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: "700" },
  email: { fontSize: 13, marginTop: 2 },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  sectionTitle: { fontSize: 15, fontWeight: "700" },
  seeAll: { fontSize: 13, color: COLORS.accent, fontWeight: "600" },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 16,
    paddingHorizontal: 8,
  },
  orderItem: { alignItems: "center", gap: 6 },
  orderLabel: { fontSize: 11 },
  badge: {
    position: "absolute", top: -4, right: -10,
    backgroundColor: COLORS.danger, color: COLORS.white,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
    borderBottomWidth: 1,
  },
  menuLabel: { fontSize: 15 },
  signOutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  signOutText: { color: COLORS.danger, fontWeight: "700", fontSize: 15 },
});
