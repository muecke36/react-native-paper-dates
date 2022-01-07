import * as React from 'react';
import { DatePickerInput } from '../../src/index';
export default function ReadMeExampleDatePickerInput() {
    const [inputDate, setInputDate] = React.useState(undefined);
    return (React.createElement(React.Fragment, null,
        React.createElement(DatePickerInput, { locale: "en", label: "Birthdate", value: inputDate, onChange: (d) => setInputDate(d), inputMode: "start", autoComplete: "birthdate-full" })));
}
