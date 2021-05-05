import Details from "./screens/DetailsScreen/Details";
import React, { useState } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeScreen/Home";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(false);
  const getFont = () => {
    Font.loadAsync({
      "Poppins-regular": require("./assets/fonts/Poppins-Regular.ttf"),
      "Poppins-bold": require("./assets/fonts/Poppins-Bold.ttf"),
      "Poppins-semibold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    });
  };
  if (loading) {
    return (
      <SafeAreaProvider>
        <NavigationContainer style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Details"
              component={Details}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } else {
    const item = (
      <AppLoading
        startAsync={getFont}
        onFinish={() => setLoading(true)}
        onError={(e) => console.log(e)}
      />
    );
    return item;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Poppins-regular",
  },
});
