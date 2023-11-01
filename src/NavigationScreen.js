import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartScreen from "./StartScreen";
import HomeScreen from "./Main";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="Home" key={HomeScreen} component={HomeScreen} options={{title:'Home', headerBackTitleVisible:false, headerShown:false}}  />
        <Stack.Screen name="StartScreen" key={StartScreen} component={StartScreen} options={{title:'Start', headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
  
export default App;