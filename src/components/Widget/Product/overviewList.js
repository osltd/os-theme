import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import {Grid, Typography} from '@material-ui/core';
import {formatMoney} from "../../../api/ApiUtils";
import {withRouter} from "react-router-dom";


const styles = theme => ({
    name: {
        textTransform: 'uppercase',
        fontSize: '17px',
        color: theme.palette.secondary.dark,
        cursor: 'pointer',
        marginBottom: '15px',

        '&:hover': {
            color: theme.palette.primary.dark,
        }
    }, category: {
        fontSize: '13px',
        color: theme.palette.secondary.light,
        marginTop: '15px',
    },

    root: {
        padding: '10px',

    },
    img: {
        cursor: 'pointer',
        width: '100%',
        maxHeight: '255px !important',
    },

    oldPrice: {},
    price: {
        color: '#333333',
        fontFamily: 'arial',
        lineHeight: 1,
    }

})





class ResponsiveDialog extends React.Component {

    styles = theme => ({
        content: {
            "padding": this.props.padding,
            "min-height": "100vh",
            "background-color": this.props.backgroundColor
        }
    })
    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {

        this.setState({open: false});
    };

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

    render() {
        const {classes, src, name, category, id, regPrice, promotePrice, description} = this.props;

        return (
            <Grid container spacing={16} alignItems={'center'} className={classes.root}>
                <Grid item xs={3}>
                    <img src={src}

                         onClick={() => this.props.history.push('/shop/' + id)}

                         className={classes.img}/>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant={'title'}
                                onClick={() => this.props.history.push('/shop/' + id)}
                                className={classes.name}
                    >{name}</Typography>
                    {
                        category && <Typography variant={'headline'}
                                                className={classes.category}

                                                color={'primary'}>{category && category.join(',')}</Typography>

                    }
                    <Typography variant={'caption'}>{description}</Typography>
                    {
                        promotePrice ?
                            <Grid item container direction={'row'}>

                                <Typography component={'del'} variant={'subheading'}
                                            className={classes.oldPrice}>$ {formatMoney(regPrice)}</Typography>
                                <Typography variant={'subheading'}
                                            className={classes.price}>${formatMoney(promotePrice)}</Typography>
                            </Grid>
                            : <Typography variant={'subheading'}
                                          className={classes.price}>$ {formatMoney(regPrice)}</Typography>

                    }
                </Grid>
            </Grid>
        );
    }

}


export default withRouter(withStyles(styles)(ResponsiveDialog))