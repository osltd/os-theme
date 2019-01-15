import React, {Fragment,useState} from 'react';
import {Dialog} from '@material-ui/core';

const styles = {}

const ResponsiveDialog = props => {
    let myRef = React.createRef();
    //in parent
    //                                innerRef={e => this.popUp = e}
//this.popUp.handleClose()

    const [open, setOpen] = useState(false)
    const {fullScreen, dialog, title} = props;

    return (
        <Fragment>
            <span onClick={()=>setOpen(true)}>{title}</span>
            <Dialog
                fullScreen={fullScreen ? (fullScreen) : false}
                open={open}
                onClose={()=>setOpen(false)}
            >
                {dialog}
            </Dialog>
        </Fragment>
    );
}


export default (ResponsiveDialog)