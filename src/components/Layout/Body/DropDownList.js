import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import {Grid, List, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import LoadingPage from '../LoadingPage'
import {refactorTextLength} from "../../../api/ApiUtils";
import {connect} from "react-redux";

const styles = theme => ({
    listItem: {
        cursor: 'pointer',
    },
    root: {
        maxHeight: '400px',
        maxWidth: '300px',
    },
    binIcon: {
        cursor: 'pointer',
        float:'right',
        '&:hover': {
            '&:before': {
                color: '#ff8173',
            }
        }
    }
});

const mapStateToProps = state => ({
    shoppingCart: state.cart.shoppingCart,
});


const mapDispatchToProps = dispatch => ({}
)

class DropDownList extends React.Component {
    state = {
        anchor: 'left',
    };
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,

        });
    };

    constructor() {
        super()
        this.state = {
            placeHolder: '',

        }
    }

    render() {
        const {classes, data, onDelete} = this.props;

        return (
            <List className={classes.root} component="nav">
                {console.log(data)}
                {data.length > 0 ? data.map((n, i) =>
                    <ListItem
                        component={n.link ? Link : null}
                        to={n.link && n.link}
                        button key={i}
                        onClick={n.onClick}>

                        <Grid container spacing={16}>
                            <Grid item sm={3}>
                                <img
                                    style={{width: '100%',}}
                                    src={n.product.photos[0].url}
                                />
                            </Grid>
                            <Grid item sm={9}>
                                <Typography variant={'body2'}>
                                    {refactorTextLength(n.product.name)}
                                </Typography>
                                <Typography variant={'caption'}>
                                    {n.number} X {n.product.variants.find(variant => variant.id === n.variantId).price
                                }
                                </Typography>
                                <span
                                    onClick={() => onDelete(i)}
                                    className={classes.binIcon + ' ' + 'icon-bin'}/>
                            </Grid>
                        </Grid>


                    </ListItem>
                ) : <LoadingPage/>}
            </List>
        )
    }
}

DropDownList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DropDownList))