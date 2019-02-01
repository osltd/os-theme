import React from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Grid, Input, Typography} from '@material-ui/core';
import {MaterialUIClasses} from "../../interfaces/client/Common";
import {CounterValidation} from "../../api/ApiUtils";
import createStyles from "@material-ui/core/styles/createStyles";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    operator: {
        padding: '10px',
        cursor: 'pointer',

        MozUserSelect: '-moz-none',
        KhtmlUserSelect: 'none',
        WebkitUserSelect: 'none',
        OUserSelect: 'none',
        userSelect: 'none',
        border: '1px solid ' + theme.palette.secondary.light,

    },
    input: {
        borderTop: '1px solid ' + theme.palette.secondary.light,
        borderBottom: '1px solid ' + theme.palette.secondary.light,
        maxWidth: '60px',
        padding: '10px 20px',
        cursor: 'pointer',
    }
}))

interface Props {
    number: number,
    onChange: (number: number) => number
}

const Counter: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles()
    const {number, onChange} = props;
    return (
        <Grid container alignItems={'center'}>
            <Grid item>
                <Typography variant={'h6'}
                            className={classes.operator}
                            onClick={() => onChange(number > 1 ? (number - 1) : 0)}>-</Typography>
            </Grid>
            <Grid item>
                <Input
                    value={number ? number : onChange(1)}
                    onChange={e => onChange(CounterValidation(parseInt(e.target.value)))}
                    type="number"
                    className={classes.input}
                    disableUnderline={true}
                />
            </Grid>
            <Grid item>
                <Typography variant={'h6'}
                            className={classes.operator}
                            onClick={() => onChange(number + 1)}>+
                </Typography>
            </Grid>
        </Grid>
    )
};
export default (Counter);