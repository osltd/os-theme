import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {withRouter} from 'react-router-dom'
import {Button, Grid, List, Tooltip, Typography, Zoom} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {handleImgValid, redirectUrl, refactorTextLength} from "../../../api/ApiUtils";
import {connect} from "react-redux";
import {I18nText} from "../../Widget/I18nText";
import {keyOfI18n} from "../../../constants/locale/interface";

const styles = theme => ({
    listItem: {
        cursor: 'pointer',
    },
    root: {
        maxWidth: '300px',
    },
    list: {
        overflow: 'auto',
        maxHeight: '300px',
        width: '100%',
    },
    button: {
        margin: "10px",
    }
    ,
    binIcon: {
        cursor: 'pointer',
        float: 'right',
        '&:hover': {
            '&:before': {
                color: '#ff8173',
            }
        }
    }
});

const mapStateToProps = state => ({
    items: state.cart.items,
});


const mapDispatchToProps = dispatch => ({}
);

class ShoppingCartList extends React.Component {
    state = {
        anchor: 'left',
    };

    constructor() {
        super();
        this.state = {
            placeHolder: '',

        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,

        });
    };

    // selectedData = n => n.product.variants.find(variant => variant.id === n.variantId) ? n.product.variants.find(variant => variant.id === n.variantId) : n.product;

    render() {
        const {classes, items, onDelete} = this.props;
        return (
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <List className={classes.list} component="nav">
                        {items.length > 0 ? items.map((n, i) =>

                            <ListItem
                                key={i}
                                button

                                onClick={() => redirectUrl('/products/' + n.product.id, this.props.history)}>
                                <Tooltip
                                    TransitionComponent={Zoom}
                                    title={n.name}>

                                    <Grid container spacing={16}>
                                        <Grid item sm={3}>

                                            <img
                                                style={{width: '100%', minWidth: '50px'}}
                                                src={handleImgValid(n.media[0])}
                                            />

                                        </Grid>
                                        <Grid item sm={9}>
                                            <Typography variant={'body1'}>
                                                {refactorTextLength(n.name)}
                                            </Typography>
                                            <Typography variant={'caption'}>
                                                {n.number} X
                                                $ {n.price
                                            }
                                            </Typography>
                                            <span
                                                onClick={() => onDelete(i)}
                                                className={classes.binIcon + ' ' + 'icon-bin'}/>
                                        </Grid>
                                    </Grid>
                                </Tooltip>

                            </ListItem>
                        ) : <ListItem
                        >

                            <Typography variant={'subtitle1'}>
                                <I18nText keyOfI18n={keyOfI18n.CART_NO_ITEMS_TO_SHOW}/>
                            </Typography>
                        </ListItem>}

                    </List>
                </Grid>
                <Grid item container justify={'center'} xs={12}>
                    <Grid item>
                        <Button
                            className={classes.button}
                            variant={'outlined'}
                            onClick={() => redirectUrl('/shopping-cart', this.props.history)}
                        >
                            <I18nText keyOfI18n={keyOfI18n.VIEW_CART}/> </Button>
                    </Grid>
                    <Grid item>
                        <Button variant={'outlined'}
                                className={classes.button}
                                onClick={() => redirectUrl('/checkout', this.props.history)}>
                            <I18nText keyOfI18n={keyOfI18n.CHECKOUT}/>
                        </Button>
                    </Grid>

                </Grid>
            </Grid>
        )
    }
}

ShoppingCartList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShoppingCartList)))