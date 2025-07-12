import { StyleSheet, Text, View, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        animated
        translucent={false}
        backgroundColor="#0A0A0A"
        barStyle="light-content"
      />
      <SafeAreaView style={styles.safeArea}>

        <Text style={[styles.text, { marginTop: insets.top }]}>
          SearchScreen
        </Text>
      </SafeAreaView>
    </>
  )
}

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});