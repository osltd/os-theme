import List from '../../../../Widget/List'
import React from "react";
import {Clickable} from "../../../../../interfaces/client/Common";

interface Props {
    data: Array<Clickable>
    tag: string
}

const TagList: React.FunctionComponent<Props> = props => {
    const {
        tag, data
    } = props;

    return <List
        data={data}
        selectedValue={tag}
    />

};

export default TagList