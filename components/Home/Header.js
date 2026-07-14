import { View, TextInput, Text, StyleSheet, useColorScheme, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, bgThemeProp, textThemeProp, subTextThemeProp } from "../../utils/themes";

export default function Header({ search, onSearchChange }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.wrapper, { backgroundColor: bgThemeProp(colorScheme) }]}>
      <Text style={[styles.brand, { color: textThemeProp(colorScheme) }]}>
        evo<Text style={styles.brandAccent}>wear</Text>
      </Text>
      <View style={[styles.searchBox, { backgroundColor: isDark ? COLORS.darkInput : "#f5f5f5", borderColor: isDark ? COLORS.darkBorder : COLORS.lightBorder }]}>
        <Ionicons name="search-outline" size={18} color={subTextThemeProp(colorScheme)} style={styles.searchIcon} />
        <TextInput
          value={search}
          style={[styles.input, { color: textThemeProp(colorScheme) }]}
          onChangeText={onSearchChange}
          placeholder="Search products..."
          placeholderTextColor={subTextThemeProp(colorScheme)}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <Pressable onPress={() => onSearchChange("")}>
            <Ionicons name="close-circle" size={18} color={subTextThemeProp(colorScheme)} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  brand: {
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 10,
  },
  brandAccent: {
    color: COLORS.primary,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 6,
  },
  searchIcon: { marginRight: 8 },
  input: { flex: 1, fontSize: 15 },
});
