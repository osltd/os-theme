import React, {ReactNode, useState} from 'react';
import {Theme} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    container: {
        display: 'flex',
    },
    title: {
        cursor: 'pointer',
    },
    arrow: {
        '&:before': {
            fontSize: '30px',
            color: theme.palette.secondary.dark,
        }

    }

}));

interface Props {
    title: React.ReactNode,
    collapse: ReactNode,
    arrow: boolean,

}

const SimpleCollapse: React.FunctionComponent<Props> = props => {
    const [checked, setChecked] = useState(false);
    const classes = useStyles();
    const {title, collapse, arrow} = props;
    return (
        <Grid container className={classes.root}>
            <Grid item container alignItems={'center'} className={classes.title} onClick={() => setChecked(!checked)}>
                <Grid item>
                    {title}
                </Grid>
                {
                    arrow &&
                    <Grid item>
                        <span className={classes.arrow + ' ' + (checked ? 'icon-circle-down' : 'icon-circle-up')}/>
                    </Grid>
                }
            </Grid>
            <Grid item xs={11} container justify={'center'}>
                <Collapse in={checked}>
                    {collapse}
                </Collapse>
            </Grid>

        </Grid>
    );
};

export default (SimpleCollapse)