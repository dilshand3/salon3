import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from '../../Screens/HomeScreen/HomeScreen';
import ProfileScreen from '../../Screens/ProfileScreen/ProfileScreen';
import SearchScreen from '../../Screens/SearchScreen/SearchScreen';
import DiscoverScreen from '../../Screens/DiscoverScreen/DiscoverScreen';

import HomeIcon1 from '../../../public/SvgIcon/HomeIcon/HomeIcon1';
import HomeIcon2 from '../../../public/SvgIcon/HomeIcon/HomeIcon2';
import SearchIcon1 from '../../../public/SvgIcon/SearchIcon/SearchIcon1';
import SearchIcon2 from '../../../public/SvgIcon/SearchIcon/SearchIcon2';
import BullHorn1 from '../../../public/SvgIcon/BullHorn/BullHorn1';
import BullHorn2 from '../../../public/SvgIcon/BullHorn/BullHorn2';
import ProfileIcon1 from '../../../public/SvgIcon/ProfileIcon/ProfileIcon1';
import ProfileIcon2 from '../../../public/SvgIcon/ProfileIcon/ProfileIcon2';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.tabBarContainer, {
            paddingBottom: insets.bottom,
        }]}>
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    if (!isFocused) {
                        navigation.navigate(route.name);
                    }
                };

                const getIcon = () => {
                    switch (route.name) {
                        case 'home': return isFocused ? <HomeIcon2 /> : <HomeIcon1 />;
                        case 'search': return isFocused ? <SearchIcon2 /> : <SearchIcon1 />;
                        case 'discover': return isFocused ? <BullHorn2 /> : <BullHorn1 />;
                        case 'profile': return isFocused ? <ProfileIcon2 /> : <ProfileIcon1 />;
                        default: return null;
                    }
                };

                const getLabel = () => {
                    switch (route.name) {
                        case 'home': return 'HOME';
                        case 'search': return 'SEARCH';
                        case 'discover': return 'OFFERS';
                        case 'profile': return 'PROFILE';
                        default: return '';
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        onPress={onPress}
                        activeOpacity={0.8}
                        style={[
                            styles.tabItem,
                            isFocused && styles.activeTab
                        ]}
                    >
                        {getIcon()}
                        {isFocused && (
                            <Animated.View
                                entering={FadeInRight.duration(300)}
                                exiting={FadeOutLeft.duration(200)}
                            >
                                <Text style={styles.activeLabel}>{getLabel()}</Text>
                            </Animated.View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const BottomTabNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{ headerShown: false }}
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <Tab.Screen name='home' component={HomeScreen} />
                <Tab.Screen name='search' component={SearchScreen} />
                <Tab.Screen name='discover' component={DiscoverScreen} />
                <Tab.Screen name='profile' component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default BottomTabNavigation;

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderColor: '#ccc'
    },
    tabItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 8
    },
    activeTab: {
        backgroundColor: '#6950f4',
        borderRadius: 15,
    },
    activeLabel: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 6,
    },
});
