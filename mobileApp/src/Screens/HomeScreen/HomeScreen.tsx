import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeIcon1 from '../../../public/SvgIcon/HomeIcon/HomeIcon1';
import HomeIcon2 from '../../../public/SvgIcon/HomeIcon/HomeIcon2';
import SearchIcon1 from '../../../public/SvgIcon/SearchIcon/SearchIcon1';
import ProfileIcon1 from '../../../public/SvgIcon/ProfileIcon/ProfileIcon1';
import ProfileIcon2 from '../../../public/SvgIcon/ProfileIcon/ProfileIcon2';
import SearchIcon2 from '../../../public/SvgIcon/SearchIcon/SearchIcon2';
import SalonCard from '../../ReuseComponents/SalonCard/SalonCard';

const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={[styles.statusBar, { paddingTop: insets.top }]}>

            </View>
            <View style={styles.screen}>
            <Text style={styles.title}>Salon3</Text>
               <View>
                <SalonCard/>
               </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container : {
     backgroundColor : "#ffffff",
     flex : 1,
    },
    statusBar: {
        backgroundColor: '#6950f4',
    },
    screen : {
        paddingHorizontal : 10
    },
    title : {
        backgroundColor : "#6950f4",
        color : "#ffffff",
        width : "auto",
        alignSelf : "flex-start",
        fontSize : 14,
        fontWeight: "900",
        paddingVertical : 9,
        paddingHorizontal : 35,
        marginTop : 30,
        borderRadius : 16,
    },
})