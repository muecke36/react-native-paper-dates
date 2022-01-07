import * as React from 'react';
import { View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import DatePickerModal from './DatePickerModal';
// WORK IN PROGRESS
export default function DateRangeInput({ locale }) {
    const [visible, setVisible] = React.useState(false);
    const onDismiss = React.useCallback(() => {
        setVisible(false);
    }, [setVisible]);
    const onConfirm = React.useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ startDate, endDate }) => {
        setVisible(false);
        console.log({ startDate, endDate });
    }, [setVisible]);
    return (React.createElement(View, { style: { flexDirection: 'row', alignItems: 'center' } },
        React.createElement(View, { style: { flex: 1 } },
            React.createElement(Text, null, "Van")),
        React.createElement(View, null,
            React.createElement(Text, { style: { fontSize: 16, marginLeft: 12, marginRight: 12 } }, "to"),
            React.createElement(Text, { style: { opacity: 0 }, accessible: false }, "tot")),
        React.createElement(View, { style: { flex: 1 } },
            React.createElement(Text, null, "Tot")),
        React.createElement(View, null,
            React.createElement(IconButton, { icon: "calendar", onPress: () => setVisible(true) }),
            React.createElement(Text, { style: { opacity: 0 }, accessible: false }, "tot")),
        React.createElement(DatePickerModal, { locale: locale, mode: "range", visible: visible, onDismiss: onDismiss, onConfirm: onConfirm, startDate: undefined, endDate: undefined })));
}
