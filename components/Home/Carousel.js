import React from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";

const { width } = Dimensions.get("window");

const images = [
  require("../../images/1.webp"),
  require("../../images/2.webp"),
  require("../../images/3.webp"),
];

const HomeCarousel = () => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        showsPagination={true}
        dotColor="#ccc"
        removeClippedSubviews={false}
        activeDotColor="#000"
        autoplayTimeout={5}
        style={styles.wrapper}
      >
        {images.map((source, index) => (
          <View key={index} style={styles.slide}>
            <Image source={source} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginVertical: 10,
  },
  wrapper: {},
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
