import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
export default function Header() {
  const [search, onChangeSearch] = useState("");
  return (
    <View style={styles.seachBox}>
      <TextInput
        value={search}
        style={styles.input}
        onChangeText={onChangeSearch}
        placeholder="Search here"
        placeholderTextColor="#888"
      />
      <Pressable style={styles.btn}>
        <Text style={styles.btnText}>Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  seachBox: {
    padding: 3,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "#FFDE59",
    borderRadius: 12,
    borderWidth: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#FFDE59",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginLeft: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontWeight: "600",
    color: "white",
  },
});
