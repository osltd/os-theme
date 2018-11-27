import React from 'react';
import PropTypes from 'prop-types';
import {Button, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: 0,
        padding: '6px 0px',
        display: 'inline-block',

    }, color: {
        margin: '5px',
        cursor: 'pointer',
        minHeight:'40px',
        width:'40px',
        borderRadius:'30px',
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
                                    children={
                                        selectedColor === n ? <span
                                            className={'icon-checkmark'}/> : <span/>
                                    }

                                    onClick={() => onClick(n)}
                                    key={i} className={classes.color} style={
                                selectedColor === n ? {
                                    color: n==='white'?'black':n,
                                    border: '5px solid ' + n,
                                    backgroundColor: 'white',

                                } : {
                                    backgroundColor: n,
                                    color: n,

                                    border: '5px solid ' + n,

                                }


                            }


                            />
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