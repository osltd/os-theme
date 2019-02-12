import React, {useContext, useEffect, useState} from 'react';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'
import {handleImgValid, refactorTextLength} from "../../api/ApiUtils";
import withWidth from "@material-ui/core/withWidth/index";
import FeedOverviewBox from '../Widget/Feed/overviewBox'
import ProductOverviewBox from '../Widget/Product/overviewBox'
import Header from '../Layout/Body/Header'
import LoadingPage from '../Layout/LoadingPage'
import SearchBar from '../Widget/SearchBar/original'
import {COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import {makeStyles} from "@material-ui/styles";
import {Product} from "../../interfaces/server/Product";
import {Feed} from "../../interfaces/server/Feed";
import {Reducer} from "../../context/Product";
import {RouteComponentProps} from "react-router";

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
interface Props extends RouteComponentProps{
keyword?:string
    [key:string]:any
}
const SearchPage:React.FunctionComponent<Props> = props => {
    const {state, dispatch} = useContext(Reducer);

const [keyword,setKeyword] = useState(props.match.params?props.match.params:'')
  function   searchData<T>(data:Array<T>):Array<T>{
    return  data.filter(n => (props.keyword) ? (JSON.stringify(n).toLowerCase().indexOf(props.keyword.toLowerCase()) !== -1) : false);
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
}

export default (SearchPage)