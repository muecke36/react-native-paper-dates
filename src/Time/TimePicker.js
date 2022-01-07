import * as React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { inputTypes, toHourInputFormat, toHourOutputFormat, } from './timeUtils';
import AnalogClock from './AnalogClock';
import { circleSize } from './timeUtils';
import TimeInputs from './TimeInputs';
export const DisplayModeContext = React.createContext({ mode: 'AM', setMode: () => { } });
function TimePicker({ hours, minutes, onFocusInput, focused, inputType, onChange, locale, }) {
    const [displayMode, setDisplayMode] = React.useState(undefined);
    const dimensions = useWindowDimensions();
    const isLandscape = dimensions.width > dimensions.height;
    // method to check whether we have 24 hours in clock or 12
    const is24Hour = React.useMemo(() => {
        const formatter = new Intl.DateTimeFormat(locale, {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'UTC',
        });
        const formatted = formatter.format(new Date(Date.UTC(2020, 1, 1, 23)));
        return formatted.includes('23');
    }, [locale]);
    // Initialize display Mode according the hours value
    React.useEffect(() => {
        if (hours >= 12) {
            setDisplayMode('PM');
        }
        else {
            setDisplayMode('AM');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const onInnerChange = React.useCallback((params) => {
        params.hours = toHourOutputFormat(params.hours, hours, is24Hour);
        onChange(params);
    }, [onChange, hours, is24Hour]);
    return (React.createElement(DisplayModeContext.Provider, { value: { mode: displayMode, setMode: setDisplayMode } },
        React.createElement(View, { style: isLandscape ? styles.rootLandscape : styles.rootPortrait },
            React.createElement(TimeInputs, { inputType: inputType, hours: hours, minutes: minutes, is24Hour: is24Hour, onChange: onChange, onFocusInput: onFocusInput, focused: focused }),
            inputType === inputTypes.picker ? (React.createElement(View, { style: styles.clockContainer },
                React.createElement(AnalogClock, { hours: toHourInputFormat(hours, is24Hour), minutes: minutes, focused: focused, is24Hour: is24Hour, onChange: onInnerChange }))) : null)));
}
const styles = StyleSheet.create({
    rootLandscape: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24 * 3 + 96 * 2 + 52 + circleSize,
    },
    rootPortrait: {},
    clockContainer: { paddingTop: 36, paddingLeft: 12, paddingRight: 12 },
});
export default React.memo(TimePicker);
