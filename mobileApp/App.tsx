import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchIcon from './public/SvgIcon/SearchIcon/SearchIcon1';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from './src/Screens/HomeScreen/HomeScreen';
import BottomTabNavigation from './src/navigation/BottomTabNavigation/BottomTabNavigation';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
        <BottomTabNavigation />
    </SafeAreaProvider>
  )
}

export default App;

const styles = StyleSheet.create({})