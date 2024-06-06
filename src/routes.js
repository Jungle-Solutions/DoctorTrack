import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './pages/home';
import { Faces } from './pages/faces';
import { Register } from './pages/register'; 
import { Ionicons } from '@expo/vector-icons';
import Confirm from './pages/confirm';
import { View, Text } from 'react-native';
import List from './pages/list';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const tabBarOptions = {
  activeTintColor: '#ff6347', 
  inactiveTintColor: '#8e8e93', 
  style: {
    backgroundColor: '#ffffff', 
    borderTopWidth: 0,
    elevation: 10, 
    shadowOpacity: 0.1,
    shadowRadius: 10, 
  },
  tabStyle: {
    paddingVertical: 5,
  },
};
function CustomTabBarIcon({ name, focused, size, color }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={name} size={size} color={color} />
      {focused && <Text style={{ color, fontSize: 12 }}>•</Text>}
    </View>
  );
}
function MainTabs() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <CustomTabBarIcon
              name={focused ? 'home' : 'home-outline'}
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
            <Tab.Screen
        name="List"
        component={List}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <CustomTabBarIcon
              name={focused ? 'list' : 'list-outline'}
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Faces"
        component={Faces}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <CustomTabBarIcon
              name={focused ? 'happy' : 'happy-outline'}
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Confirm" component={Confirm} />
    </Stack.Navigator>
  );
}
