import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { FAB } from "@rneui/themed";
import { useFocusEffect  } from '@react-navigation/native';

import TodoItem from "../components/TodoItem";

import { db } from "../constants/common";
import { doc, getDocs, collection, deleteDoc, onSnapshot, disableNetwork, enableNetwork } from "@firebase/firestore";

export default function HomeScreen({ navigation, route }) {  
  // const disableNetworkFirestore = async () => {
  //   await disableNetwork(db);
  // }
  // disableNetworkFirestore();

  const [taskItems, setTaskItems] = React.useState([]);

  // Render tasks
  useFocusEffect(
    React.useCallback(() => {
      // Subscribe fetch data when the screen is focused   
      const unsubscribe = onSnapshot(collection(db, "tasks"), (querySnapshot) => {
        const getTasksFromFireBase = [];
        querySnapshot.forEach((doc) => {
          getTasksFromFireBase.push({
            ...doc.data(),
            key: doc.id,
          });
        });
        
        // const source = querySnapshot.metadata.fromCache ? "Local" : "Server";
        // console.log("Data came from " + source);
        getTasksFromFireBase.sort((t1, t2) => t1.createAt - t2.createAt).reverse();
        setTaskItems(getTasksFromFireBase);
      })

      return () => {
        // Unsubscribe fetch data when the screen is unfocused
        unsubscribe()
      };
    }, [])
  );
  
  //Delete task
  const deleteHandler = async (key) => {
    let arr = taskItems.filter((item) => item.key !== key);
    setTaskItems(arr);
    await deleteDoc(doc(db, "tasks", key));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.list}>
          <FlatList
            data={taskItems}
            renderItem={({ item }) => (
              <TodoItem
                item={item}
                deleteHandler={deleteHandler}
                navigation={navigation}
              />
            )}
          />
        </View>
      </View>

      <FAB
        visible={true}
        icon={{ name: "add", color: "white" }}
        color="#4f61d1"
        placement="right"
        onPress={() => navigation.navigate("Add task")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});
