import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen : React.FC = () => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop : insets.top}}>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({})