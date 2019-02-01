import React, {Fragment} from 'react';
import {Theme} from '@material-ui/core/styles';
import {List as CustomList, Typography} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem';
import classNames from 'classnames'
import {Clickable} from "../../interfaces/client/Common";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        borderBottom: '1px solid ' + theme.palette.secondary.light,
        textTransform: 'uppercase',
        '& > p': {
            color: theme.palette.secondary.light,
        }, '&:hover': {
            '& > p': {
                color: theme.palette.primary.dark,
            }
        },

    },
    selected: {
        '& > p': {
            color: theme.palette.primary.dark,
        }
    },
    list: {
        maxHeight: '300px',
        overflow: 'auto',
    }
}))

interface Props {
    data: Array<Clickable>
    title?: string
    selectedValue?: string
}

const List: React.FunctionComponent<Props> = props => {
    const classes = useStyles()
    const {data, title, selectedValue} = props;

    let handleListItemClick = (event: any, index: number, cb: Function): void => {
        cb();
    };
    return (data ? <Fragment>
            {
                title && <Typography variant={'h6'}>{title}</Typography>

            }
            <CustomList component="nav" className={classes.list}>

                {data.map((n: any, i: any) =>
                    <ListItem
                        key={i}
                        button
                        className={classNames(classes.listItem, (selectedValue === n.value ||
                            (selectedValue === null && i === 0)
                        ) ? classes.selected : null)}
                        onClick={event => handleListItemClick(event, i, n.onClick)}>
                        <Typography
                        >{n.label}</Typography>
                    </ListItem>
                )}

            </CustomList>
        </Fragment> : null

    );
};
export default (List)