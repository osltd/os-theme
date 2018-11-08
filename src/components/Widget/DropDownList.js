import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import {Grid, List, Typography} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
    listItem: {
        cursor: 'pointer',
    },
    root: {
        maxHeight: '400px',
        maxWidth: '300px',
    },
    binIcon:{
        '&:before':{
            color:'#ff8173',
            float:'right',
        }

    }
});

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
        const {classes, data} = this.props;

        return (
            <List className={classes.root} component="nav">
                {data.map((n, i) =>
                    <ListItem
                        component={n.link ? Link : null}
                        to={n.link && n.link}
                        button key={i}

                        onClick={n.onClick}>

                        <Grid container spacing={16}>
                            <Grid item sm={3}>
                                <img

                                    style={{width: '100%',}}
                                    src={'https://d29u17ylf1ylz9.cloudfront.net/thebell-v2/thebell/assets/img/products/home-two/product-2.jpg'}/>
                            </Grid>
                            <Grid item sm={9}>
                                <Typography variant={'body2'}>
                                    SPRITE YOGA COMPANION
                                </Typography>
                                <Typography variant={'caption'}>
                                    3 X $77.00
                                </Typography>
                                <span className={classes.binIcon + ' '+'icon-bin'} />
                            </Grid>
                        </Grid>


                    </ListItem>
                )}
            </List>
        )
    }
}

DropDownList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DropDownList);