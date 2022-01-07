import * as React from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, useWindowDimensions, View, Platform, StatusBar, } from 'react-native';
import { useTheme } from 'react-native-paper';
import DatePickerModalContent from './DatePickerModalContent';
import { useHeaderBackgroundColor, useHeaderColorIsLight } from '../utils';
export function DatePickerModal(props) {
    const theme = useTheme();
    const dimensions = useWindowDimensions();
    const { visible, animationType, disableStatusBar, disableStatusBarPadding, ...rest } = props;
    const animationTypeCalculated = animationType ||
        Platform.select({
            web: 'none',
            default: 'slide',
        });
    const isLight = useHeaderColorIsLight();
    const headerBackgroundColor = useHeaderBackgroundColor();
    return (React.createElement(View, { style: [StyleSheet.absoluteFill], pointerEvents: "box-none" },
        React.createElement(Modal, { animationType: animationTypeCalculated, transparent: true, visible: visible, onRequestClose: rest.onDismiss, presentationStyle: "overFullScreen", supportedOrientations: supportedOrientations, 
            //@ts-ignore
            statusBarTranslucent: true },
            React.createElement(React.Fragment, null,
                React.createElement(TouchableWithoutFeedback, { onPress: rest.onDismiss },
                    React.createElement(View, { style: [
                            StyleSheet.absoluteFill,
                            styles.modalBackground,
                            { backgroundColor: theme.colors.backdrop },
                        ] })),
                React.createElement(View, { style: [StyleSheet.absoluteFill, styles.modalRoot], pointerEvents: "box-none" },
                    React.createElement(View, { style: [
                            styles.modalContent,
                            { backgroundColor: theme.colors.surface },
                            dimensions.width > 650 ? styles.modalContentBig : null,
                        ] },
                        disableStatusBar ? null : (React.createElement(StatusBar, { translucent: true, barStyle: isLight ? 'dark-content' : 'light-content' })),
                        disableStatusBarPadding ? null : (React.createElement(View, { style: [
                                {
                                    height: StatusBar.currentHeight,
                                    backgroundColor: headerBackgroundColor,
                                },
                            ] })),
                        React.createElement(DatePickerModalContent, { ...rest, disableSafeTop: disableStatusBar })))))));
}
const supportedOrientations = [
    'portrait',
    'portrait-upside-down',
    'landscape',
    'landscape-left',
    'landscape-right',
];
const styles = StyleSheet.create({
    modalRoot: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    modalBackground: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        width: '100%',
    },
    modalContentBig: {
        maxWidth: 600,
        maxHeight: 800,
        borderRadius: 10,
        width: '100%',
        overflow: 'hidden',
    },
});
export default React.memo(DatePickerModal);
