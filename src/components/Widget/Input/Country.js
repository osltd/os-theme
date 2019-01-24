import React from 'react';
import Select from 'react-select';
import {COUNTRY_CODE} from "../../../constants/constants";

const CountryCode = props => {
    const {value, onChange} = props

    return (
        <Select
            value={value}
            onChange={onChange}
            options={COUNTRY_CODE}
        />
    )
}


export default CountryCode