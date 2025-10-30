import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from './src/utils/colors';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { appRoutes } from './src/utils/routerName';
import { Provider } from 'react-redux';
import store from './src/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import BottomTab from './src/bottomTab';
import { TabVisibilityProvider } from './src/utils/context/TabVisibilityContext';

const App = () => {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  console.log('User', user);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appColors.white}
          barStyle={'dark-content'}
        />
         {/* ✅ Wrap Navigation inside TabVisibilityProvider */}
        <TabVisibilityProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={appRoutes.bottomTab}
          >
            <Stack.Screen name={appRoutes.bottomTab} component={BottomTab} />
          </Stack.Navigator>
        </NavigationContainer>
        </TabVisibilityProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
