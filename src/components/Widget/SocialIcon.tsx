import React from 'react';
import classNames from 'classnames';
import {Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import {MaterialUIClasses} from "../../interfaces/client/Common";
import {socialIcon} from "../../constants/enum";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles( (theme: Theme) => ({
    root: {
        padding: '12px',
        border: '1px solid ' + theme.palette.secondary.main,
        margin: '3px',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '24px',
    },
    reddit: {

        '&:before': {
            color: '#ff8c39',
        },
        '&:hover': {
            backgroundColor:
                '#ff8c39',

            '&:before': {

                color: 'white',
            }

        }
    },
    youtube: {

        '&:before': {
            color: '#ff342f',
        },
        '&:hover': {
            backgroundColor:
                '#ff342f',
            '&:before': {

                color: 'white',

            }
        }

    },
    twitter: {
        '&:before': {
            color: '#3c16ff',
        },
        '&:hover': {
            backgroundColor: '#3c16ff'
            ,
            '&:before': {
                color: 'white',
            }
        }
    }
    , facebook: {
        '&:before': {
            color: '#5567ff',

        },
        '&:hover': {
            backgroundColor: '#5567ff',
            '&:before': {

                color: 'white',
            }
        }


    },
    whatsapp: {
        '&:before': {
            color: '#74ff57',

        },
        '&:hover': {
            backgroundColor: '#74ff57',
            '&:before': {

                color: 'white',
            }
        }


    }
}))

interface Props {
    label: string
    onClick: () => void,
    type:socialIcon

}


const SocialIcon: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles()

    const { type, onClick} = props;
    let getIconType = (type: string): string => {
        switch (type) {
            case 'reddit':
                return 'icon-reddit';
            case 'youtube':
                return 'icon-youtube';
            case 'twitter':
                return 'icon-twitter';
            case 'facebook':
                return 'icon-facebook2';
            case 'whatsapp':
                return 'icon-whatsapp';

            default:
                return 'icon-facebook2'
        }
    };
    return <div onClick={onClick} className={classNames(classes[type], classes.root, getIconType(type),)}/>

};

export default (SocialIcon);