import * as React from "react"
import { StyleSheet, View, FlatList } from 'react-native';
import { FAB } from '@rneui/themed';

import TodoItem from "../components/todoItem";

import { db } from '../constants/common'
import { 
    doc,
    getDocs,
    collection,
    deleteDoc
} from '@firebase/firestore'

export default function HomeScreen({ navigation, route }) {
    const [visible, setVisible] = React.useState(true);

    const [taskItems, setTaskItems] = React.useState([])

    // Render tasks
    const fetchTasks = async () => {
        const getTasksFromFireBase = []
        const querySnapshot = await getDocs(collection(db, "tasks"));
        querySnapshot.forEach((doc) => {
            getTasksFromFireBase.push({
                ...doc.data(),
                key: doc.id
            })
        });
        getTasksFromFireBase.sort((t1, t2) => t1.createAt - t2.createAt).reverse()
        setTaskItems(getTasksFromFireBase)
    }

    React.useEffect(() => {
        fetchTasks()
    }, [])

    //Delete task
    const deleteHandler = async (key) => {
        await deleteDoc(doc(db, "tasks", key))
        fetchTasks()
    }

    //Re-render after go back from another screen
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchTasks()
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.list}>
                <FlatList 
                    data={taskItems}
                    renderItem={({ item }) => (
                        <TodoItem item={item} deleteHandler={deleteHandler} navigation={navigation} />
                    )}
                />
                </View>
            </View>

            <FAB
                visible={visible}
                icon={{ name: 'add', color: 'white' }}
                color='#4f61d1'
                placement='right'
                onPress={() => navigation.navigate('Add task')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: 'white'
    },
    list: {
        marginTop: 20,
        flex: 1,
    }
})