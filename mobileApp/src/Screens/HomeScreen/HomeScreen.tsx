import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing
} from 'react-native-reanimated';
import SalonCard from '../../ReuseComponents/SalonCard/SalonCard';
import { SalonCardData } from '../../fakeData/SalonCardData';
import SalonCategory from '../../ReuseComponents/SalonCategory/SalonCategory';
import { SalonCategoryData } from "../../fakeData/SalonCategoryData";

type SectionName =
    | 'title'
    | 'recentlyViewed'
    | 'recommended'
    | 'newToSalon'
    | 'trending'
    | 'category';

const HomeScreen: React.FC = () => {
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);
    const [screenHeight, setScreenHeight] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    const titleOpacity = useSharedValue(0);
    const titleTranslateY = useSharedValue(30);

    const recentlyViewedOpacity = useSharedValue(0);
    const recentlyViewedTranslateY = useSharedValue(30);

    const recommendedOpacity = useSharedValue(0);
    const recommendedTranslateY = useSharedValue(30);

    const newToSalonOpacity = useSharedValue(0);
    const newToSalonTranslateY = useSharedValue(30);

    const trendingOpacity = useSharedValue(0);
    const trendingTranslateY = useSharedValue(30);

    const categoryOpacity = useSharedValue(0);
    const categoryTranslateY = useSharedValue(30);

    const [animatedSections, setAnimatedSections] = useState<Record<SectionName, boolean>>({
        title: false,
        recentlyViewed: false,
        recommended: false,
        newToSalon: false,
        trending: false,
        category: false
    });

    const animationConfig = {
        duration: 600,
        easing: Easing.out(Easing.cubic),
    };

    useEffect(() => {
        const { height } = require('react-native').Dimensions.get('window');
        setScreenHeight(height);

        setTimeout(() => {
            titleOpacity.value = withTiming(1, animationConfig);
            titleTranslateY.value = withTiming(0, animationConfig);
            setAnimatedSections(prev => ({ ...prev, title: true }));
        }, 100);

        setTimeout(() => {
            recentlyViewedOpacity.value = withTiming(1, animationConfig);
            recentlyViewedTranslateY.value = withTiming(0, animationConfig);
            setAnimatedSections(prev => ({ ...prev, recentlyViewed: true }));
        }, 200);

        setTimeout(() => {
            recommendedOpacity.value = withTiming(1, animationConfig);
            recommendedTranslateY.value = withTiming(0, animationConfig);
            setAnimatedSections(prev => ({ ...prev, recommended: true }));
        }, 300);
    }, []);

    const animateSection = (
        sectionName: SectionName,
        opacity: Animated.SharedValue<number>,
        translateY: Animated.SharedValue<number>
    ) => {
        if (!animatedSections[sectionName]) {
            opacity.value = withTiming(1, animationConfig);
            translateY.value = withTiming(0, animationConfig);
            setAnimatedSections(prev => ({ ...prev, [sectionName]: true }));
        }
    };

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        setScrollY(scrollY);
    };

    const checkAndAnimateOnLayout = (
        event: any,
        sectionName: SectionName,
        opacity: Animated.SharedValue<number>,
        translateY: Animated.SharedValue<number>
    ) => {
        const { y } = event.nativeEvent.layout;
        const threshold = screenHeight * 0.8;

        if (scrollY + threshold >= y && !animatedSections[sectionName]) {
            animateSection(sectionName, opacity, translateY);
        }
    };

    useEffect(() => {
        const threshold = screenHeight * 0.8;

        if (scrollY + threshold >= 800 && !animatedSections.newToSalon) {
            animateSection('newToSalon', newToSalonOpacity, newToSalonTranslateY);
        }
        if (scrollY + threshold >= 1200 && !animatedSections.trending) {
            animateSection('trending', trendingOpacity, trendingTranslateY);
        }
        if (scrollY + threshold >= 1600 && !animatedSections.category) {
            animateSection('category', categoryOpacity, categoryTranslateY);
        }
    }, [scrollY, screenHeight, animatedSections]);

    const titleAnimatedStyle = useAnimatedStyle(() => ({
        opacity: titleOpacity.value,
        transform: [{ translateY: titleTranslateY.value }],
    }));

    const recentlyViewedAnimatedStyle = useAnimatedStyle(() => ({
        opacity: recentlyViewedOpacity.value,
        transform: [{ translateY: recentlyViewedTranslateY.value }],
    }));

    const recommendedAnimatedStyle = useAnimatedStyle(() => ({
        opacity: recommendedOpacity.value,
        transform: [{ translateY: recommendedTranslateY.value }],
    }));

    const newToSalonAnimatedStyle = useAnimatedStyle(() => ({
        opacity: newToSalonOpacity.value,
        transform: [{ translateY: newToSalonTranslateY.value }],
    }));

    const trendingAnimatedStyle = useAnimatedStyle(() => ({
        opacity: trendingOpacity.value,
        transform: [{ translateY: trendingTranslateY.value }],
    }));

    const categoryAnimatedStyle = useAnimatedStyle(() => ({
        opacity: categoryOpacity.value,
        transform: [{ translateY: categoryTranslateY.value }],
    }));

    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            style={styles.container}
            onScroll={handleScroll}
            scrollEventThrottle={16}
        >
            <StatusBar barStyle="dark-content" />
            <View style={[styles.screen, { paddingTop: insets.top }]}>
                <Animated.View style={titleAnimatedStyle}>
                    <Text style={styles.title}>Salon3</Text>
                </Animated.View>

                <Animated.View style={recentlyViewedAnimatedStyle}>
                    <Text style={styles.salonCardGroupTitle}>Recently Viewed</Text>
                    <ScrollView
                        style={styles.ShopListCards}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 15 }}
                    >
                        {SalonCardData.slice(0, 1).map((val, index) => (
                            <SalonCard key={index} {...val} />
                        ))}
                    </ScrollView>
                </Animated.View>

                <Animated.View style={recommendedAnimatedStyle}>
                    <Text style={styles.salonCardGroupTitle}>Recommended</Text>
                    <ScrollView
                        style={styles.ShopListCards}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 15 }}
                    >
                        {SalonCardData.slice(0, 2).map((val, index) => (
                            <SalonCard key={index} {...val} />
                        ))}
                    </ScrollView>
                </Animated.View>

                <Animated.View
                    style={newToSalonAnimatedStyle}
                    onLayout={(event) =>
                        checkAndAnimateOnLayout(event, 'newToSalon', newToSalonOpacity, newToSalonTranslateY)
                    }
                >
                    <Text style={styles.salonCardGroupTitle}>New to salon3</Text>
                    <ScrollView
                        style={styles.ShopListCards}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 15 }}
                    >
                        {SalonCardData.map((val, index) => (
                            <SalonCard key={index} {...val} />
                        ))}
                    </ScrollView>
                </Animated.View>

                <Animated.View
                    style={trendingAnimatedStyle}
                    onLayout={(event) =>
                        checkAndAnimateOnLayout(event, 'trending', trendingOpacity, trendingTranslateY)
                    }
                >
                    <Text style={styles.salonCardGroupTitle}>Trending</Text>
                    <ScrollView
                        style={styles.ShopListCards}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 15 }}
                    >
                        {SalonCardData.map((val, index) => (
                            <SalonCard key={index} {...val} />
                        ))}
                    </ScrollView>
                </Animated.View>

                <Animated.View
                    style={[styles.CategoryGrid, categoryAnimatedStyle]}
                    onLayout={(event) =>
                        checkAndAnimateOnLayout(event, 'category', categoryOpacity, categoryTranslateY)
                    }
                >
                    {SalonCategoryData.map((val, index) => (
                        <SalonCategory key={index} title={val.title} img={val.img} />
                    ))}
                </Animated.View>
            </View>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    screen: {
        paddingHorizontal: 14,
    },
    title: {
        backgroundColor: '#000000',
        color: '#ffffff',
        alignSelf: 'flex-start',
        fontSize: 14,
        fontWeight: '900',
        paddingVertical: 9,
        paddingHorizontal: 35,
        marginTop: 30,
        borderRadius: 16,
        marginBottom: 33,
    },
    ShopListCards: {
        gap: 20,
        flexDirection: 'row',
    },
    salonCardGroupTitle: {
        color: '#0c1516',
        fontSize: 22,
        fontWeight: '700',
    },
    CategoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 1,
    },
});
