import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SearchScreen : React.FC = () => {
    const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop : insets.top}}>
      <Text>SearchScreen</Text>
    </View>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({});