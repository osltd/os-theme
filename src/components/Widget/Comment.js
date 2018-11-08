import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Grid, Typography} from '@material-ui/core';

const styles = theme => ({});

class WhiteDropDown extends React.Component {


    render() {
        const {
            classes, icon, value,
            icon2, label,
            labelExtra, options,
            selectedValue
        } = this.props;


        return (<Grid container>
                <Typography variant={'title'}>
                    Cristopher Lee
                </Typography>
                <span className={'icon-star-full'}/>
                <span className={'icon-star-full'}/>
                <span className={'icon-star-full'}/>
                <span className={'icon-star-full'}/>
                <span className={'icon-star-full'}/>
                <span className={'icon-star-full'}/>

                <Typography variant={'body2'}>
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione
                    voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                    adipisci veli
                </Typography>
            </Grid>
        )
    }
}

WhiteDropDown.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WhiteDropDown);