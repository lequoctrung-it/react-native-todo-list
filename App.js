import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddToDo from './pages/AddTodo';
import HomeScreen from './pages/HomeScreen'

export default function App() {
  const options = {
    headerStyle: { 
      backgroundColor: '#4f61d1'
    },
    headerTintColor: 'white'
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Today's tasks" component={HomeScreen} options={options} />

        <Stack.Screen name="Add task" component={AddToDo} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
