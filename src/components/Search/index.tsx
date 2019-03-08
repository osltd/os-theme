import React, {useContext, useState} from 'react';
import {Grid} from '@material-ui/core';
import Header from '../Layout/Body/Header'
import LoadingPage from '../Layout/LoadingPage'
import {makeStyles} from "@material-ui/styles";
import {RouteComponentProps} from "react-router";
import {reducer} from "../../context";

const useStyles = makeStyles(theme => ({
    productCategory: {
        backgroundColor: '#F7F7F7',

    },
    toolBar: {
        padding: '10px',
        backgroundColor: theme.palette.background.paper,
    },
    icon: {
        padding: '10px',
        cursor: 'pointer',
        alignItems: 'center',
        border: '1px solid black',

    }, listMode: {
        padding: '20px',
    },
    array: {
        paddingLeft: '5px',
    }
}));

interface Props extends RouteComponentProps {
    keyword?: string

    [key: string]: any
}

const SearchPage: React.FunctionComponent<Props> = props => {
    const {productReducer, feedReducer} = useContext(reducer);
    const [keyword, setKeyword] = useState(props.match.params ? props.match.params : '');

    function searchData<T>(data: Array<T>): Array<T> {
        return data.filter(n => (props.keyword) ? (JSON.stringify(n).toLowerCase().indexOf(props.keyword.toLowerCase()) !== -1) : false);
    }

    const classes = useStyles();

    if (!props.products && !props.feeds) return <LoadingPage/>;
    const products = props.products ? searchData(props.products) : [];
    const feeds = props.feeds ? searchData(props.feeds) : [];
    const searchResultCount = products.length + feeds.length;

    return (
        <Grid container alignItems={'center'} justify={'center'}>
            <Header
                title={'Search'}

            />

        </Grid>
    );
};

export default (SearchPage)