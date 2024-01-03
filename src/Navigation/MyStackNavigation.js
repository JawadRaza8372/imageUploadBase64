import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import ShowImageScreen from '../Screens/ShowImageScreen';

const Stack = createNativeStackNavigator();

const MyStackNavigation = () => {
  const resultParm = {
    hideList: false,
    hideRatting: true,
    hideReasonInput: true,
    hideTwoSmallBtn: true,
    hideSingleBtn: false,
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'HomsScreen'}>
      <Stack.Screen name="HomsScreen" component={HomeScreen} />
      <Stack.Screen
        name="ShowImageScreen"
        component={ShowImageScreen}
        initialParams={{imageLink: ''}}
      />
    </Stack.Navigator>
  );
};

export default MyStackNavigation;
