import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../Screens/ProfileScreen/ProfileScreen';
const Tab = createBottomTabNavigator();

const BottomTabNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{headerShown : false}}>
                <Tab.Screen name='home'
                    component={HomeScreen}

                />
                <Tab.Screen name='profile'
                    component={ProfileScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTabNavigation;

const styles = StyleSheet.create({})