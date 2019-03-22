import React, {useContext, useState} from 'react';
import {Theme, withStyles} from '@material-ui/core/styles';
import {Typography} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import createStyles from "@material-ui/core/styles/createStyles";
import {MaterialUIClasses} from "../../interfaces/client/Common";
import actionType from "../../context/actionType";
import {I18nText} from "./I18nText";
import {keyOfI18n} from "../../constants/locale/interface";
import Tag from './Tags/Tag';
import {reducer} from "../../context";

const styles = (theme: Theme) => createStyles({
    root: {}, text: {
        color: 'white',
        textTransform: 'uppercase'
    }

});

interface Props {
    classes: MaterialUIClasses,
}

const FooterLanguageBar: React.FunctionComponent<Props> = props => {
    const {classes} = props
    const [anchorEl, setAnchorEl]: [any, any] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const {commonReducer} = useContext(reducer)
    const handleMenuItemClick = (index: number, cb: Function): void => {
        setSelectedIndex(index);
        setAnchorEl(null);
        cb()
    };
    let options =
        [           {
            label: 'English',
            value: 'en',
            onClick: () => {
                commonReducer.dispatch(
                    {
                        type: actionType.common.COMMON_INIT_I18N,
                        payload: {
                            locale:'en'
                        }
                    }
                );
            }

        },
            {
                label: '繁體中文',
                value: 'zh',

                onClick: () => {
                    commonReducer.dispatch(
                        {
                            type: actionType.common.COMMON_INIT_I18N,
                            payload:{
                                locale:'zh'
                            }
                        }
                    );
                }
            }
        ]


    return (
        <>
            <Typography variant={'h6'} className={classes.text}>
                <I18nText keyOfI18n={keyOfI18n.LANGUAGE}/>
            </Typography>

            <Tag
                onClick={e => setAnchorEl(e.currentTarget)}
                value={commonReducer.state.locale === 'en' ? 'English' : '繁體中文'}
            />


            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}

            >
                {options.map((n, i) => (
                    <MenuItem
                        key={i}
                        selected={i === selectedIndex}
                        onClick={() => handleMenuItemClick(i, n.onClick)}
                    >
                        <Typography variant={'body1'}>
                            {n.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
};

//todo(need to improve)
export default withStyles(styles)(FooterLanguageBar);