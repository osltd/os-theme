import {Theme} from "@material-ui/core";
import React from "react";
import {Clickable} from "../../../interfaces/client/Common";
import {makeStyles} from "@material-ui/styles";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

interface Props {
    data: Array<Clickable>
    tag: string
}

const useStyles = makeStyles(
    (theme: Theme) => ({


        root: {
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
        },
        selected: {
            backgroundColor: theme.palette.secondary.light,
            color: 'white',


        },
        optionsRoot: {
            textTransform:'uppercase',
            color: 'white',
            fontSize: '1.5em',
            fontWeight: 900,


        }

    })
);
const TagList: React.FunctionComponent<Props> = props => {
    const {
        tag, data
    } = props;
    const [value, setValue] = React.useState(0);

    const classes = useStyles();
    return <BottomNavigation
        value={tag}
        showLabels
        className={classes.root}
    >
        {data.map((n, i) => <BottomNavigationAction
            value={n.value}
            key={i}
            classes={{
                selected: classes.selected,
                root: classes.optionsRoot,
            }}
            onClick={() => n.onClick(n.value)}
            label={n.label}/>
        )}
    </BottomNavigation>


};

export default TagList