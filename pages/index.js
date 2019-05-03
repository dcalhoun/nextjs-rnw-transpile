import React from "react";
import { StyleSheet, Text, View } from "react-native";

function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, world!</Text>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: "red"
  },
  text: {
    color: "white"
  }
});

export default Home;
