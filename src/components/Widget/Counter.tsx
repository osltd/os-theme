import React from 'react';
import {withStyles,Theme} from '@material-ui/core/styles';
import PropTypes from "prop-types";
import {Grid, Input, Typography} from '@material-ui/core';
import {MaterialUIClasses} from "../../interfaces/client/Common";

const styles = (theme:Theme) => ({
        root: {},
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
    })
interface Props {
    classes:MaterialUIClasses,
    number:number,
    onChange:(n:any)=>number
}

const  Counter:React.FunctionComponent<Props> =(props)=> {

        const {classes,number,onChange} = props;
        return (
            <Grid container alignItems={'center'} className={classes.root}>
                <Grid item>
                    <Typography variant={'h6'}
                                className={classes.operator}
                                onClick={() => onChange(number > 1 ? (number - 1) : 0)}>-</Typography>
                </Grid>
                <Grid item>
                    <Input
                        value={number ? number : onChange(1)}
                        onChange={e => onChange(e.target.value > 0 ? e.target.value : 1)}
                        type="number"
                        className={classes.input}
                        disableUnderline={true}
                    />
                </Grid>
                <Grid item>
                    <Typography variant={'h6'}
                                className={classes.operator}
                                onClick={() => onChange(parseInt(number) + 1)}>+
                    </Typography>
                </Grid>
            </Grid>
        )
    }

export default withStyles(styles)(Counter);