import React, {Fragment} from 'react';
import {Theme} from '@material-ui/core/styles';
import classNames from 'classnames'
import {Clickable} from "../../interfaces/client/Common";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif',
        fontSize: 20,
        fontWeight: 400,
        padding: 0,
        marginTop: 0
    },

    list: {
        padding: 0
    },
    item: {
        listStyle: 'none',
        borderBottom: '1px solid ' + theme.palette.secondary.light,
        textTransform: 'uppercase',
        '&:first-child': {
            borderTop: '1px solid rgb(169, 169, 169)'
        }
    },
    selected: {
        '& > button': {
            color: theme.palette.primary.dark,
        }
    },
    text: {
        display: 'block',
        borderWidth: 0,
        backgroundColor: 'transparent',
        width: '100%',
        margin: 0,
        textAlign: 'left',
        padding: 10,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f4f4f4'
        }
    }
}));

interface Props {
    data: Array<Clickable>
    title?: string
    selectedValue?: string
    closed?: boolean
}

const List: React.FunctionComponent<Props> = props => {
    const classes = useStyles();
    const {data, title, selectedValue, closed} = props;

    let handleListItemClick = (event: any, index: number, cb: Function): void => {
        cb();
    };
    return (data ? <Fragment>
            {title && <h3
                className={classes.title}
            >{title}</h3>}
            <ul
                className={classes.list}
                style={closed ? {
                    display: 'none'
                } : {}}
            >
                {data.map((n: any, i: any) =>
                    <li
                        key={i}
                        className={classNames(classes.item, (selectedValue === n.value ||
                            (selectedValue === null && i === 0)
                        ) ? classes.selected : null)}
                    >
                        <button
                            type="button"
                            className={classes.text}
                            onClick={event => handleListItemClick(event, i, n.onClick)}
                        >{n.label}</button>
                    </li>
                )}
            </ul>
        </Fragment> : null
    );
};
export default (List)