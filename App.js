import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './src/pages/Home/Home';
import Form from './src/pages/Form/Form';
import { useEffect } from 'react';

const StackApp = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName='Home'>
        <StackApp.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <StackApp.Screen name="Form" component={Form} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}

