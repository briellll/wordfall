import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../wordfall/src/screens/Settings';
import Home from '../wordfall/src/screens/Home';
import Play from './src/screens/Game';

const Stack = createStackNavigator();


const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false}}/>
                <Stack.Screen name="Play" component={Play} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
