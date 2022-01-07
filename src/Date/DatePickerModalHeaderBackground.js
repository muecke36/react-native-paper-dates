import { Animated, SafeAreaView, StyleSheet } from 'react-native';
import * as React from 'react';
import { useHeaderBackgroundColor } from '../utils';
export default function DatePickerModalHeaderBackground({ children, }) {
    const backgroundColor = useHeaderBackgroundColor();
    return (React.createElement(Animated.View, { style: [
            styles.animated,
            {
                backgroundColor,
            },
        ] },
        React.createElement(SafeAreaView, { style: styles.safeContent }, children)));
}
const styles = StyleSheet.create({
    animated: {
        paddingBottom: 0,
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 0,
    },
});
