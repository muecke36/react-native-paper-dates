import * as React from 'react';
import TextInputWithMask from '../TextInputMask';
import { HelperText, IconButton, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import DatePickerModal from './DatePickerModal';
import useDateInput from './inputUtils';
import { useLatest } from '../utils';
function DatePickerInput({ label, value, onChange, style, locale, validRange, inputMode, withModal = true, withDateFormatInLabel = true, ...rest }, ref) {
    const theme = useTheme();
    const { formattedValue, inputFormat, onChangeText, error } = useDateInput({
        locale,
        value,
        validRange,
        inputMode,
        onChange,
    });
    const [visible, setVisible] = React.useState(false);
    const onDismiss = React.useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    const onChangeRef = useLatest(onChange);
    const onInnerConfirm = React.useCallback(({ date }) => {
        setVisible(false);
        onChangeRef.current(date);
    }, [setVisible, onChangeRef]);
    return (React.createElement(React.Fragment, null,
        React.createElement(View, { style: styles.root },
            React.createElement(TextInputWithMask, { ...rest, ref: ref, label: getLabel({
                    // TODO: support label components?
                    label: label,
                    inputFormat,
                    withDateFormatInLabel,
                }), value: formattedValue, keyboardType: 'number-pad', placeholder: inputFormat, mask: inputFormat, onChangeText: onChangeText, keyboardAppearance: theme.dark ? 'dark' : 'default', error: !!error, style: [styles.input, style] }),
            withModal ? (React.createElement(IconButton, { size: 24, style: styles.calendarButton, icon: "calendar", onPress: () => setVisible(true) })) : null),
        React.createElement(HelperText, { type: "error", visible: !!error }, error),
        withModal ? (React.createElement(DatePickerModal, { date: value, mode: "single", visible: visible, onDismiss: onDismiss, onConfirm: onInnerConfirm, locale: locale, dateMode: inputMode, validRange: validRange })) : null));
}
function getLabel({ withDateFormatInLabel, inputFormat, label, }) {
    if (withDateFormatInLabel) {
        return label ? `${label} (${inputFormat})` : inputFormat;
    }
    return label || '';
}
const styles = StyleSheet.create({
    root: {
        minWidth: 150,
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        flexGrow: 1,
    },
    input: {
        flexGrow: 1,
    },
    calendarButton: { position: 'absolute', right: 0, zIndex: 10 },
});
export default React.forwardRef(DatePickerInput);
