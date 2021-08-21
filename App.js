import React from 'react';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail';
import storeConfig from './store.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';


const Stack = createStackNavigator();
const store = storeConfig();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Landing" component={Landing} />
          <Stack.Screen name="Detail" component={Detail} options={({ route }) => ({ title: route.params.name })} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

