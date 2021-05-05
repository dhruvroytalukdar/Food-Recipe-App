import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { CustomInput } from "../components/CustomInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ListContent from "./ListContent";
import { Image } from "react-native-elements/dist/image/Image";
import { TouchableOpacity } from "react-native-gesture-handler";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function Home({ navigation }) {
  const [text, setText] = useState("");
  const [foodList, setFoodList] = useState([]);
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const numItems = 5;
  var keyOfItems = 0;

  const refactorData = (recipes) => {
    var list = [];
    for (let recipe of recipes) {
      const obj = {
        id: uuidv4(),
        label: recipe.recipe.label,
        image: recipe.recipe.image,
        ingredientLines: recipe.recipe.ingredientLines,
        ingredients: recipe.recipe.ingredients,
        totalTime: recipe.recipe.totalTime,
        totalWeight: parseFloat(recipe.recipe.totalWeight)
          .toFixed(2)
          .toString(),
        healthLabels: recipe.recipe.healthLabels,
        calories: parseFloat(recipe.recipe.calories).toFixed(2).toString(),
        cautions: recipe.recipe.cautions,
      };
      keyOfItems++;
      list.push(obj);
    }
    return list;
  };

  const handleDetailsView = (food) => {
    navigation.navigate("Details", {
      itemId: food.id,
      foodDetails: food.item,
    });
  };

  const renderItems = useCallback((item) => {
    return (
      <TouchableOpacity onPress={() => handleDetailsView(item)}>
        <ListContent {...item} />
      </TouchableOpacity>
    );
  }, []);
  const keyExtractor = useCallback((item) => item.id);

  const handleIconPress = () => {
    if (text.length === 0) return;
    var data = parseInt(Math.random() * 10) % 40;
    setIndex(data);
    fetch(
      `https://api.edamam.com/search?app_id=94f217ed&app_key=df4054ba150dfb830540afd3f1662964&q=${text}&from=${data}&to=${
        data + numItems
      }`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    )
      .then((res) => res.json())
      .then((response) => {
        var factoredList = refactorData(response.hits);
        setFoodList(factoredList);
      })
      .catch((err) => console.log(err));
  };

  const handleNoList = () => {
    return (
      <View style={styles.content}>
        <Text style={styles.greetings}>What's on your mind?</Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          Search something like 'chicken'
        </Text>
        <Image
          style={styles.animation}
          source={require("../../assets/cook.png")}
        />
      </View>
    );
  };

  const loadMoreData = () => {
    var val = index + numItems + 1;
    setIndex(val);
    console.log("Loading more data");
    fetch(
      `https://api.edamam.com/search?app_id=94f217ed&app_key=df4054ba150dfb830540afd3f1662964&q=${text}&from=${val}&to=${
        val + numItems
      }`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    )
      .then((res) => res.json())
      .then((response) => {
        var newItems = refactorData(response.hits);
        if (newItems.length !== 0) {
          var newList = [...foodList, ...newItems];
          setFoodList(newList);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={{ ...styles.container, paddingTop: insets.top }}>
      <LinearGradient colors={["#ffffff", "#E0EAFC"]} style={styles.searchform}>
        <CustomInput
          changeTextHandler={(text) => setText(text)}
          handleIconPress={handleIconPress}
          style={styles.input}
        />
      </LinearGradient>
      <View style={styles.content}>
        {foodList.length !== 0 ? (
          <FlatList
            data={foodList}
            renderItem={renderItems}
            keyExtractor={keyExtractor}
            onEndReached={loadMoreData}
          />
        ) : (
          handleNoList()
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
    borderRadius: 25,
    marginTop: 90,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -12,
  },
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#ECFAFC",
  },
  input: {
    marginTop: 20,
    padding: 2,
  },
  greetings: {
    textAlign: "center",
    fontSize: 22,
    fontFamily: "Poppins-bold",
  },
  searchform: {
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "red",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
