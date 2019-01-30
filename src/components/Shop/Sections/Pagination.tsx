import React from 'react'
import {Product} from '../../../interfaces/server/Product';
import {numberToPagination} from '../../../api/ApiUtils'
import _ from 'lodash'
import DropDown from '../../Widget/DropDown'

interface Props {
    products: Array<Product>
    onClick: (page: string) => null
    page: string
}

let Pagination: React.FunctionComponent<Props> = (props) => {
    const {products, page, onClick} = props
    if (products.length === 0) return null;
    let options = numberToPagination(products.length, onClick)
    //todo('have error of Warning: Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state.")
    if (page === '' && (!(_.isEmpty(options[0].label)))) onClick(options[0].label)
    return (<DropDown
        options={options}
        selectedValue={page}
    />)
}
export default Pagination