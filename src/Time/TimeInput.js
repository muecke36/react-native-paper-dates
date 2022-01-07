import * as React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme, TouchableRipple } from 'react-native-paper';
import Color from 'color';
import { inputTypes, useInputColors, } from './timeUtils';
function TimeInput({ value, clockType, pressed, onPress, onChanged, inputType, ...rest }, ref) {
    const [controlledValue, setControlledValue] = React.useState(`${value}`);
    const onInnerChange = (text) => {
        setControlledValue(text);
        if (text !== '' && text !== '0') {
            onChanged(Number(text));
        }
    };
    React.useEffect(() => {
        setControlledValue(`${value}`);
    }, [value]);
    const theme = useTheme();
    const [inputFocused, setInputFocused] = React.useState(false);
    const highlighted = inputType === inputTypes.picker ? pressed : inputFocused;
    const { color, backgroundColor } = useInputColors(highlighted);
    let formattedValue = controlledValue;
    if (!inputFocused) {
        formattedValue =
            controlledValue.length === 1
                ? `0${controlledValue}`
                : `${controlledValue}`;
    }
    return (React.createElement(View, { style: styles.root },
        React.createElement(TextInput, { ref: ref, style: [
                styles.input,
                {
                    color,
                    backgroundColor,
                    borderRadius: theme.roundness,
                },
            ], value: formattedValue, maxLength: 2, onFocus: () => setInputFocused(true), onBlur: () => setInputFocused(false), keyboardAppearance: theme.dark ? 'dark' : 'default', keyboardType: "number-pad", onChangeText: onInnerChange, ...rest }),
        onPress && inputType === inputTypes.picker ? (React.createElement(TouchableRipple, { style: [
                StyleSheet.absoluteFill,
                styles.buttonOverlay,
                {
                    // backgroundColor: 'blue',
                    borderRadius: theme.roundness,
                },
            ], rippleColor: Color(theme.colors.primary).fade(0.7).hex(), onPress: () => onPress(clockType), borderless: true },
            React.createElement(View, null))) : null));
}
const styles = StyleSheet.create({
    root: { position: 'relative', height: 80, width: 96 },
    input: {
        fontSize: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 96,
        height: 80,
    },
    buttonOverlay: { overflow: 'hidden' },
});
export default React.forwardRef(TimeInput);
