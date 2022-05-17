import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { updateDoc, doc } from "@firebase/firestore";
import { db } from "../constants/common";

export default function TodoItem({ item, deleteHandler, navigation }) {
  const toggleComplete = async (isChecked) => {
    const docRef = await updateDoc(doc(db, "tasks", item.key), {
      completed: isChecked
    });
  }
  
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
          onPress={(isChecked) => toggleComplete(isChecked)}
          isChecked={item.completed}
        />
        
        <Text style={styles.space}></Text>

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
    alignSelf: "center",
  },
  space: {
    flex: 1
  }
});
