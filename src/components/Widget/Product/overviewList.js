import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import {Grid, Typography} from '@material-ui/core';
import {formatMoney} from "../../../api/ApiUtils";

const styles = props => {
    console.log(props)
    return ({
        root: {
            padding: '0 10px 0 10px',
        },
        img: {
            width: '100%',
            maxHeight: '255px !important',
        },
        cf6_image: {
            width: '100%',
            maxHeight: '255px !important',

            transition: 'background-image 1s ease-in-out',
            backgroundImage: 'url(' + props + ')',

            '&:hover': {
                backgroundImage: 'url(' + props.src + ')',
            }
        },

        oldPrice: {},
        price: {
            fontWeight: '900',
        }

    })


}


class ResponsiveDialog extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            open: false,
        }
    }

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

    render() {
        const {classes, src, name, category, regPrice, promotePrice,description} = this.props;

        return (
            <Grid container spacing={16} alignItems={'center'} className={classes.root} >
                <Grid item xs={3}>
                <img src={src} className={classes.cf6_image}/>
                </Grid>
                <Grid item xs={9}>
                <Typography variant={'headline'} color={'primary'}>{category}</Typography>
                <Typography variant={'title'} color={'secondary'}>{name}</Typography>
                <Typography variant={'caption'} >{description}</Typography>
                {
                    promotePrice ?
                        <Grid item container direction={'row'}>

                            <Typography component={'del'} variant={'subheading'}
                                        className={classes.oldPrice}>$ {formatMoney(regPrice)}</Typography>
                            <Typography variant={'subheading'} className={classes.price}>${formatMoney(promotePrice)}</Typography>
                        </Grid>
                        : <Typography variant={'subheading'} className={classes.price}>$ {formatMoney(regPrice)}</Typography>

                }
                </Grid>
            </Grid>
        );
    }

}


export default withStyles(styles)(ResponsiveDialog)