
import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withDelay,
} from 'react-native-reanimated';
import { ViewStyle } from 'react-native';

interface Props {
    children: React.ReactNode;
    index?: number;
}

const FadeInUpView: React.FC<Props> = ({ children, index = 0 }) => {
    const translateY = useSharedValue(20);
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 }));
        translateY.value = withDelay(index * 100, withTiming(0, { duration: 500 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <Animated.View style={animatedStyle}>
            {children}
        </Animated.View>
    );
};

export default FadeInUpView;
