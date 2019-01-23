import React from 'react';
import Select from 'react-select';
import {COUNTRY_CODE} from "../../../constants/constants";

class CountryCode extends React.Component {
    state = {
        selectedOption: null,
    }
    handleChange = (selectedOption) => {
        console.log(JSON.stringify(


            COUNTRY_CODE.map(
                n=>({
                    label:`${n.label} ( ${n.value} )`,
                        value:n.value
                })
            )
        ))
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }
    render() {
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={COUNTRY_CODE}
            />
        );
    }
}



export default CountryCode