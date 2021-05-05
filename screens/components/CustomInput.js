import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Input, Icon } from "react-native-elements";

export function CustomInput(props) {
  return (
    <View style={props.style}>
      <Input
        rightIcon={
          <TouchableOpacity>
            <Icon
              onPress={props.handleIconPress}
              name="search"
              type="material"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        }
        rightIconContainerStyle={{
          paddingRight: 14,
          paddingLeft: 15,
          backgroundColor: "#9283E6",
          borderRadius: 25,
        }}
        inputContainerStyle={{
          borderBottomWidth: 0,
          shadowColor: "black",
          backgroundColor: "white",
          elevation: 10,
          paddingHorizontal: 10,
          paddingLeft: 20,
          paddingVertical: 5,
          borderRadius: 30,
        }}
        onChangeText={props.changeTextHandler}
        placeholder="Search"
      />
    </View>
  );
}
