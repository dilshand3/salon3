import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DiscoverScreen : React.FC = () => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop : insets.top}}>
      <Text>DiscoverScreen</Text>
    </View>
  )
}

export default DiscoverScreen;

const styles = StyleSheet.create({})