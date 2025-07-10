import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon1 from '../../../public/SvgIcon/HomeIcon/HomeIcon1';
import HomeIcon2 from '../../../public/SvgIcon/HomeIcon/HomeIcon2';
import SearchIcon1 from '../../../public/SvgIcon/SearchIcon/SearchIcon1';
import ProfileIcon1 from '../../../public/SvgIcon/ProfileIcon/ProfileIcon1';
import ProfileIcon2 from '../../../public/SvgIcon/ProfileIcon/ProfileIcon2';
import SearchIcon2 from '../../../public/SvgIcon/SearchIcon/SearchIcon2';

const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text>HomeScreen</Text>
            <HomeIcon1 />
            <HomeIcon2 />
            <SearchIcon1 />
            <SearchIcon2/>
            <ProfileIcon1 />
            <ProfileIcon2 />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink'
    }
})