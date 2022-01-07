import * as React from 'react';
import { Button } from 'react-native-paper';
import { DatePickerModal } from '../../src/index';
export default function ReadMeExampleSingle() {
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);
    const onConfirmSingle = React.useCallback((params) => {
        setOpen(false);
        setDate(params.date);
    }, [setOpen, setDate]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { onPress: () => setOpen(true), uppercase: false, mode: "outlined" }, "Pick single date"),
        React.createElement(DatePickerModal, { locale: "en", mode: "single", visible: open, onDismiss: onDismissSingle, date: date, onConfirm: onConfirmSingle })));
}
