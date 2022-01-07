import * as React from 'react';
import { Modal, StyleSheet, View, Text, Animated, TouchableWithoutFeedback, KeyboardAvoidingView, } from 'react-native';
import { Button, IconButton, overlay, useTheme } from 'react-native-paper';
import TimePicker from './TimePicker';
import { clockTypes, inputTypeIcons, inputTypes, reverseInputTypes, } from './timeUtils';
const supportedOrientations = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];
export function TimePickerModal({ visible, onDismiss, onConfirm, hours, minutes, label = 'Select time', uppercase = true, cancelLabel = 'Cancel', confirmLabel = 'Ok', animationType = 'none', locale, }) {
    const theme = useTheme();
    const [inputType, setInputType] = React.useState(inputTypes.picker);
    const [focused, setFocused] = React.useState(clockTypes.hours);
    const [localHours, setLocalHours] = React.useState(getHours(hours));
    const [localMinutes, setLocalMinutes] = React.useState(getMinutes(minutes));
    React.useEffect(() => {
        setLocalHours(getHours(hours));
    }, [setLocalHours, hours]);
    React.useEffect(() => {
        setLocalMinutes(getMinutes(minutes));
    }, [setLocalMinutes, minutes]);
    const onFocusInput = React.useCallback((type) => setFocused(type), []);
    const onChange = React.useCallback((params) => {
        if (params.focused) {
            setFocused(params.focused);
        }
        setLocalHours(params.hours);
        setLocalMinutes(params.minutes);
    }, [setFocused, setLocalHours, setLocalMinutes]);
    return (React.createElement(Modal, { animationType: animationType, transparent: true, visible: visible, onRequestClose: onDismiss, presentationStyle: "overFullScreen", supportedOrientations: supportedOrientations, 
        //@ts-ignore
        statusBarTranslucent: true },
        React.createElement(React.Fragment, null,
            React.createElement(TouchableWithoutFeedback, { onPress: onDismiss },
                React.createElement(View, { style: [
                        StyleSheet.absoluteFill,
                        styles.modalBackground,
                        { backgroundColor: theme.colors.backdrop },
                    ] })),
            React.createElement(View, { style: [StyleSheet.absoluteFill, styles.modalRoot], pointerEvents: "box-none" },
                React.createElement(KeyboardAvoidingView, { style: styles.keyboardView, behavior: 'padding' },
                    React.createElement(Animated.View, { style: [
                            styles.modalContent,
                            {
                                backgroundColor: theme.dark
                                    ? overlay(10, theme.colors.surface)
                                    : theme.colors.surface,
                                borderRadius: theme.roundness,
                            },
                        ] },
                        React.createElement(View, { style: styles.labelContainer },
                            React.createElement(Text, { style: [styles.label, { color: theme.colors.text }] }, uppercase ? label.toUpperCase() : label)),
                        React.createElement(View, { style: styles.timePickerContainer },
                            React.createElement(TimePicker, { locale: locale, inputType: inputType, focused: focused, hours: localHours, minutes: localMinutes, onChange: onChange, onFocusInput: onFocusInput })),
                        React.createElement(View, { style: styles.bottom },
                            React.createElement(IconButton, { icon: inputTypeIcons[reverseInputTypes[inputType]], onPress: () => setInputType(reverseInputTypes[inputType]), size: 24, style: styles.inputTypeToggle, accessibilityLabel: "toggle keyboard" }),
                            React.createElement(View, { style: styles.fill }),
                            React.createElement(Button, { onPress: onDismiss, uppercase: uppercase }, cancelLabel),
                            React.createElement(Button, { onPress: () => onConfirm({ hours: localHours, minutes: localMinutes }), uppercase: uppercase }, confirmLabel))))))));
}
function getMinutes(minutes) {
    return minutes === undefined || minutes === null
        ? new Date().getMinutes()
        : minutes;
}
function getHours(hours) {
    return hours === undefined || hours === null ? new Date().getHours() : hours;
}
const styles = StyleSheet.create({
    modalRoot: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    keyboardView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalBackground: {
        flex: 1,
    },
    modalContent: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        minWidth: 287,
    },
    labelContainer: {
        height: 28,
        justifyContent: 'flex-end',
        paddingLeft: 24,
        paddingRight: 24,
    },
    label: {
        letterSpacing: 1,
        fontSize: 13,
    },
    timePickerContainer: { padding: 24 },
    bottom: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },
    inputTypeToggle: { margin: 4 },
    fill: { flex: 1 },
});
export default React.memo(TimePickerModal);
