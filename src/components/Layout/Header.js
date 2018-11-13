import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import {BottomNavigation, BottomNavigationAction, Grid, Input} from '@material-ui/core';
import Button from '../Widget/Button'
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import PopUp from '../Widget/PopUp'
import SearchIcon from '@material-ui/icons/Search';
import DropDownList from '../Widget/DropDownList'
import withWidth, {isWidthUp} from "@material-ui/core/withWidth/index";
import classNames from "classnames";
import {withRouter} from "react-router-dom";

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        backgroundColor: 'white',
    },
    appBar: {
        backgroundColor: 'white',
        color: 'black',
        width: '100%',
        padding: '20px 20px',
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


class Header extends React.Component {
    handleChange = (event, value) => {
        this.setState({value});
    };

    constructor(props) {
        super(props)
        this.state = {
            value: 'recents',
        };
    }

    render() {
        const {classes, width} = this.props;
        const {value} = this.state
        if (isWidthUp('sm', width)) {

            return (
                <AppBar position="fixed" className={classes.appBar}>
                    <Grid container justify={'space-between'}>
                        <Grid item sm={2}>
                            <Button

                                icon={'icon-home'}
                                link={'/'}
                                value={'main'}
                            />
                        </Grid>
                        <Grid item sm={4} spacing={'16'} container alignItems={'center'} justify={'center'}>
                            <Grid item>
                                <Button
                                    icon2={'icon-circle-down'}

                                    link={'/shop/17'}
                                    value={'single product'}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    icon={'icon-gift'}
                                    icon2={'icon-circle-down'}
                                    link={'/shop'}
                                    value={'shop'}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    icon={'icon-books'}
                                    icon2={'icon-circle-down'}
                                    link={'/feed'}
                                    value={'feed'}
                                />
                            </Grid>
                        </Grid>
                        <Grid item sm={2}>
                            <div className={classes.grow}/>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon/>
                                </div>
                                <Input
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item sm={2}>
                            <PopUp
                                dropDown={<DropDownList
                                    data={['ggg', 'ggg', 'ggg', 'ggg', 'ggg', 'ggg', 'ggg', 'ggg',]}
                                />
                                }
                                parent={<Button
                                    icon={'icon-cart'}
                                    value={'shopping cart'}
                                />}
                            />
                        </Grid>
                    </Grid>
                </AppBar>)

        }
        return <BottomNavigation value={value} onChange={this.handleChange} className={classes.root}>

            <BottomNavigationAction label="Home" value="Home"
                                    onClick={() => this.props.history.push('/')}
                                    icon={<span className={classNames('icon-home', classes.icon)}/>}/>

            <BottomNavigationAction label="Shops" value="Shops"
                                    onClick={() => this.props.history.push('/shop')}

                                    icon={<span className={classNames(classes.icon, 'icon-gift')}/>}/>

            <BottomNavigationAction label="Product" value="Product"
                                    onClick={() => this.props.history.push('/shop/17')}
                                    icon={<span className={classNames(classes.icon, 'icon-stack')}/>}/>
        </BottomNavigation>


    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withRouter(withWidth()(withStyles(styles)(Header)))