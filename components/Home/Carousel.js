import React, { useRef, useState } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { COLORS } from "../../utils/themes";

const { width } = Dimensions.get("window");

const images = [
  require("../../images/1.webp"),
  require("../../images/2.webp"),
  require("../../images/3.webp"),
];

const HomeCarousel = () => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        autoPlay
        autoPlayInterval={4000}
        width={width}
        height={210}
        data={images}
        scrollAnimationDuration={800}
        onSnapToItem={setActiveIndex}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 210,
    borderRadius: 14,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    width: 18,
  },
});

export default HomeCarousel;
