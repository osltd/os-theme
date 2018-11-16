import React from 'react';
import PropTypes from 'prop-types';
import {Grid,Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 0,
        padding: '5px 0px',
        display: 'inline-block',
    }, color: {
        margin:'5px',
        cursor: 'pointer',
    }
})

class ColorPicker extends React.Component {

    render() {
        const {classes, colors, selectedColor, onClick} = this.props;

        return (
            <Grid container>
                {
                    colors.map(
                        (n, i) =>
                        <Button variant="extendedFab"
                                children={<span/>}
                            onClick={() => onClick(n)}
                            key={i} className={classes.color} style={
                            selectedColor === n ? {
                                color:n,
                                border: '5px solid ' + n,
                                backgroundColor: 'white',

                            } : {
                                backgroundColor: n,
                                color:n,

                                border: '5px solid ' + n,

                            }


                        }/>
                    )
                }
            </Grid>

        );
    }
}

ColorPicker.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ColorPicker);