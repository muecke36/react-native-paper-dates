import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';
import DayNames, { dayNamesHeight } from './DayNames';
import { getTranslation } from '../translations/utils';
const buttonContainerHeight = 56;
const buttonContainerMarginTop = 4;
const buttonContainerMarginBottom = 8;
export function getCalendarHeaderHeight(scrollMode) {
    if (scrollMode === 'horizontal') {
        return (buttonContainerHeight +
            buttonContainerMarginTop +
            buttonContainerMarginBottom +
            dayNamesHeight);
    }
    return dayNamesHeight;
}
function CalendarHeader({ scrollMode, onPrev, onNext, disableWeekDays, locale, }) {
    const theme = useTheme();
    const isHorizontal = scrollMode === 'horizontal';
    return (React.createElement(View, { style: styles.datePickerHeader, pointerEvents: 'box-none' },
        isHorizontal ? (React.createElement(View, { style: styles.buttonContainer, pointerEvents: 'box-none' },
            React.createElement(View, { style: styles.spacer, pointerEvents: 'box-none' }),
            React.createElement(View, { style: [
                    styles.buttonWrapper,
                    { backgroundColor: theme.colors.surface },
                ] },
                React.createElement(IconButton, { icon: "chevron-left", accessibilityLabel: getTranslation(locale, 'previous'), onPress: onPrev })),
            React.createElement(View, { style: [
                    styles.buttonWrapper,
                    { backgroundColor: theme.colors.surface },
                ] },
                React.createElement(IconButton, { icon: "chevron-right", accessibilityLabel: getTranslation(locale, 'next'), onPress: onNext })))) : null,
        React.createElement(DayNames, { disableWeekDays: disableWeekDays, locale: locale })));
}
const styles = StyleSheet.create({
    datePickerHeader: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 10,
    },
    buttonContainer: {
        height: buttonContainerHeight,
        marginTop: buttonContainerMarginTop,
        marginBottom: buttonContainerMarginBottom,
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonWrapper: {},
    spacer: { flex: 1 },
});
export default React.memo(CalendarHeader);
