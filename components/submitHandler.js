import { Alert } from "react-native";
import { db } from "../constants/common";
import { addDoc, collection, setDoc, doc } from "@firebase/firestore";

async function SubmitHandler(newItem, navigation) {
  if (newItem.task.length > 0) {
    if (newItem.id === null) {
      const docRef = await addDoc(collection(db, "tasks"), {
        task: newItem.task,
        completed: false,
        createAt: new Date().valueOf(),
      });
    } else {
      const docRef = await setDoc(doc(db, "tasks", newItem.id), {
        task: newItem.task,
        completed: newItem.completed,
        createAt: new Date().valueOf(),
      });
    }
  } else {
    Alert.alert("Error!", "Cannot create an empty task", [
      { text: "Okay", onPress: () => console.log("Close alert") },
    ]);
  }
}

export default SubmitHandler;
