import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useHeaderTextColor } from '../utils';
import Color from 'color';
import { getTranslation } from '../translations/utils';
function getLabel(locale, mode, configuredLabel) {
    if (configuredLabel) {
        return configuredLabel;
    }
    if (mode === 'range') {
        return getTranslation(locale, 'selectRange');
    }
    if (mode === 'multiple') {
        return getTranslation(locale, 'selectMultiple');
    }
    if (mode === 'single') {
        return getTranslation(locale, 'selectSingle');
    }
    return '...?';
}
export default function DatePickerModalContentHeader(props) {
    const { onToggle, collapsed, mode, moreLabel, uppercase } = props;
    const label = getLabel(props.locale, props.mode, props.label);
    const color = useHeaderTextColor();
    const allowEditing = mode !== 'multiple';
    return (React.createElement(View, { style: [styles.header] },
        React.createElement(View, null,
            React.createElement(Text, { style: [styles.label, { color }] }, uppercase ? label.toUpperCase() : label),
            React.createElement(View, { style: styles.headerContentContainer },
                mode === 'range' ? (React.createElement(HeaderContentRange, { ...props, color: color })) : null,
                mode === 'single' ? (React.createElement(HeaderContentSingle, { ...props, color: color })) : null,
                mode === 'multiple' ? (React.createElement(HeaderContentMulti, { ...props, color: color, moreLabel: moreLabel })) : null)),
        React.createElement(View, { style: styles.fill }),
        allowEditing ? (React.createElement(IconButton, { icon: collapsed ? 'pencil' : 'calendar', accessibilityLabel: collapsed
                ? getTranslation(props.locale, 'typeInDate')
                : getTranslation(props.locale, 'pickDateFromCalendar'), color: color, onPress: onToggle })) : null));
}
export function HeaderContentSingle({ state, emptyLabel = ' ', color, locale, }) {
    const lighterColor = Color(color).fade(0.5).rgb().toString();
    const dateColor = state.date ? color : lighterColor;
    const formatter = React.useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);
    return (React.createElement(Text, { style: [styles.singleHeaderText, { color: dateColor }] }, state.date ? formatter.format(state.date) : emptyLabel));
}
export function HeaderContentMulti({ state, emptyLabel = ' ', moreLabel = 'more', color, locale, }) {
    const dateCount = state.dates?.length || 0;
    const lighterColor = Color(color).fade(0.5).rgb().toString();
    const dateColor = dateCount ? color : lighterColor;
    const formatter = React.useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);
    let label = emptyLabel;
    if (dateCount) {
        if (dateCount <= 2) {
            label = state.dates.map((date) => formatter.format(date)).join(', ');
        }
        else {
            label =
                formatter.format(state.dates[0]) + ` (+ ${dateCount - 1} ${moreLabel})`;
        }
    }
    return (React.createElement(Text, { style: [styles.singleHeaderText, { color: dateColor }] }, label));
}
export function HeaderContentRange({ locale, state, headerSeparator = '-', startLabel = 'Start', endLabel = 'End', color, }) {
    const formatter = React.useMemo(() => {
        return new Intl.DateTimeFormat(locale, {
            month: 'short',
            day: 'numeric',
        });
    }, [locale]);
    const lighterColor = Color(color).fade(0.5).rgb().toString();
    const startColor = state.startDate ? color : lighterColor;
    const endColor = state.endDate ? color : lighterColor;
    return (React.createElement(React.Fragment, null,
        React.createElement(Text, { style: [styles.rangeHeaderText, { color: startColor }] }, state.startDate ? formatter.format(state.startDate) : startLabel),
        React.createElement(Text, { style: [styles.headerSeparator, { color }] }, headerSeparator),
        React.createElement(Text, { style: [styles.rangeHeaderText, { color: endColor }] }, state.endDate ? formatter.format(state.endDate) : endLabel)));
}
const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    animated: {
        paddingBottom: 0,
        elevation: 4,
    },
    safeContent: {
        paddingBottom: 0,
    },
    header: {
        height: 75,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 24,
        paddingRight: 12,
    },
    headerContentContainer: { marginTop: 5, flexDirection: 'row' },
    label: { color: '#fff', letterSpacing: 1, fontSize: 13 },
    singleHeaderText: { color: '#fff', fontSize: 25 },
    rangeHeaderText: { color: '#fff', fontSize: 25 },
    excludeInRangeHeaderText: { fontSize: 25 },
    excludeInRangeHeaderTextSmall: {
        fontSize: 14,
        marginTop: -3,
        marginLeft: 3,
    },
    headerSeparator: {
        color: 'rgba(255,255,255,1)',
        fontSize: 25,
        paddingLeft: 6,
        paddingRight: 6,
    },
    appbarHeader: {
        elevation: 0,
    },
    column: { flexDirection: 'column' },
    row: { flexDirection: 'row' },
});
