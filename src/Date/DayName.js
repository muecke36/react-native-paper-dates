import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
function DayName({ label }) {
    const theme = useTheme();
    return (React.createElement(View, { style: styles.dayName },
        React.createElement(Text, { style: [styles.dayNameLabel, theme.fonts.medium], selectable: false }, label)));
}
const styles = StyleSheet.create({
    dayName: { flex: 1, alignItems: 'center' },
    dayNameLabel: { fontSize: 14, opacity: 0.7 },
});
export default React.memo(DayName);
