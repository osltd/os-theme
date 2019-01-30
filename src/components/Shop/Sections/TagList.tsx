import List from '../../Widget/List'
import {getTagsCountsArray} from "../../../api/ApiUtils";
import React from "react";
import {Product} from "../../../interfaces/server/Product";
import {History} from "history";

interface Props {
    products: Array<Product>,
    onClick:Function,
    tag: string
    history: History
}

const  getTagsList: React.FunctionComponent<Props> = props => {
    const {
        products,
        onClick,
        tag,
        history
    } = props

    return <List
        history={history}
        data={getTagsCountsArray(products, onClick)}
        selectedValue={tag}
    />

}

export default getTagsList