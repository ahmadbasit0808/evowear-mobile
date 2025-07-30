import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Guest from "../../images/guest.png";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "../../utils/UserContext";
import { Badge } from "react-native-elements";
import { bgThemeObj, textThemeObj } from "../../utils/themes";

const List = [
  { id: "1", name: "card-outline", text: "To Pay", key: "pay" },
  { id: "2", name: "cube-outline", text: "To Ship", key: "ship" },
  { id: "3", name: "checkmark-done", text: "Delivered", key: "deliver" },
  { id: "4", name: "create-outline", text: "To Review", key: "review" },
  {
    id: "5",
    name: "close-circle-outline",
    text: "Cancelled",
    key: "cancel",
  },
];

const Icon = ({ item, count, colorScheme }) => {
  return (
    <Pressable style={styles.iconBox}>
      <View>
        <Ionicons size={28} color="#269dd3" name={item.name} />
        {typeof count === "number" && count > 0 && (
          <Badge value={count} status="error" containerStyle={styles.badge} />
        )}
      </View>
      <Text style={textThemeObj(styles.iconText, colorScheme)}>
        {item.text}
      </Text>
    </Pressable>
  );
};
export default function UserPage() {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const iconList = List.map((item) => {
    const count = item.key && user ? user[item.key] ?? 0 : null;
    return (
      <Icon key={item.id} colorScheme={colorScheme} item={item} count={count} />
    );
  });

  return (
    <View style={bgThemeObj(styles.container, colorScheme)}>
      <View style={styles.imageContainer}>
        <Image source={Guest} style={styles.image} />
        <Text style={textThemeObj(styles.imageText, colorScheme)}>
          {user?.name}
        </Text>
      </View>
      <View>
        <Text style={textThemeObj(styles.title, colorScheme)}>My Orders</Text>
        <View style={styles.iconRow}>{iconList}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  image: {
    height: 75,
    width: 75,
    resizeMode: "contain",
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  imageText: {
    fontSize: 22,
    fontWeight: "600",
  },
  iconBox: {
    alignItems: "center",
    position: "relative",
  },
  iconRow: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconText: {
    fontSize: 10,
    marginTop: 4,
  },
  badge: { position: "absolute", top: -4, right: -10 },
  title: {
    paddingLeft: 15,
    fontWeight: "600",
    fontSize: 16,
  },
});
