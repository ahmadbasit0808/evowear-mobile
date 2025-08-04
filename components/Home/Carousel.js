import React, { useRef } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const images = [
  require("../../images/1.webp"),
  require("../../images/2.webp"),
  require("../../images/3.webp"),
];

const HomeCarousel = () => {
  const carouselRef = useRef(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        autoPlay
        autoPlayInterval={5000}
        width={width}
        height={200}
        data={images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 10,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 20,
    height: 200,
    borderRadius: 5,
  },
});

export default HomeCarousel;
