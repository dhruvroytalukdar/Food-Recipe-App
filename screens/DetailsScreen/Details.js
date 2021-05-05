import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function Details({ route, navigation }) {
  const details = route.params.foodDetails;
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState(false);
  console.log(details);

  return (
    <View
      style={{
        ...styles.container,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <Icon
          name="arrow-back"
          type="material"
          size={32}
          containerStyle={{ alignSelf: "flex-start" }}
          onPress={() => navigation.goBack()}
        />
        <Icon
          name={favorites ? "favorite" : "favorite-border"}
          type="material"
          size={32}
          containerStyle={{ alignSelf: "flex-end" }}
          color="red"
          onPress={() => {
            favorites ? setFavorites(false) : setFavorites(true);
          }}
        />
      </View>
      <Text style={styles.title}>{details.label}</Text>
      <View style={styles.detailsection}>
        <View style={styles.data}>
          <Icon
            name="timer"
            type="material"
            containerStyle={{ marginBottom: 5 }}
            size={28}
            color="red"
          />
          <Text style={{ fontSize: 14 }}>
            {parseInt(details.totalTime) === 0
              ? "few mins"
              : details.totalTime + " mins"}
          </Text>
        </View>
        <View style={styles.data}>
          <Icon
            name="ramen-dining"
            containerStyle={{ marginBottom: 5 }}
            type="material"
            size={28}
            color="red"
          />
          <Text style={{ fontSize: 14 }}>{details.totalWeight} gms</Text>
        </View>
        <View style={styles.data}>
          <Icon
            name="local-fire-department"
            type="material"
            size={28}
            color="red"
            containerStyle={{ marginBottom: 5 }}
          />
          <Text style={{ fontSize: 14 }}>{details.calories} cals</Text>
        </View>
      </View>
      <Image
        resizeMode="contain"
        style={styles.foodPicture}
        source={{ uri: details.image }}
      />
      <View style={styles.bottomsection}>
        <Text style={{ fontSize: 23, fontFamily: "Poppins-semibold" }}>
          Ingredients
        </Text>
        <FlatList
          horizontal={true}
          data={details.ingredientLines}
          renderItem={(item) => <Text>{item.item}</Text>}
          keyExtractor={(item) => uuidv4()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomsection: {
    //backgroundColor: "aqua",
    width: "81%",
    flex: 1,
  },
  container: {
    padding: 10,
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ECFAFC",
  },
  detailsection: {
    width: "100%",
    height: 40,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  data: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-bold",
    fontSize: 25,
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  foodPicture: {
    width: 290,
    height: 340,
    borderRadius: 15,
  },
});
