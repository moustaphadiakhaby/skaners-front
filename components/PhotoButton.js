import * as React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function PhotoButton({ title, onPress, icon, color }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Entypo name={icon} size={30} color={color ? color : "#f1f1f1"} />
      {title && <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#f1f1f1",
    marginHorizontal: 10,
  },
});
