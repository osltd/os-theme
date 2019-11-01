import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {AppBar, BottomNavigation, BottomNavigationAction, Grid, Input} from '@material-ui/core';
import Button from '../Widget/Button/Button'
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import PopUp from '../Widget/PopUp'
import SearchIcon from '@material-ui/icons/Search';
import DropDownList from './Body/ShoppingCartList'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import classNames from "classnames";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {CART_OPERATE_SHOPPING_CART, COMMON_EDIT_SEARCH_BAR} from "../../constants/actionType";
import {redirectUrl} from "../../api/ApiUtils";
import {useI18nText} from "../../hooks/useI18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import DropDown from "../Widget/DropDown";
import actionType from "../../context/actionType";
import {reducer} from "../../context";

const styles = theme => ({
    logo: {
        cursor: 'pointer',
        height: 50,
        backgroundSize: 35,
        borderWidth: 0,
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center left',
        textTransform: 'uppercase'
    },
    grow: {
        flexGrow: 1,
    },
    root: {
        backgroundColor: 'white',
        borderBottom: '1px solid ' + theme.palette.secondary.light,
    },
    appBar: {
        backgroundColor: 'white',
        color: 'black',
        width: '100%',
        padding: '10px',
    },
    icon: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        fontSize: '30px',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },

});


const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
    keyword: state.common.searchBar,
    products: state.product.products,
    feeds: state.feed.feeds,
    shopInfo: state.common.shopInfo,
});


const mapDispatchToProps = dispatch => ({
        editShoppingCart: (index) => dispatch({
            type: CART_OPERATE_SHOPPING_CART,
            payload: {
                key: 'remove',
                value: index,

            }
        }),
        editSearchBar: (keyword = null) => dispatch({
            type: COMMON_EDIT_SEARCH_BAR,
            payload: keyword
        })
    }

);

const Header = props => {
    const {commonReducer} = useContext(reducer)
    const [keyword, setKeyword] = useState('');
    const [navBar, setNavBar] = useState('');
    const {
        history,
        classes,
        width,
        products,
        feeds,
        shoppingCart,
        editShoppingCart,
    } = props;
    console.log();
    let getInputBar = () =>
        <Input
            onKeyDown={e =>
                (e.key === 'Enter' && keyword) ? redirectUrl('/search/' + keyword, history) : null
            }
            onChange={e => setKeyword(e.target.value)}
            disableUnderline={true}
            placeholder={`${useI18nText(keyOfI18n.SEARCH)}…`}
            classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
            }}
        />;


    let hasProductsToShow = (products && products.length > 0);
    let hasFeedsToShow = (feeds && feeds.length > 0);

    if (isWidthUp('md', width)) {
        return (<AppBar position="fixed" className={classes.appBar} style={{boxShadow: 'none'}}>
            <Grid container alignItems={'center'} justify={'space-between'}>
                <Grid item xs={1}>
                    {
                        props.shopInfo ? <button
                            className={classes.logo}
                            onClick={() => redirectUrl('/', history)}
                            style={props.shopInfo.logo ? {
                                backgroundImage: 'url(' + props.shopInfo.logo.replace('.cloud/','.cloud/70x70/') + ')',
                                paddingLeft: 45
                            } : {}}
                        >{props.shopInfo.name}</button> : null

                    }

                </Grid>
                <Grid item xs={6} container>
                    {
                        hasProductsToShow && <Grid item>
                            <Button
                                onClick={() => redirectUrl('/products', history)}
                                value={useI18nText(keyOfI18n.PRODUCTS)}
                            />
                        </Grid>
                    }
                    {
                        hasFeedsToShow &&
                        <Grid item>
                            <Button
                                onClick={() => redirectUrl('/articles', history)}
                                value={useI18nText(keyOfI18n.FEEDS)}
                            />
                        </Grid>
                    }
                    {(hasProductsToShow) && <Grid item>
                        <Button
                            onClick={() => redirectUrl('/checkout', history)}

                            value={useI18nText(keyOfI18n.CHECKOUT)}
                        />
                    </Grid>}
                </Grid>
                {
                    (isWidthUp('lg', width)) ?
                        <Grid item xs={4} container alignItems={'center'} justify={'flex-end'}>
                            <Grid item>
                                <DropDown
                                    selectedValue={commonReducer.state.locale==='en'?'English':'繁體中文'}
                                    options={

                                        [
                                            {
                                                label: 'English',
                                                value: 'en',
                                                onClick: () => {
                                                    commonReducer.dispatch(
                                                        {
                                                            type: actionType.common.COMMON_INIT_I18N,
                                                            payload: {
                                                                locale:'en'
                                                            }
                                                        }
                                                    );
                                                }

                                            },
                                            {
                                                label: '繁體中文',
                                                value: 'zh',

                                                onClick: () => {
                                                    commonReducer.dispatch(
                                                        {
                                                            type: actionType.common.COMMON_INIT_I18N,
                                                            payload: {
                                                                locale:'zh'
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        ]

                                    }
                                />

                            </Grid>
                            <Grid item>
                                <div className={classes.grow}/>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    {getInputBar()}
                                </div>
                            </Grid>
                            {
                                hasProductsToShow && <Grid item>
                                    <PopUp
                                        popUp={<DropDownList
                                            data={shoppingCart}
                                            onDelete={index => editShoppingCart(index)}
                                        />
                                        }
                                        title={<Button
                                            value={useI18nText(keyOfI18n.SHOPPING_CART)}
                                        />}
                                    />

                                </Grid>
                            }
                        </Grid> : <Grid item xs={4} container alignItems={'center'} justify={'center'}>

                            <Grid item>
                                <div className={classes.grow}/>
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    {getInputBar()}
                                </div>
                            </Grid>



                            <Grid item>
                                <PopUp
                                    popUp={<DropDownList
                                        data={shoppingCart}
                                        onDelete={index => editShoppingCart(index)}

                                    />
                                    }
                                    title={<Button
                                        icon={'icon-cart'}
                                    />}
                                />

                            </Grid>
                        </Grid>
                }

            </Grid>
        </AppBar>)
    }

    return <BottomNavigation value={navBar} onChange={(event, value) => setNavBar(value)
    } className={classes.root}>

        <BottomNavigationAction label="Home" value="Home"
                                onClick={() => redirectUrl('/', history)}
                                icon={<span className={classNames('icon-home', classes.icon)}/>}/>

        <BottomNavigationAction label="Products" value="Products"
                                onClick={() => redirectUrl('/products', history)}

                                icon={<span className={classNames(classes.icon, 'icon-gift')}/>}/>

        <BottomNavigationAction label="Articles" value="Articles"
                                onClick={() => redirectUrl('/articles', history)}
                                icon={<span className={classNames(classes.icon, 'icon-file-text')}/>}/>
        <BottomNavigationAction label="Checkout" value="Checkout"
                                onClick={() => redirectUrl('/checkout', history)}
                                icon={<span className={classNames(classes.icon, 'icon-coin-dollar')}/>}/>

    </BottomNavigation>


};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withWidth()(withStyles(styles)(Header))))