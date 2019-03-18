import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import {Grid, Typography} from '@material-ui/core';

const styles = props => {
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


};


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
    });

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {

        this.setState({open: false});
    };

    render() {
        const {classes, src, subTitle, title} = this.props;

        return (
            <Grid container className={classes.root} direction={'column'}>

                <img src={src} className={classes.cf6_image}/>
                <Typography variant={'h5'} color={'primary'}>{title}</Typography>
                <Typography variant={'h6'} color={'secondary'}>{subTitle}</Typography>

            </Grid>
        );
    }

}


export default withStyles(styles)(ResponsiveDialog)