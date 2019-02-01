import React from 'react'
import {numberToPagination} from '../../../api/ApiUtils'
import _ from 'lodash'
import DropDown from '../../Widget/DropDown'

interface Props {
    length: number
    onClick: (page: string) => void
    page: string
}

let Pagination: React.FunctionComponent<Props> = (props) => {
    const {length, page, onClick} = props
    if (length === 0) return null;
    let options = numberToPagination(length, onClick)
    if (page === '' && (!(_.isEmpty(options[0].label)))) onClick(options[0].label)
    return (<DropDown
        options={options}
        selectedValue={page}
    />)
}
//todo rerender even props not change
export default React.memo(Pagination)