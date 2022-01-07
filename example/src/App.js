import * as React from 'react';
import { StyleSheet, ScrollView, View, Linking, Image, Animated, useColorScheme, } from 'react-native';
import { Title, Button, Text, Provider as PaperProvider, DefaultTheme, DarkTheme, useTheme, overlay, Paragraph, Portal, } from 'react-native-paper';
import { DatePickerModal, DatePickerModalContent, TimePickerModal, DatePickerInput,
// @ts-ignore TODO: try to fix expo to work with local library
 } from 'react-native-paper-dates';
function App() {
    const theme = useTheme();
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const timeFormatter = new Intl.DateTimeFormat(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    });
    const [inputDate, setInputDate] = React.useState(undefined);
    const [date, setDate] = React.useState(undefined);
    const [dates, setDates] = React.useState();
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [time, setTime] = React.useState({ hours: undefined, minutes: undefined });
    const [timeOpen, setTimeOpen] = React.useState(false);
    const [rangeOpen, setRangeOpen] = React.useState(false);
    const [singleOpen, setSingleOpen] = React.useState(false);
    const [customOpen, setCustomOpen] = React.useState(false);
    const onDismissTime = React.useCallback(() => {
        setTimeOpen(false);
    }, [setTimeOpen]);
    const [multiOpen, setMultiOpen] = React.useState(false);
    const onDismissRange = React.useCallback(() => {
        setRangeOpen(false);
    }, [setRangeOpen]);
    const onDismissSingle = React.useCallback(() => {
        setSingleOpen(false);
    }, [setSingleOpen]);
    const onDismissMulti = React.useCallback(() => {
        setMultiOpen(false);
    }, []);
    const onDismissCustom = React.useCallback(() => {
        setCustomOpen(false);
    }, [setCustomOpen]);
    const onChangeRange = React.useCallback(({ startDate, endDate }) => {
        setRangeOpen(false);
        setRange({ startDate, endDate });
    }, [setRangeOpen, setRange]);
    const onChangeSingle = React.useCallback((params) => {
        setSingleOpen(false);
        setDate(params.date);
    }, [setSingleOpen, setDate]);
    const onChangeMulti = React.useCallback((params) => {
        setMultiOpen(false);
        setDates(params.dates);
        console.log('[on-change-multi]', params);
    }, []);
    const onConfirmTime = React.useCallback(({ hours, minutes }) => {
        setTimeOpen(false);
        setTime({ hours, minutes });
    }, [setTimeOpen, setTime]);
    // generate date from time
    let timeDate = new Date();
    time.hours !== undefined && timeDate.setHours(time.hours);
    time.minutes !== undefined && timeDate.setMinutes(time.minutes);
    const backgroundColor = theme.dark && theme.mode === 'adaptive'
        ? overlay(3, theme.colors.surface)
        : theme.colors.surface;
    const pastDate = new Date(new Date().setDate(new Date().getDate() - 5));
    const futureDate = new Date(new Date().setDate(new Date().getDate() + 5));
    const locale = 'en-GB';
    return (React.createElement(React.Fragment, null,
        React.createElement(ScrollView, { style: [
                styles.root,
                {
                    backgroundColor: theme.colors.background,
                },
            ] },
            React.createElement(View, { style: styles.content },
                React.createElement(View, { style: styles.titleContainer },
                    React.createElement(Image, { source: require('./schedule.png'), style: styles.logo }),
                    React.createElement(Title, null, "react-native-paper-dates")),
                React.createElement(Paragraph, null,
                    "Smooth and fast cross platform Material Design date picker for React Native Paper brought to you by",
                    ' ',
                    React.createElement(Text, { onPress: () => Linking.openURL('https://webridge.nl'), style: styles.underline }, "webRidge")),
                React.createElement(Paragraph, null, "Example version: 0.4.1")),
            React.createElement(View, { style: styles.content },
                React.createElement(Button, { uppercase: false, mode: "contained", icon: "github", style: styles.twitterButton, onPress: () => Linking.openURL('https://github.com/web-ridge/react-native-paper-dates') }, "GitHub"),
                React.createElement(TwitterFollowButton, { userName: 'RichardLindhout' }),
                React.createElement(TwitterFollowButton, { userName: 'web_ridge' })),
            React.createElement(Animated.View, { style: [
                    styles.content,
                    styles.contentShadow,
                    {
                        backgroundColor,
                    },
                ] },
                React.createElement(View, null,
                    React.createElement(Row, null,
                        React.createElement(Label, null, "Input"),
                        React.createElement(DatePickerInput, { locale: locale, value: inputDate, onChange: setInputDate, inputMode: "start", autoComplete: 'birthdate-full' })),
                    React.createElement(Row, null,
                        React.createElement(Label, null, "Date"),
                        React.createElement(Text, null, date ? dateFormatter.format(date) : '-')),
                    React.createElement(Row, null,
                        React.createElement(Label, null, "Range"),
                        React.createElement(Text, null, [
                            range.startDate ? dateFormatter.format(range.startDate) : '',
                            range.endDate ? dateFormatter.format(range.endDate) : '',
                        ].join(' - '))),
                    React.createElement(Row, null,
                        React.createElement(Label, null, "Time"),
                        React.createElement(Text, null, time && time.hours !== undefined && time.minutes !== undefined
                            ? timeFormatter.format(timeDate)
                            : '-')),
                    React.createElement(Row, null,
                        React.createElement(Label, null, "Dates"),
                        React.createElement(Text, null, dates
                            ?.map((d) => dateFormatter.format(d))
                            .filter(Boolean)
                            .join(', ') || '-'))),
                React.createElement(Enter, null),
                React.createElement(Enter, null),
                React.createElement(View, { style: styles.buttons },
                    React.createElement(Button, { onPress: () => setSingleOpen(true), uppercase: false, mode: "outlined", style: styles.pickButton }, "Pick single date"),
                    React.createElement(View, { style: styles.buttonSeparator }),
                    React.createElement(Button, { onPress: () => setMultiOpen(true), uppercase: false, mode: "outlined", style: styles.pickButton }, "Pick multiple dates"),
                    React.createElement(View, { style: styles.buttonSeparator }),
                    React.createElement(Button, { onPress: () => setRangeOpen(true), uppercase: false, mode: "outlined", style: styles.pickButton }, "Pick range"),
                    React.createElement(View, { style: styles.buttonSeparator }),
                    React.createElement(Button, { onPress: () => setTimeOpen(true), uppercase: false, mode: "outlined", style: styles.pickButton }, "Pick time"),
                    React.createElement(View, { style: styles.buttonSeparator }),
                    React.createElement(Button, { onPress: () => setCustomOpen(true), uppercase: false, mode: "outlined", style: styles.pickButton }, "Custom modal")),
                React.createElement(Enter, null)),
            React.createElement(Enter, null),
            React.createElement(Enter, null),
            React.createElement(Enter, null)),
        React.createElement(Portal, null, customOpen ? (React.createElement(View, { style: [StyleSheet.absoluteFill, styles.customModal] },
            React.createElement(DatePickerModalContent, { locale: locale, mode: "range", onDismiss: onDismissCustom, startDate: range.startDate, endDate: range.endDate, onConfirm: onChangeRange }))) : null),
        React.createElement(DatePickerModal, { locale: locale, mode: "range", visible: rangeOpen, onDismiss: onDismissRange, startDate: range.startDate, endDate: range.endDate, onConfirm: onChangeRange }),
        React.createElement(DatePickerModal, { locale: locale, mode: "single", visible: singleOpen, onDismiss: onDismissSingle, date: date, onConfirm: onChangeSingle, validRange: {
                startDate: pastDate,
                disabledDates: [futureDate],
                // startDate: new Date(2021, 1, 2), // optional
                // endDate: new Date(), // optional
            } }),
        React.createElement(DatePickerModal, { locale: locale, mode: "multiple", visible: multiOpen, onDismiss: onDismissMulti, dates: dates, validRange: {
                startDate: new Date(),
            }, onConfirm: onChangeMulti }),
        React.createElement(TimePickerModal, { locale: locale, visible: timeOpen, onDismiss: onDismissTime, onConfirm: onConfirmTime, hours: time.hours, minutes: time.minutes })));
}
function Enter() {
    return React.createElement(View, { style: styles.enter });
}
function Row({ children }) {
    return React.createElement(View, { style: styles.row }, children);
}
function Label({ children }) {
    const theme = useTheme();
    return (React.createElement(Text, { style: [styles.label, { ...theme.fonts.medium }] }, children));
}
export default function AppWithProviders() {
    const dark = useColorScheme() === 'dark';
    return (React.createElement(PaperProvider, { theme: dark
            ? {
                ...DarkTheme,
                roundness: 10,
                colors: {
                    ...DarkTheme.colors,
                    // primary: '#F59E00',
                    // accent: '#FBBE5E',
                },
            }
            : {
                ...DefaultTheme,
                roundness: 10,
                colors: {
                    ...DefaultTheme.colors,
                    // primary: '#F59E00',
                    // accent: '#FBBE5E',
                },
            } },
        React.createElement(App, null)));
}
function TwitterFollowButton({ userName }) {
    return (React.createElement(Button, { uppercase: false, mode: "outlined", icon: "twitter", style: styles.twitterButton, onPress: () => Linking.openURL(`https://twitter.com/${userName}`) },
        "@",
        userName));
}
const styles = StyleSheet.create({
    underline: { textDecorationLine: 'underline' },
    logo: { width: 56, height: 56, marginRight: 24 },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    twitterButton: { marginBottom: 16 },
    root: { flex: 1 },
    content: {
        width: '100%',
        maxWidth: 500,
        marginTop: 24,
        padding: 24,
        alignSelf: 'center',
        // flex: 1,
    },
    contentInline: {
        padding: 0,
        height: 600,
    },
    contentShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 3,
    },
    switchContainer: {
        flexDirection: 'row',
        marginTop: 24,
        alignItems: 'center',
    },
    switchSpace: { flex: 1 },
    switchLabel: { fontSize: 16 },
    buttons: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24 },
    pickButton: { marginTop: 6 },
    buttonSeparator: { width: 6 },
    enter: { height: 12 },
    label: { width: 100, fontSize: 16 },
    row: { paddingTop: 12, paddingBottom: 12, flexDirection: 'row' },
    customModal: {
        top: 12,
        left: 12,
        right: 12,
        bottom: 12,
        // borderTopRightRadius: 20,
        // borderBottomRightRadius: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});
