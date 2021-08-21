import React from 'react';
import Home from './components/Home';
import Detail from './components/Detail';
import storeConfig from './store.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createStackNavigator();
const store = storeConfig();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Dogs app" component={Home} />
            <Stack.Screen name="Detail" component={Detail} options={({ route }) => ({ title: route.params.name })} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

