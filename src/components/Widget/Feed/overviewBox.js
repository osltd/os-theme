import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import moment from 'moment'
import {withStyles} from "@material-ui/core/styles/index";
import Button from '../Button'
import {withRouter} from "react-router-dom";

const styles = theme => ({

    root: {
        maxHeight: '540px',
        minHeight: '540px',
        overflow: 'auto',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    },

    img: {
        cursor: 'pointer',
        width: '100%',
        height: '255px !important',
    },
    title: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.secondary.light,
        }
    },
    content: {},

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
        const {
            classes,
            src,
            subTitle,
            title,
            id, author,
            postDate,
            comments,
        } = this.props;
        return (
            <Grid container className={classes.root} alignItems={'center'} direction={'column'}>
                <Grid item xs={12}>
                    <img src={src}
                         onClick={() => this.props.history.push('/feed/' + id)}
                         className={classes.img}/></Grid>
                <Grid item direction={'column'} container xs={12} md={11} className={classes.content}>
                    <Grid item>
                        <Typography
                            className={classes.title}
                            onClick={() => this.props.history.push('/feed/' + id)}

                            variant={'headline'} color={'primary'}>{title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'caption'}>
                            {'By ' + author + ' / ' + moment(postDate).format('ll') + ' / ' + comments + ' comments'}</Typography>
                    </Grid>
                    <Grid item>

                        <Typography variant={'body1'}
                                    color={'secondary'}>{subTitle}{subTitle}{subTitle}{subTitle}</Typography>
                    </Grid>
                    <Grid item>

                        <Button
                            link={'/feed/' + id}
                            value={'Continue Reading'}

                        />

                    </Grid>

                </Grid>

            </Grid>
        );
    }

}


export default withRouter(withStyles(styles)(ResponsiveDialog))