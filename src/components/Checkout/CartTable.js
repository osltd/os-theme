import React from 'react';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux'
import {EDIT_PRODUCT_VIEW_MODE, PRODUCT_EDIT_FILTER, PRODUCT_EDIT_SORT} from "../../constants/actionType";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
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
    }
})

const mapStateToProps = state => ({
    products: state.product.products,
    viewMode: state.product.viewMode,
    sort: state.product.sort,
    filter: state.product.filter,
});


const mapDispatchToProps = dispatch => ({

        changeViewMode: (mode) =>
            dispatch({
                    type: EDIT_PRODUCT_VIEW_MODE,
                    payload: mode,
                }
            )
        ,
        editProductSort: (key, value) => dispatch({
            type: PRODUCT_EDIT_SORT,
            payload: {
                key: key,
                value: value,
            },
        }),
        editProductFilter: (key, value) => dispatch({
            type: PRODUCT_EDIT_FILTER,
            payload: {
                key: key,
                value: value,
            },
        }),
    }
)

class ShopOverview extends React.Component {


    render() {

        const {classes} = this.props

        return (
            <Grid container justify={'center'}>
                <Grid item xs={12}>
                </Grid>
                {
                    data.map((n, i) => <Grid item container>
                        <Grid item>
                            {n.name} X {n.number}
                        </Grid>
                        <Grid item>
                            {n.price * n.number}

                        </Grid>

                    </Grid>)
                }
                <Grid item container>
                    <Grid item>
                        total amount
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>

            </Grid>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopOverview))