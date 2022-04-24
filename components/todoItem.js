import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

export default function TodoItem({ item, pressHandler }) {
    return (
        <TouchableOpacity>
            <View style={styles.item}>
                <Text style={styles.text}>{item.task}</Text>
                <AntDesign style={styles.icon} name="delete" size={24} color="black" onPress={() => pressHandler(item.key)}/>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        flex: 1,
        padding: 16,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#ededed'
    },
    text: {
        flex: 1,
    },
    icon: {
        justifyContent: 'flex-end'
    }
})