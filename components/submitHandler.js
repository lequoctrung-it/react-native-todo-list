import React from 'react'
import { todos } from './mockAPI'

function submitHandler(text) {

    if (text.length > 0) {
            const newTodos = [
            { text: text, key: Math.random().toString() },
            ...todos,
            ]
    console.log(newTodos)
    }
    //     } else {
    //     Alert.alert('Error!', 'Cannot create an empty task', [
    //         {text: 'Okay', onPress: () => console.log('Close alert')}
    //     ])
    // }
}

export default submitHandler