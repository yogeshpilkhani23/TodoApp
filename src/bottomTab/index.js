import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { appRoutes } from '../utils/routerName/index';
import CustomTabBar from './components';
import { useSelector } from 'react-redux';
import TodoApp from '../screens/TodoApp';
import AddTask from '../screens/AddTask';
import {
  TabVisibilityProvider,
  useTabVisibility,
} from '../utils/context/TabVisibilityContext';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { isTabVisible } = useTabVisibility();
  const user = useSelector(state => state.user);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={props => <CustomTabBar {...props} isVisible={isTabVisible} />}
    >
      <Tab.Screen name={appRoutes.todoApp} component={TodoApp} />
      <Tab.Screen name={appRoutes.addTask} component={AddTask} />
    </Tab.Navigator>
  );
};

export default BottomTab;
