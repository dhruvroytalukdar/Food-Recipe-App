import React from "react";
import { FlatList, Text, View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { Icon } from "react-native-elements";

const ShowItems = (props) => {
  const convert = (item) => {
    return parseFloat(item).toFixed(2).toString();
  };
  return (
    <View style={styles.contents}>
      <Text
        style={{
          fontFamily: "Poppins-regular",
          alignSelf: "flex-start",
          fontSize: 16,
          paddingVertical: 15,
        }}
      >
        <Text style={{ fontSize: 18 }}>{"\u2B24  "}</Text>
        {props.item.text}
      </Text>
      <Icon
        containerStyle={{
          alignSelf: "flex-start",
          paddingLeft: 20,
          marginBottom: 5,
        }}
        name="dinner-dining"
        type="material"
        color="#6946E8"
      />
      <Text style={{ alignSelf: "flex-start", paddingLeft: 20 }}>
        {convert(props.item.weight)} gms
      </Text>
      {props.item.image && (
        <Image style={styles.image} source={{ uri: props.item.image }} />
      )}
    </View>
  );
};

export default function Ingredients({ route, navigation }) {
  const data = route.params.ingredients;
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 20,
        marginBottom: insets.bottom + 20,
        paddingHorizontal: 25,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Icon
          name="arrow-back"
          type="material"
          size={30}
          containerStyle={{ paddingRight: 12 }}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Ingredients Required</Text>
      </View>
      <FlatList
        data={data}
        renderItem={(item) => <ShowItems {...item} />}
        keyExtractor={(item) => uuidv4()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contents: {
    paddingVertical: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "aqua",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: "Poppins-semibold",
    fontSize: 20,
  },
});
