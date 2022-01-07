import * as React from 'react';
import { Button } from 'react-native-paper';
import { DatePickerModal } from '../../src/index';
export default function ReadMeExampleMultiple() {
    const [dates, setDates] = React.useState();
    const [open, setOpen] = React.useState(false);
    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const onConfirm = React.useCallback((params) => {
        setOpen(false);
        setDates(params.dates);
        console.log('[on-change-multi]', params);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onPress: () => setOpen(true), uppercase: false, mode: "outlined" }, "Pick multiple dates"),
        React.createElement(DatePickerModal, { locale: "en", mode: "multiple", visible: open, onDismiss: onDismiss, dates: dates, onConfirm: onConfirm })));
}
