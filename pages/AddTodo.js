import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

import { db } from '../constants/common'
import { 
    addDoc,
    collection
} from '@firebase/firestore'

export default function AddToDo({ navigation }) {
    const [text, setText] = useState('')

    const changeHandler = (val) => {
        setText(val)
    }
    
    const submitHandler = async (text) => {
        if (text.length > 0) {
            const docRef = await addDoc(collection(db, "tasks"), {
                task: text,
                createAt: new Date().valueOf(),
            });
            navigation.navigate("Today's tasks")
        } else {
            Alert.alert('Error!', 'Cannot create an empty task', [
                {text: 'Okay', onPress: () => console.log('Close alert')}
            ])
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New todo..."
                onChangeText={changeHandler}
            />

            <Button
                style={styles.addBtn}
                onPress={() => {
                    submitHandler(text)
                }} 
                title='Add' 
                color="#4f61d1" 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        marginBottom: 20,
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
})