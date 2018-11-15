import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 0,
        padding: '5px 0px',
        display: 'inline-block',
    }, color: {
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: '20px',
        margin: '10px'
    }
})

class BackArrow extends React.Component {

    render() {
        const {classes, colors, selected, onClick} = this.props;

        return (
            <Grid container>
                {
                    colors.map(
                        (n, i) => <div
                            onClick={() => onClick(n)}
                            key={i} className={classes.color} style={
                            selected ? {
                                border: '5px solid ' + n,

                            } : {
                                backgroundColor: n,
                                border: '5px solid ' + n,

                            }


                        }/>
                    )
                }
            </Grid>

        );
    }
}

BackArrow.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackArrow);