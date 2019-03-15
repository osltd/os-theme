import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {EDIT_PRODUCT_DETAIL} from "../../../constants/actionType";
import {connect} from "react-redux";
import {Grid} from '@material-ui/core'
import classNames from 'classnames'

const styles = theme => (
    {
        root: {}, icon: {
            '&:before': {
                color: 'gold',
            }
        }
    }
)

const mapStateToProps = state => ({
    section: state.product.detail.section
});


const mapDispatchToProps = dispatch => ({
        editActiveSection: (key, value) => dispatch({
            type: EDIT_PRODUCT_DETAIL,
            payload: {
                key: key,
                value: value,

            }
        })

    }
)

class RatingBar extends React.Component {

    getStar = star => Array(Math.floor(star)).fill('star').map((n, i) => <span
        key={i}

        className={classNames(this.props.classes.icon, 'icon-star-full')}/>)
    getHalfStar = star => !!(star % 1) ?
        <span

            className={classNames(this.props.classes.icon, 'icon-star-half')}/> : null
    getEmptyStar = star => Array(5 - Math.floor(star) - (!!(star % 1) ? 1 : 0)).fill('star').map((n, i) =>
        <span
            key={i}
            className={classNames(this.props.classes.icon, 'icon-star-empty')}/>)


    render() {
        const {classes, section} = this.props;

        return (

            <Grid container spacing={16}>
                <Grid item>
                    {this.getStar(5)}
                    {this.getHalfStar(5)}
                    {this.getEmptyStar(5)}

                    (5)
                </Grid>
                <Grid item>
                    {this.getStar(4.5)}
                    {this.getHalfStar(4.5)}
                    {this.getEmptyStar(4.5)}

                    (4)
                </Grid>
                <Grid item>
                    {this.getStar(3.5)}
                    {this.getHalfStar(3.5)}
                    {this.getEmptyStar(3.5)}

                    (3)
                </Grid>
                <Grid item>
                    {this.getStar(2)}
                    {this.getHalfStar(2)}
                    {this.getEmptyStar(2)}
                    (2)
                </Grid>
                <Grid item>
                    {this.getStar(1)}
                    {this.getHalfStar(1)}
                    {this.getEmptyStar(1)}

                    (1)
                </Grid>
            </Grid>
        );
    }
}

RatingBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RatingBar))