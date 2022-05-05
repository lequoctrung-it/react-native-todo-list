import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import submitHandler from '../components/submitHandler'

export default function AddToDo({ route, navigation }) {
    const [ btnTitle, setBtnTitle] = useState('Add')
    
    const [text, setText] = useState(() => {
        if (route.params?.item) {
            setBtnTitle('Update')
            return route.params.item.task
        }
        return ''
    })

    const changeHandler = (val) => {
        setText(val)
    }

    const addHandler = () => {
        if (route.params?.item) {
            const newItem = {
                id: route.params.item.key,
                task: text,
            }
            submitHandler(newItem, navigation)
        } else {
            const newItem = {
                id: null,
                task: text,
            }
            submitHandler(newItem, navigation)
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New todo..."
                onChangeText={changeHandler}
                value={text}
            />

            <Button
                style={styles.addBtn}
                onPress={addHandler} 
                title={btnTitle} 
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