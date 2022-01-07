import * as React from 'react';
import Calendar from './Calendar';
import AnimatedCrossView from './AnimatedCrossView';
import DatePickerModalHeader from './DatePickerModalHeader';
import DatePickerModalContentHeader from './DatePickerModalContentHeader';
import CalendarEdit from './CalendarEdit';
import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground';
export function DatePickerModalContent(props) {
    const { mode, onChange, onConfirm, onDismiss, disableSafeTop, disableWeekDays, locale, validRange, dateMode, } = props;
    const anyProps = props;
    // use local state to add only onConfirm state changes
    const [state, setState] = React.useState({
        date: anyProps.date,
        startDate: anyProps.startDate,
        endDate: anyProps.endDate,
        dates: anyProps.dates,
    });
    // update local state if changed from outside or if modal is opened
    React.useEffect(() => {
        setState({
            date: anyProps.date,
            startDate: anyProps.startDate,
            endDate: anyProps.endDate,
            dates: anyProps.dates,
        });
    }, [anyProps.date, anyProps.startDate, anyProps.endDate, anyProps.dates]);
    const [collapsed, setCollapsed] = React.useState(true);
    const onInnerChange = React.useCallback((params) => {
        onChange && onChange(params);
        setState((prev) => ({ ...prev, ...params }));
    }, [onChange, setState]);
    const onInnerConfirm = React.useCallback(() => {
        if (mode === 'single') {
            ;
            onConfirm({
                date: state.date,
            });
        }
        else if (mode === 'range') {
            ;
            onConfirm({
                startDate: state.startDate,
                endDate: state.endDate,
            });
        }
        else if (mode === 'multiple') {
            ;
            onConfirm({
                dates: state.dates || [],
            });
        }
    }, [state, mode, onConfirm]);
    const onToggleCollapse = React.useCallback(() => {
        setCollapsed((prev) => !prev);
    }, [setCollapsed]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DatePickerModalHeaderBackground, null,
            React.createElement(DatePickerModalHeader, { locale: locale, onSave: onInnerConfirm, onDismiss: onDismiss, saveLabel: props.saveLabel, uppercase: props.uppercase ?? true, disableSafeTop: disableSafeTop }),
            React.createElement(DatePickerModalContentHeader, { state: state, mode: mode, collapsed: collapsed, onToggle: onToggleCollapse, headerSeparator: props.headerSeparator, emptyLabel: props.emptyLabel, label: props.label, moreLabel: props.moreLabel, startLabel: props.startLabel, endLabel: props.endLabel, uppercase: props.uppercase ?? true, locale: locale })),
        React.createElement(AnimatedCrossView, { collapsed: collapsed, calendar: React.createElement(Calendar, { locale: locale, mode: mode, startDate: state.startDate, endDate: state.endDate, date: state.date, onChange: onInnerChange, disableWeekDays: disableWeekDays, dates: state.dates, validRange: validRange, dateMode: dateMode }), calendarEdit: React.createElement(CalendarEdit, { mode: mode, state: state, label: props.label, startLabel: props.startLabel, endLabel: props.endLabel, collapsed: collapsed, onChange: onInnerChange, validRange: validRange, locale: locale }) })));
}
export default React.memo(DatePickerModalContent);
