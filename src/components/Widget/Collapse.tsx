import React, {ReactNode, useState} from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import {MaterialUIClasses} from "../../interfaces/client/Common";
import createStyles from "@material-ui/core/styles/createStyles";

const styles = (theme: Theme) => createStyles({
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

});

interface Props {
    classes: MaterialUIClasses,
    title: React.ReactNode,
    collapse: ReactNode,
    arrow: boolean,

}

const SimpleCollapse: React.FunctionComponent<Props> = props => {
    const [checked, setChecked] = useState(false);

    const {classes, title, collapse, arrow} = props;

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
            <Grid item xs={11} container justify={'center'} className={classes.collapse}>
                <Collapse in={checked}>
                    {collapse}
                </Collapse>
            </Grid>

        </Grid>
    );
};

export default withStyles(styles)(SimpleCollapse)