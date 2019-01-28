import React, {Fragment, ReactNode, useState} from 'react';
import {Dialog} from '@material-ui/core';
import PropTypes from 'prop-types'
const styles = {}
interface Props {
    fullScreen?:boolean
    dialog:ReactNode,
    title:ReactNode,

}
const ResponsiveDialog:React.FunctionComponent<Props> = props => {
    let myRef = React.createRef();
    //in parent
    //  innerRef={e => this.popUp = e}
//this.popUp.handleClose()
    const [open, setOpen] = useState(false)
    const {fullScreen, dialog, title} = props;
    return (
        <Fragment>
            <span onClick={() => setOpen(true)}>{title}</span>
            <Dialog
                fullScreen={(fullScreen)}
                open={open}
                onClose={() => setOpen(false)}
            >
                {dialog}
            </Dialog>
        </Fragment>
    );
}
export default (ResponsiveDialog)