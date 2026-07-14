import React, { useMemo } from "react";
import {
  FlatList,
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import HomeCarousel from "./Carousel";
import MyCard from "./Card";
import { useCart } from "../../utils/CartContext";
import { Data, CATEGORIES } from "../../utils/product";
import { COLORS, subTextThemeProp, textThemeProp } from "../../utils/themes";

const CategoryPills = ({ active, onSelect, colorScheme }) => (
  <FlatList
    data={CATEGORIES}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item}
    contentContainerStyle={styles.pillsContainer}
    renderItem={({ item }) => {
      const isActive = item === active;
      return (
        <Pressable
          onPress={() => onSelect(item)}
          style={[
            styles.pill,
            isActive
              ? styles.pillActive
              : {
                  borderColor:
                    colorScheme === "dark"
                      ? COLORS.darkBorder
                      : COLORS.lightBorder,
                },
          ]}
        >
          <Text
            style={[
              styles.pillText,
              { color: isActive ? COLORS.white : textThemeProp(colorScheme) },
            ]}
          >
            {item}
          </Text>
        </Pressable>
      );
    }}
  />
);

const EmptyResult = ({ search, colorScheme }) => (
  <View style={styles.empty}>
    <Ionicons
      name="search-outline"
      size={48}
      color={subTextThemeProp(colorScheme)}
    />
    <Text style={[styles.emptyText, { color: subTextThemeProp(colorScheme) }]}>
      No results for "{search}"
    </Text>
  </View>
);

export default function Products({ search, activeCategory, onCategoryChange }) {
  const { addToCart } = useCart();
  const colorScheme = useColorScheme();
  const q = search.trim().toLowerCase();

  const isSearching = q.length > 0;

  const filteredHome = useMemo(() => {
    if (isSearching) return [];
    return Data.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      return matchesCategory;
    });
  }, [isSearching, activeCategory]);

  const filteredSearch = useMemo(() => {
    if (!isSearching) return [];
    return Data.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
  }, [isSearching, q]);

  const navigation = require("@react-navigation/native").useNavigation();

  const handleOpenProduct = (item) => {
    navigation.navigate("ProductDetail", { product: item });
  };

  const renderItem = ({ item }) => {
    const isOnSale = item.price > 3000;
    return (
      <MyCard
        id={item.id}
        image={item.image}
        name={item.name}
        description={item.description}
        price={isOnSale ? item.price * 0.8 : item.price}
        originalPrice={isOnSale ? item.price : null}
        addToCart={addToCart}
        onPress={() => handleOpenProduct(item)}
      />
    );
  };

  const listHeader = (
    <>
      {!isSearching && <HomeCarousel />}
      {!isSearching && (
        <CategoryPills
          active={activeCategory}
          onSelect={onCategoryChange}
          colorScheme={colorScheme}
        />
      )}
      {isSearching && (
        <View
          style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 4 }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: subTextThemeProp(colorScheme),
            }}
          >
            Search results
          </Text>
        </View>
      )}
    </>
  );

  return (
    <FlatList
      ListHeaderComponent={() => listHeader}
      data={isSearching ? filteredSearch : filteredHome}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{
        justifyContent: "space-evenly",
        paddingHorizontal: 8,
      }}
      contentContainerStyle={{ gap: 12, paddingBottom: 24 }}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <EmptyResult search={search} colorScheme={colorScheme} />
      }
    />
  );
}

const styles = StyleSheet.create({
  pillsContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
