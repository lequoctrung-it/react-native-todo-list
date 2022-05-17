import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  Text,
} from "react-native";
import SubmitHandler from "../components/SubmitHandler";

export default function AddToDo({ route, navigation }) {
  const [btnTitle, setBtnTitle] = useState("Add");

  const [text, setText] = useState(() => {
    if (route.params?.item) {
      setBtnTitle("Update");
      return route.params.item.task;
    }
    return "";
  });

  const addHandler = () => {
    if (route.params?.item) {
      const newItem = {
        id: route.params.item.key,
        completed: route.params.item.completed,
        task: text,
      };
      SubmitHandler(newItem, navigation);
    } else {
      const newItem = {
        id: null,
        task: text,
      };
      SubmitHandler(newItem, navigation);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What do you need to do?"
        onChangeText={setText}
        value={text}
      />

      <TouchableHighlight
        style={styles.submit}
        onPress={addHandler}
        underlayColor="#fff"
      >
        <Text style={styles.submitText}>{btnTitle}</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  input: {
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#ebeef3",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#c7c8cb",
  },
  submit: {
    marginTop: 100,
    paddingVertical: 15,
    backgroundColor: "#4f61d1",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
  },
});
