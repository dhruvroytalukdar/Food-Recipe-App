import React from "react";
import { View, TouchableHighlight, StyleSheet, Text } from "react-native";

export default function MyButton({ name, onpress }) {
  return (
    <TouchableHighlight onPress={onpress}>
      <View style={styles.button}>
        <Text>{name}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "400px",
    height: "200px",
  },
});
