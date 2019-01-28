import React, {Fragment,forwardRef, ReactNode, useState} from 'react';
import {Dialog} from '@material-ui/core';
import PropTypes from 'prop-types'
import classNames from 'classnames'
import createStyles from "@material-ui/core/styles/createStyles";
import {MaterialUIClasses} from "../../interfaces/client/Common";
import {Theme, withStyles} from '@material-ui/core/styles';

const styles = (theme:Theme) => createStyles({
    dialog: {
        backgroundColor: 'white',
        opacity: 0.91,
    },
    opacity: {
        opacity: 1,
    }

});

interface Props {
    fullScreen?:boolean
    dialog:ReactNode
    title:ReactNode
    classes:MaterialUIClasses
    opacity?:boolean

}
const ResponsiveDialog:React.FunctionComponent<Props> =forwardRef( (props,ref) => {
    //in parent
    //  innerRef={e => this.popUp = e}
//this.popUp.handleClose()
    const [open, setOpen] = useState(false)
    const {fullScreen, dialog, opacity, classes,title} = props;
    return (
        <Fragment>
            <span onClick={() => setOpen(true)}>{title}</span>
            <Dialog
                className={classNames(opacity ? classes.opacity : '', classes.dialog)}

                fullScreen={(fullScreen)}
                open={open}
                onClose={() => setOpen(false)}
            >
                {dialog}
            </Dialog>
        </Fragment>
    );
})
export default withStyles(styles)(ResponsiveDialog)