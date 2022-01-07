import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';
import { useMemo } from 'react';
import Color from 'color';
import { useSwitchColors } from './timeUtils';
import { DisplayModeContext } from './TimePicker';
export default function AmPmSwitcher({ onChange, hours, }) {
    const { setMode, mode } = React.useContext(DisplayModeContext);
    const theme = useTheme();
    const backgroundColor = useMemo(() => {
        if (theme.dark) {
            return Color(theme.colors.surface).lighten(1.2).hex();
        }
        return Color(theme.colors.surface).darken(0.1).hex();
    }, [theme]);
    const isAM = mode === 'AM';
    return (React.createElement(View, { style: [
            styles.root,
            {
                borderColor: backgroundColor,
                borderRadius: theme.roundness,
            },
        ] },
        React.createElement(SwitchButton, { label: "AM", onPress: () => {
                setMode('AM');
                if (hours - 12 >= 0) {
                    onChange(hours - 12);
                }
            }, selected: isAM, disabled: isAM }),
        React.createElement(View, { style: [styles.switchSeparator, { backgroundColor }] }),
        React.createElement(SwitchButton, { label: "PM", onPress: () => {
                setMode('PM');
                if (hours + 12 <= 24) {
                    onChange(hours + 12);
                }
            }, selected: !isAM, disabled: !isAM })));
}
function SwitchButton({ label, onPress, selected, disabled, }) {
    const theme = useTheme();
    const { backgroundColor, color } = useSwitchColors(selected);
    return (React.createElement(TouchableRipple, { onPress: onPress, style: styles.switchButton, accessibilityLabel: label, 
        // @ts-ignore old React Native versions
        accessibilityTraits: disabled ? ['button', 'disabled'] : 'button', 
        // @ts-ignore old React Native versions
        accessibilityComponentType: "button", accessibilityRole: "button", accessibilityState: { disabled }, disabled: disabled },
        React.createElement(View, { style: [styles.switchButtonInner, { backgroundColor }] },
            React.createElement(Text, { selectable: false, style: [
                    {
                        ...theme.fonts.medium,
                        color: color,
                    },
                ] }, label))));
}
const styles = StyleSheet.create({
    root: {
        width: 50,
        height: 80,
        borderWidth: 1,
        overflow: 'hidden',
    },
    switchSeparator: {
        height: 1,
        width: 48,
    },
    switchButton: {
        flex: 1,
    },
    switchButtonInner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
