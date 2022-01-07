import * as React from 'react';
import { Button } from 'react-native-paper';
import { DatePickerModal } from '../../src/index';
export default function ReadMeExampleRange() {
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
    const onDismiss = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const onConfirm = React.useCallback(({ startDate, endDate }) => {
        setOpen(false);
        setRange({ startDate, endDate });
    }, [setOpen, setRange]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onPress: () => setOpen(true), uppercase: false, mode: "outlined" }, "Pick range"),
        React.createElement(DatePickerModal, { locale: "en", mode: "range", visible: open, onDismiss: onDismiss, startDate: range.startDate, endDate: range.endDate, onConfirm: onConfirm })));
}
