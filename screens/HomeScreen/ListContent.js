import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default function ListContent(props) {
  return (
    <LinearGradient colors={["#ECE2FE", "#E2F6FE"]} style={styles.contents}>
      <Text style={styles.foodTitle}>{props.item.label}</Text>
      <View style={styles.imageShadow}>
        <Image style={styles.foodPicture} source={{ uri: props.item.image }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  imageShadow: {
    shadowColor: "black",
    elevation: 20,
  },
  foodPicture: {
    width: 250,
    height: 250,
    marginBottom: 10,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  foodTitle: {
    textAlign: "center",
    fontFamily: "Poppins-semibold",
    fontSize: 20,
    margin: 12,
  },
  contents: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 20,
    marginVertical: 15,
    backgroundColor: "aqua",
    borderRadius: 10,
    shadowColor: "lightgrey",
    elevation: 5,
  },
});
