import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CheckBox,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function TodoItem({ item, deleteHandler, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Add task", { item: item })}
    >
      <View style={styles.item}>
        <BouncyCheckbox
          fillColor="#4f61d1"
          unfillColor="#FFFFFF"
          text={item.task}
          iconStyle={{ borderColor: "#4f61d1", borderRadius: 8 }}
          style={styles.checkbox}
        />
        <AntDesign
          style={styles.icon}
          name="delete"
          size={24}
          color="black"
          onPress={() => deleteHandler(item.key)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    flex: 1,
    padding: 16,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#ededed",
  },
  icon: {
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  checkbox: {
    flex: 1,
    alignSelf: "center",
  },
});
