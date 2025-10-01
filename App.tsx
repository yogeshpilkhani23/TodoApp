import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { appColors } from './src/utils/colors';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TodoApp from './src/screens/TodoApp';
import AddTask from './src/screens/AddTask';
import { appRoutes } from './src/utils/routerName';
import { Provider } from 'react-redux';
import store from './src/store';
import SignUp from './src/screens/SignUp';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const Stack = createStackNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  console.log('User', user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor={appColors.white}
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
              <>
                <Stack.Screen name={appRoutes.todoApp} component={TodoApp} />
                <Stack.Screen name={appRoutes.addTask} component={AddTask} />
              </>
            ) : (
              <Stack.Screen name={appRoutes.signUp} component={SignUp} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
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
